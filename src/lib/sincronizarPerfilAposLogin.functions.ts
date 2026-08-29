import { createServerFn } from "@tanstack/react-start";
import { consultarPagamentoPorEmail } from "@/lib/appsScriptPagamento.server";

// Depois do login, verifica se o e-mail do usuário está com pagamento
// confirmado na planilha e, se estiver, promove o perfil dele para
// "membro" no banco de dados. Se não estiver confirmado, o perfil
// permanece como "visitante" (papel padrão criado no primeiro acesso).
//
// AINDA NÃO É CHAMADA POR NENHUMA ROTA — faz parte do controle de perfil
// implementado, mas ainda não habilitado (ver CONTROLE_DE_PERFIL_HABILITADO
// em src/lib/perfis.ts). Quando o login for religado, chame esta função
// logo após o usuário entrar pela primeira vez.
//
// Nunca promove ninguém a "administrador" — essa promoção é sempre manual,
// feita diretamente no banco de dados por quem já é administrador.

type ResultadoSincronizacao = { papel: "membro" } | { papel: "visitante"; motivo?: string };

export const sincronizarPerfilAposLogin = createServerFn({ method: "POST" })
  .validator((data: { userId: string; email: string }) => data)
  .handler(async ({ data }): Promise<ResultadoSincronizacao> => {
    const resultado = await consultarPagamentoPorEmail(data.email);

    if (!resultado.confirmado) {
      return { papel: "visitante", ...(resultado.erro ? { motivo: resultado.erro } : {}) };
    }

    // Import dinâmico: o cliente com service role só deve ser carregado
    // dentro de handlers de servidor, nunca no topo de um arquivo
    // .functions.ts (que também é empacotado para o cliente).
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("perfis")
      .update({ papel: "membro" })
      .eq("user_id", data.userId);

    if (error) {
      console.error("[sincronizarPerfilAposLogin] Falha ao atualizar o perfil:", error);
      return { papel: "visitante", motivo: "falha_ao_atualizar" };
    }

    return { papel: "membro" };
  });
