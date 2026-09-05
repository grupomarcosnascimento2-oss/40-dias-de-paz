import { createServerFn } from "@tanstack/react-start";

// Envia uma notificação push para quem tem inscrição ativa e se encaixa
// no público-alvo do aviso (mesmo critério usado no painel de avisos:
// todos / membros / novos_membros / visitante).
//
// Chamada por GerenciarAvisos.tsx logo depois de publicar um aviso no
// Dashboard — best-effort: se falhar, o aviso já foi publicado normal
// (o envio de push é um "a mais", nunca bloqueia a publicação em si).
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
  .handler(async ({ data }): Promise<{ enviados: number; motivo?: MotivoFalha }> => {
    const chavePrivada = process.env["VAPID_PRIVATE_KEY"];
    const chavePublica = process.env["VAPID_PUBLIC_KEY"];

    if (!chavePrivada || !chavePublica) {
      console.error("[enviarNotificacaoAviso] Chaves VAPID não configuradas — envio ignorado.");
      return { enviados: 0, motivo: "chaves_nao_configuradas" };
    }

    // Imports dinâmicos: tanto o cliente com service role quanto a
    // biblioteca de push só devem ser carregados dentro do handler de
    // servidor, nunca no topo de um arquivo .functions.ts (que também é
    // empacotado para o cliente).
    const webpush = (await import("web-push")).default;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    webpush.setVapidDetails("mailto:grupomarcosnascimento@gmail.com", chavePublica, chavePrivada);

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

    const payload = JSON.stringify({ titulo: data.titulo, corpo: data.mensagem, url: "/jornada" });
    let enviados = 0;
    let ultimoErro: string | undefined;

    for (const inscricao of inscricoes) {
      try {
        await webpush.sendNotification(
          {
            endpoint: inscricao.endpoint,
            keys: { p256dh: inscricao.p256dh, auth: inscricao.auth },
          },
          payload,
        );
        enviados += 1;
      } catch (erro: unknown) {
        const codigo = (erro as { statusCode?: number } | undefined)?.statusCode;
        if (codigo === 404 || codigo === 410) {
          // Inscrição expirada ou revogada pelo navegador — remove, para
          // não tentar de novo nas próximas vezes.
          await supabaseAdmin.from("push_subscriptions").delete().eq("id", inscricao.id);
        } else {
          ultimoErro = erro instanceof Error ? erro.message : String(erro);
          console.error("[enviarNotificacaoAviso] Falha ao enviar para uma inscrição:", erro);
        }
      }
    }

    if (enviados === 0 && ultimoErro) {
      return { enviados: 0, motivo: "falha_ao_enviar" };
    }

    return { enviados };
  });
