// Papéis de usuário do devocional e a chave geral que liga/desliga o
// controle de acesso por perfil.
//
// Enquanto CONTROLE_DE_PERFIL_HABILITADO for false, nenhuma tela aplica
// restrição — o app continua se comportando como hoje (modo de
// desenvolvimento, acesso livre, sem login). Essa chave existe para que
// toda a estrutura (banco de dados, hooks, verificação de acesso) possa
// ser construída e testada antes de qualquer coisa mudar de fato na
// experiência do usuário.
//
// Para "ligar" de verdade, além de mudar esta chave para true, é preciso
// voltar a usar as páginas com login (useAuth) em vez do modo sem login
// atual (useJornadaDev) — essa reconexão é um passo separado, ainda não
// feito.

export type Papel = "administrador" | "membro" | "visitante";

export const CONTROLE_DE_PERFIL_HABILITADO = false;

export const PAPEL_PADRAO: Papel = "visitante";

export function papelPermiteAcessoCompleto(papel: Papel | undefined): boolean {
  return papel === "administrador" || papel === "membro";
}

export function ehAdministrador(papel: Papel | undefined): boolean {
  return papel === "administrador";
}
