import { createServerFn } from "@tanstack/react-start";

// Envia uma mensagem via WhatsApp Business Cloud API (Meta) — código
// preparado, aguardando configuração (ver checklist no final deste
// arquivo). Enquanto não configurado, falha de forma silenciosa
// (best-effort), sem quebrar nenhum fluxo que a chame.
//
// IMPORTANTE sobre como a API da Meta funciona: a primeira mensagem que
// uma empresa manda para alguém que nunca escreveu para ela antes
// PRECISA usar um "modelo de mensagem" (template) pré-aprovado pela
// Meta — não dá para mandar texto livre direto, mesmo tendo o número
// da pessoa. Só depois que a pessoa responde é que existe uma janela de
// 24h onde texto livre é permitido. Por isso esta função sempre envia
// no formato de template, nunca texto livre.

const VERSAO_API = "v21.0";

type MotivoFalha = "credenciais_nao_configuradas" | "falha_ao_enviar" | "erro_inesperado";

export const enviarMensagemWhatsApp = createServerFn({ method: "POST" })
  .validator((data: { telefone: string; nomeTemplate: string; parametros?: string[] }) => data)
  .handler(async ({ data }): Promise<{ enviado: boolean; motivo?: MotivoFalha; erro?: string }> => {
    const token = process.env["WHATSAPP_ACCESS_TOKEN"];
    const phoneNumberId = process.env["WHATSAPP_PHONE_NUMBER_ID"];

    if (!token || !phoneNumberId) {
      console.error("[enviarMensagemWhatsApp] Credenciais do WhatsApp não configuradas.");
      return { enviado: false, motivo: "credenciais_nao_configuradas" };
    }

    // Mantém só dígitos (formato E.164 sem "+", que a API da Meta espera).
    const telefoneLimpo = data.telefone.replace(/\D/g, "");

    try {
      const resposta = await fetch(
        `https://graph.facebook.com/${VERSAO_API}/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: telefoneLimpo,
            type: "template",
            template: {
              name: data.nomeTemplate,
              language: { code: "pt_BR" },
              ...(data.parametros && data.parametros.length > 0
                ? {
                    components: [
                      {
                        type: "body",
                        parameters: data.parametros.map((texto) => ({
                          type: "text",
                          text: texto,
                        })),
                      },
                    ],
                  }
                : {}),
            },
          }),
        },
      );

      if (!resposta.ok) {
        const corpo = await resposta.text();
        console.error("[enviarMensagemWhatsApp] Falha ao enviar:", resposta.status, corpo);
        return { enviado: false, motivo: "falha_ao_enviar", erro: corpo };
      }

      return { enviado: true };
    } catch (erro: unknown) {
      console.error("[enviarMensagemWhatsApp] Erro inesperado:", erro);
      return {
        enviado: false,
        motivo: "erro_inesperado",
        erro: erro instanceof Error ? erro.message : String(erro),
      };
    }
  });

// ─── Checklist para ativar de verdade, quando quiser ────────────────
//
// 1. No painel do Meta Business (business.facebook.com), dentro do app
//    do WhatsApp Business, pegue:
//    - o "Phone Number ID" do número que vai enviar as mensagens
//    - um "Access Token" (token de acesso permanente, não o temporário
//      de teste que expira em 24h)
// 2. Adicione como Secrets no Lovable:
//    WHATSAPP_ACCESS_TOKEN=<o token>
//    WHATSAPP_PHONE_NUMBER_ID=<o phone number id>
// 3. Crie e envie para aprovação (dentro do mesmo painel) pelo menos um
//    "modelo de mensagem" (template) — por exemplo, um de confirmação
//    para quem preenche o formulário em /oracao-urgente. A aprovação da
//    Meta pode levar de minutos a 1-2 dias.
// 4. Me avise o nome exato do template aprovado, para eu conectar esta
//    função num gatilho real (ex: enviar automaticamente depois que
//    alguém preenche o WhatsApp em /oracao-urgente).
