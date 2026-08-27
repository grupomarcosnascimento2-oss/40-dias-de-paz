import { useEffect, useState } from "react";

// Estado global de som (ligado/desligado) — controla se conteúdos de
// áudio (orações, TV Oracional) devem tocar ou ficar silenciados.
// Persistido no navegador para lembrar a preferência do usuário.

const CHAVE_SOM = "som_ativo";

export function useSom() {
  const [ativo, setAtivo] = useState(true);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const salvo = window.localStorage.getItem(CHAVE_SOM);
    if (salvo !== null) setAtivo(salvo === "1");
    setCarregado(true);
  }, []);

  const alternar = () => {
    setAtivo((atual) => {
      const novo = !atual;
      window.localStorage.setItem(CHAVE_SOM, novo ? "1" : "0");
      return novo;
    });
  };

  return { ativo, alternar, carregado };
}
