// Lista de avisos exibidos no painel do topo. Edite este arquivo para
// publicar novas notícias, avisos, alertas ou comunicados aos usuários.
// Cada aviso precisa de um "id" único — ao trocar o id, o aviso volta a
// aparecer mesmo para quem já tinha fechado uma versão anterior.

export type TipoAviso = "noticia" | "aviso" | "alerta" | "comunicado";

export type Aviso = {
  id: string;
  tipo: TipoAviso;
  titulo: string;
  mensagem: string;
};

export const avisos: Aviso[] = [];
