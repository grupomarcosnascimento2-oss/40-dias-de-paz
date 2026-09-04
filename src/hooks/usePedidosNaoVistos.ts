import { useEffect, useState } from "react";
import { usePedidosOracao } from "./usePedidosOracao";

// Conta quantos pedidos de oração chegaram desde a última vez que a
// pessoa abriu a aba "Pedidos de Oração" — like o contador vermelho do
// WhatsApp. Guardado no navegador (por pessoa), não no banco: é só uma
// marcação de "já vi", não precisa persistir entre aparelhos.
function chave(userId: string): string {
  return `pedidos_ultima_visualizacao_${userId}`;
}

function lerOuIniciarUltimaVisualizacao(userId: string): number {
  const salvo = window.localStorage.getItem(chave(userId));
  if (salvo) return Number(salvo);

  // Primeira vez que essa pessoa usa este recurso: começa contando só
  // a partir de agora, para não mostrar todo o histórico como "novo".
  const agora = Date.now();
  window.localStorage.setItem(chave(userId), String(agora));
  return agora;
}

export function usePedidosNaoVistos(userId: string | undefined) {
  const { data: pedidos } = usePedidosOracao();
  const [ultimaVisualizacao, setUltimaVisualizacao] = useState(0);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setUltimaVisualizacao(lerOuIniciarUltimaVisualizacao(userId));
    setCarregado(true);
  }, [userId]);

  const naoVistos = carregado
    ? (pedidos ?? []).filter((p) => new Date(p.created_at).getTime() > ultimaVisualizacao).length
    : 0;

  const marcarComoVisto = () => {
    if (!userId) return;
    const agora = Date.now();
    window.localStorage.setItem(chave(userId), String(agora));
    setUltimaVisualizacao(agora);
  };

  return { naoVistos, marcarComoVisto };
}
