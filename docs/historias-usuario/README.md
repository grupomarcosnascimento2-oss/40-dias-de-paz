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
(Comunidade de Oração). Ao adicionar uma seção nova, use o próximo
número disponível (hoje vai até a seção 10).
