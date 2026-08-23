import { useEffect, useState } from "react";
import { TOTAL_DIAS } from "@/lib/devocional";

// MODO DE DESENVOLVIMENTO — progresso salvo apenas no navegador (localStorage),
// sem login e sem Supabase. Isso existe só para agilizar as melhorias visuais
// e de fluxo do app. Quando formos religar autenticação + pagamento, este hook
// deve ser substituído de volta por useJornada (src/hooks/useJornada.ts), que já
// existe e já está pronto, ligado ao Supabase.

const CHAVE_PROGRESSO = "dev_jornada_dias_concluidos";

export function useJornadaDev() {
  const [diasConcluidos, setDiasConcluidos] = useState(0);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const salvo = window.localStorage.getItem(CHAVE_PROGRESSO);
    setDiasConcluidos(salvo ? Number(salvo) : 0);
    setCarregado(true);
  }, []);

  const concluirDia = (numero: number) => {
    setDiasConcluidos((atual) => {
      const novo = Math.min(Math.max(atual, numero), TOTAL_DIAS);
      window.localStorage.setItem(CHAVE_PROGRESSO, String(novo));
      return novo;
    });
  };

  const reiniciarProgresso = () => {
    window.localStorage.removeItem(CHAVE_PROGRESSO);
    setDiasConcluidos(0);
  };

  return { diasConcluidos, carregado, concluirDia, reiniciarProgresso };
}

export function diaLiberado(numero: number, diasConcluidos: number) {
  return numero <= diasConcluidos + 1;
}
