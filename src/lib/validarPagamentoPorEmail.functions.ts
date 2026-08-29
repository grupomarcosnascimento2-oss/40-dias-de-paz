import { createServerFn } from "@tanstack/react-start";
import {
  consultarPagamentoPorEmail,
  type ResultadoValidacao,
} from "@/lib/appsScriptPagamento.server";

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

export const validarPagamentoPorEmail = createServerFn({ method: "GET" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<ResultadoValidacao> => {
    return consultarPagamentoPorEmail(data.email);
  });
