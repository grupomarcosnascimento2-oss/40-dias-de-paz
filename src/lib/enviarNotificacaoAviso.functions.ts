import { createServerFn } from "@tanstack/react-start";

// Envia uma notificação push para quem tem inscrição ativa e se encaixa
// no público-alvo do aviso (mesmo critério usado no painel de avisos:
// todos / membros / novos_membros / visitante).
//
// Chamada por GerenciarAvisos.tsx logo depois de publicar um aviso no
// Dashboard — best-effort: se falhar, o aviso já foi publicado normal
// (o envio de push é um "a mais", nunca bloqueia a publicação em si).
//
// Usa @pushforge/builder em vez da biblioteca "web-push" — aquela é
// pensada para Node.js (usa Buffer e o módulo `crypto` do Node) e não
// funciona de verdade no Cloudflare Workers, mesmo com ajustes (isso já
// é um problema conhecido e documentado pelos próprios mantenedores).
// O pushforge usa só Web Crypto API + fetch, que o Workers já suporta
// nativamente.
//
// Retorna também um "motivo" quando não envia nada, para dar visibilidade
// de diagnóstico (ver DiagnosticoNotificacoes.tsx, no Dashboard).

type Publico = "todos" | "membros" | "novos_membros" | "visitante";

const JANELA_NOVO_MEMBRO_DIAS = 7;

type MotivoFalha =
  | "chaves_nao_configuradas"
  | "falha_ao_buscar_perfis"
  | "nenhum_perfil_elegivel"
  | "falha_ao_buscar_inscricoes"
  | "nenhuma_inscricao_encontrada"
  | "falha_ao_enviar";

export const enviarNotificacaoAviso = createServerFn({ method: "POST" })
  .validator((data: { titulo: string; mensagem: string; publico: Publico }) => data)
  .handler(async ({ data }): Promise<{ enviados: number; motivo?: MotivoFalha; erro?: string }> => {
    const chavePrivadaJwk = process.env["VAPID_PRIVATE_KEY"];

    if (!chavePrivadaJwk) {
      console.error("[enviarNotificacaoAviso] Chave VAPID não configurada — envio ignorado.");
      return { enviados: 0, motivo: "chaves_nao_configuradas" };
    }

    let privateJWK: JsonWebKey;
    try {
      privateJWK = JSON.parse(chavePrivadaJwk) as JsonWebKey;
    } catch {
      console.error("[enviarNotificacaoAviso] VAPID_PRIVATE_KEY não é um JSON válido.");
      return { enviados: 0, motivo: "chaves_nao_configuradas" };
    }

    // Imports dinâmicos: tanto o cliente com service role quanto a
    // biblioteca de push só devem ser carregados dentro do handler de
    // servidor, nunca no topo de um arquivo .functions.ts (que também é
    // empacotado para o cliente).
    const { buildPushHTTPRequest } = await import("@pushforge/builder");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: perfis, error: erroPerfis } = await supabaseAdmin
      .from("perfis")
      .select("user_id, papel, tornou_se_membro_em");

    if (erroPerfis) {
      console.error("[enviarNotificacaoAviso] Falha ao buscar perfis:", erroPerfis);
      return { enviados: 0, motivo: "falha_ao_buscar_perfis" };
    }

    const agora = Date.now();
    const elegiveis = (perfis ?? []).filter((perfil) => {
      if (data.publico === "todos") return true;
      if (data.publico === "visitante") return perfil.papel === "visitante";
      if (data.publico === "membros") return perfil.papel === "membro";
      if (data.publico === "novos_membros") {
        if (perfil.papel !== "membro" || !perfil.tornou_se_membro_em) return false;
        const desde = agora - new Date(perfil.tornou_se_membro_em).getTime();
        return desde < JANELA_NOVO_MEMBRO_DIAS * 24 * 60 * 60 * 1000;
      }
      return false;
    });

    const idsElegiveis = elegiveis.map((p) => p.user_id);
    if (idsElegiveis.length === 0) return { enviados: 0, motivo: "nenhum_perfil_elegivel" };

    const { data: inscricoes, error: erroInscricoes } = await supabaseAdmin
      .from("push_subscriptions")
      .select("id, endpoint, p256dh, auth")
      .in("user_id", idsElegiveis);

    if (erroInscricoes) {
      console.error("[enviarNotificacaoAviso] Falha ao buscar inscrições:", erroInscricoes);
      return { enviados: 0, motivo: "falha_ao_buscar_inscricoes" };
    }

    if (!inscricoes || inscricoes.length === 0) {
      return { enviados: 0, motivo: "nenhuma_inscricao_encontrada" };
    }

    const mensagem = {
      payload: { titulo: data.titulo, corpo: data.mensagem, url: "/jornada" },
      options: { ttl: 3600, urgency: "normal" as const },
      adminContact: "mailto:grupomarcosnascimento@gmail.com",
    };

    let enviados = 0;
    let ultimoErro: string | undefined;

    for (const inscricao of inscricoes) {
      try {
        const subscription = {
          endpoint: inscricao.endpoint,
          keys: { p256dh: inscricao.p256dh, auth: inscricao.auth },
        };

        const { endpoint, headers, body } = await buildPushHTTPRequest({
          privateJWK,
          message: mensagem,
          subscription,
        });

        const resposta = await fetch(endpoint, { method: "POST", headers, body });

        if (resposta.status === 201) {
          enviados += 1;
        } else if (resposta.status === 404 || resposta.status === 410) {
          // Inscrição expirada ou revogada pelo navegador — remove, para
          // não tentar de novo nas próximas vezes.
          await supabaseAdmin.from("push_subscriptions").delete().eq("id", inscricao.id);
        } else {
          ultimoErro = `HTTP ${resposta.status}: ${await resposta.text()}`;
          console.error("[enviarNotificacaoAviso] Falha ao enviar para uma inscrição:", ultimoErro);
        }
      } catch (erro: unknown) {
        ultimoErro = erro instanceof Error ? erro.message : String(erro);
        console.error("[enviarNotificacaoAviso] Falha ao enviar para uma inscrição:", erro);
      }
    }

    if (enviados === 0 && ultimoErro) {
      return { enviados: 0, motivo: "falha_ao_enviar", erro: ultimoErro };
    }

    return { enviados };
  });
