// Tipos dos avisos exibidos no painel do topo do app (PainelAvisos.tsx).
// Os avisos em si agora vivem no banco de dados (tabela "avisos"),
// gerenciados pelo administrador direto no Dashboard — ver useAvisos.ts.
// Este arquivo guarda só os tipos, reaproveitados nos dois lugares.

export type TipoAviso = "noticia" | "aviso" | "alerta" | "comunicado" | "evento";

export type Aviso = {
  id: string;
  tipo: TipoAviso;
  titulo: string;
  mensagem: string;
};
