// Papéis de usuário do devocional e a chave geral que liga/desliga o
// controle de acesso por perfil.
//
// LIGADO em 30/08/2026: login com Google/Apple reconectado, e as páginas
// da jornada agora exigem sessão ativa (useAuth) em vez do modo sem
// login (useJornadaDev, mantido no repositório só como referência).

export type Papel = "administrador" | "intercessor" | "membro" | "visitante";

export const CONTROLE_DE_PERFIL_HABILITADO = true;

export const PAPEL_PADRAO: Papel = "visitante";

export function papelPermiteAcessoCompleto(papel: Papel | undefined): boolean {
  return papel === "administrador" || papel === "intercessor" || papel === "membro";
}

export function ehAdministrador(papel: Papel | undefined): boolean {
  return papel === "administrador";
}

// Intercessor: pessoa preparada para responder pedidos de oração na
// Pedidos de Oração, apoiando esse trabalho junto com o
// administrador (pensado para quando o administrador não estiver
// disponível — a tendência é ter vários intercessores ao longo do tempo).
export function podeResponderPedidos(papel: Papel | undefined): boolean {
  return papel === "administrador" || papel === "intercessor";
}
