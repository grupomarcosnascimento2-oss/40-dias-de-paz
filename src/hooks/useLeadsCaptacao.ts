import { supabase } from "@/integrations/supabase/client";

// Registra um lead capturado na página de acolhimento urgente
// (/oracao-urgente). Funciona mesmo sem a pessoa estar logada — a
// tabela aceita INSERT de anon (ver RLS na migration).
export function useRegistrarLead() {
  return async (nome: string, email: string, whatsapp: string) => {
    const { error } = await supabase.from("leads_captacao").insert({
      nome,
      email,
      whatsapp: whatsapp.trim() || null,
    });

    if (error) {
      console.error("[useRegistrarLead] Falha ao registrar lead:", error);
      return { erro: "falha_ao_registrar" as const };
    }
    return {};
  };
}
