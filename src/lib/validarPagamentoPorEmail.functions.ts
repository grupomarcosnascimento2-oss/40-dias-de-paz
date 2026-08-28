import { createServerFn } from "@tanstack/react-start";

// Consulta o status de pagamento de um e-mail na planilha, através do
// Apps Script (doGet) publicado por Marcos.
//
// AINDA NÃO É CHAMADA POR NENHUMA ROTA — o app está rodando sem login
// por enquanto (modo de desenvolvimento). Quando o login com Google for
// religado, chame esta função a partir do fluxo de autenticação para
// decidir se libera o acesso à jornada.
//
// Variáveis de ambiente necessárias (configurar nas configurações do
// projeto no Lovable — nunca direto no código ou no repositório):
//   APPS_SCRIPT_URL   -> a URL "/exec" do Apps Script implantado
//   APPS_SCRIPT_CHAVE -> a mesma chave secreta definida no doGet do script

type ResultadoValidacao =
  | { confirmado: true; nome?: string; email: string }
  | { confirmado: false; encontrado?: boolean; erro?: string };

export const validarPagamentoPorEmail = createServerFn({ method: "GET" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<ResultadoValidacao> => {
    const url = process.env["APPS_SCRIPT_URL"];
    const chave = process.env["APPS_SCRIPT_CHAVE"];

    if (!url || !chave) {
      console.error(
        "[validarPagamentoPorEmail] Faltam as variáveis de ambiente APPS_SCRIPT_URL / APPS_SCRIPT_CHAVE.",
      );
      return { confirmado: false, erro: "configuracao_ausente" };
    }

    const destino = new URL(url);
    destino.searchParams.set("email", data.email);
    destino.searchParams.set("chave", chave);

    try {
      const resposta = await fetch(destino.toString());
      if (!resposta.ok) {
        return { confirmado: false, erro: `http_${resposta.status}` };
      }

      const corpo = (await resposta.json()) as {
        confirmado?: boolean;
        encontrado?: boolean;
        nome?: string;
        erro?: string;
      };

      if (corpo.confirmado) {
        return { confirmado: true, email: data.email, ...(corpo.nome ? { nome: corpo.nome } : {}) };
      }
      return {
        confirmado: false,
        ...(corpo.encontrado !== undefined ? { encontrado: corpo.encontrado } : {}),
        ...(corpo.erro ? { erro: corpo.erro } : {}),
      };
    } catch (erro) {
      console.error("[validarPagamentoPorEmail] Falha ao consultar a planilha:", erro);
      return { confirmado: false, erro: "falha_de_rede" };
    }
  });
