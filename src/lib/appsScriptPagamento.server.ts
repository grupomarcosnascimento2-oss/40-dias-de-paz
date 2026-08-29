// Módulo server-only: consulta o Apps Script publicado por Marcos para
// verificar o status de pagamento de um e-mail. Não é uma server function
// exportável para o cliente — é só a lógica compartilhada, reaproveitada
// por validarPagamentoPorEmail.functions.ts e por
// sincronizarPerfilAposLogin.functions.ts.

export type ResultadoValidacao =
  | { confirmado: true; nome?: string; email: string }
  | { confirmado: false; encontrado?: boolean; erro?: string };

export async function consultarPagamentoPorEmail(email: string): Promise<ResultadoValidacao> {
  const url = process.env["APPS_SCRIPT_URL"];
  const chave = process.env["APPS_SCRIPT_CHAVE"];

  if (!url || !chave) {
    console.error(
      "[consultarPagamentoPorEmail] Faltam as variáveis de ambiente APPS_SCRIPT_URL / APPS_SCRIPT_CHAVE.",
    );
    return { confirmado: false, erro: "configuracao_ausente" };
  }

  const destino = new URL(url);
  destino.searchParams.set("email", email);
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
      return { confirmado: true, email, ...(corpo.nome ? { nome: corpo.nome } : {}) };
    }
    return {
      confirmado: false,
      ...(corpo.encontrado !== undefined ? { encontrado: corpo.encontrado } : {}),
      ...(corpo.erro ? { erro: corpo.erro } : {}),
    };
  } catch (erro) {
    console.error("[consultarPagamentoPorEmail] Falha ao consultar a planilha:", erro);
    return { confirmado: false, erro: "falha_de_rede" };
  }
}
