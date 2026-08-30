// Papéis de usuário do devocional e a chave geral que liga/desliga o
// controle de acesso por perfil.
//
// LIGADO em 30/08/2026: login com Google/Apple reconectado, e as páginas
// da jornada agora exigem sessão ativa (useAuth) em vez do modo sem
// login (useJornadaDev, mantido no repositório só como referência).

export type Papel = "administrador" | "membro" | "visitante";

export const CONTROLE_DE_PERFIL_HABILITADO = true;

export const PAPEL_PADRAO: Papel = "visitante";

export function papelPermiteAcessoCompleto(papel: Papel | undefined): boolean {
  return papel === "administrador" || papel === "membro";
}

export function ehAdministrador(papel: Papel | undefined): boolean {
  return papel === "administrador";
}
