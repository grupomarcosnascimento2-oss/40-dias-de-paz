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

## Pendências para a próxima atualização

Funcionalidades já implementadas no app, mas ainda **não incorporadas**
a este documento (registradas em memória em 01/09/2026, aguardando a
próxima rodada de atualização):

- Renomeação de "Comunidade de Oração" para "Pedidos de Oração" em todo
  texto visível do app (rótulo da aba, títulos de bloqueio, mural do
  visitante) — os IDs de história continuam válidos, só o nome mudou.
- Nova regra de visibilidade para o Visitante: a partir da **2ª visita**
  à aba Devocional, a TV Oracional e as 4 abas internas (40 Dias,
  Pedidos de Oração, Acompanhamento, Agenda) são substituídas por uma
  tela única "Quero ser membro", com botão para a landing page. O
  contador de acessos fica salvo na conta (banco de dados), não no
  navegador. Isso muda o comportamento descrito nas histórias US-02.02
  e US-02.04 (que hoje descrevem só a degustação da 1ª visita) — vale
  adicionar uma história nova (ex: US-02.09) e uma nota técnica na
  seção 2.

