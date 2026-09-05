# Histórias de Usuário — documento vivo

Este documento (`gerar.js`) gera o Word "Histórias de Usuário — 40 Dias
Rezando com Marcos Nascimento", cobrindo todas as funcionalidades do
devocional em formato de história de usuário, numeradas por área.

## Como atualizar

Requer o pacote `docx` do npm (não é dependência do app, só desta
ferramenta de documentação — já vem disponível no ambiente de trabalho
padrão usado nas sessões deste projeto).

1. Edite o array `secoes` em `gerar.js` — adicione uma história nova
   (formato `[id, persona, quero, para, criterios, status]`) ou mude o
   `status` de uma existente conforme ela evolui (`PLANEJADO` →
   `PARCIAL` → `FEITO`)
2. Rode: `node gerar.js` (precisa do pacote `docx` do npm)
3. Confira visualmente antes de entregar — converta para PDF e veja as
   páginas (ver seção "Verify the output" do skill de docx em
   `/mnt/skills/public/docx/SKILL.md`)

## Convenção de IDs

`US-<seção>.<sequencial>` — ex: `US-06.04` é a 4ª história da seção 6
(Pedidos de Oração). Ao adicionar uma seção nova, use o próximo número
disponível (hoje vai até a seção 10).

## Histórico de versões

- **v1** (30/08/2026): primeira versão, 10 seções, ~69 histórias
- **v2** (31/08/2026): critérios de aceite completos + notas técnicas por seção
- **v3** (02/09/2026): renomeação "Comunidade de Oração" → "Pedidos de Oração"; bloqueio do Visitante na 2ª visita à aba Devocional; publicação limitada a 3 pedidos para Visitante; avisos com público-alvo (todos/membros/novos membros); correção da tela travada em erro de perfil — 76 histórias

## Pendências para a próxima atualização (desde a v3)

- Notificações push (inscrição, envio ao publicar aviso, correção de compatibilidade com Cloudflare Workers)
- Instalação como app/PWA (manifesto, ícone, banner de sugestão)
- Painel de avisos: visual mais chamativo, tipo "Evento" com contagem regressiva, título opcional, público "Visitante"
- Dashboard: "Vezes que o app foi aberto hoje", "Pessoas conectadas agora" (com nomes), "Pedidos de oração sem resposta"
- Selo de pedidos não vistos (estilo WhatsApp) na aba Pedidos de Oração
- Mural do visitante: janela de 24h para publicar (substituiu o limite de 3 pedidos)
- Página `/oracao-urgente` (captação de leads em situação de emergência)
- Jornada de Oração: acolhimento imediato sem framing comercial (TV + mural completo, sem espera)
- Menu lateral reorganizado: item 1 "Administração" (5 subitens: Dashboard, Cadastros, Controle, Regras de Negócio, Usuários/Permissionamento — as 4 últimas ainda placeholder)

