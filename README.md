# 40 Dias Rezando com Marcos Nascimento

Devocional católico digital de 40 dias, autoral, escrito e narrado por **Marcos Nascimento**. Web app construído em React + TanStack Start, hospedado via Lovable (Cloudflare Workers) com banco de dados Supabase.

> Este README foi escrito para que qualquer pessoa (programador ou agente de IA) que pegue este projeto entenda rapidamente o que já existe, o que está pendente e por quê. Se você é um agente de IA dando continuidade a este projeto, leia também o `AGENTS.md`, que tem instruções mais operacionais.

---

## 1. Contexto e propósito do produto

- **Autor**: Marcos Nascimento, profissional de TI (Scrum Master) e autor católico, com 25+ anos de experiência. Este é um projeto pessoal/autoral dele, não institucional.
- **Público-alvo**: católicos de 18 a 70 anos enfrentando dificuldades emocionais, espirituais, familiares, de saúde ou financeiras — pessoas ansiosas, cansadas, sobrecarregadas, buscando acolhimento e um espaço diário de oração.
- **Proposta central**: uma jornada de 40 dias, um dia de cada vez — Palavra de Deus (curta), oração em áudio (a voz do próprio Marcos), propósito prático, e uma frase para guardar no coração. Deliberadamente **rápido e leve** — não deve parecer tarefa ou trabalho.
- **Frase-chave do projeto**: *"entrar para o devocional significa mudança de vida"* — orienta o tom de tudo: nunca cobrança, sempre convite.
- Este app é o **produto principal** (a experiência dos 40 dias). Existe também uma **landing page separada** (`rezandocomesperanca40dias.lovable.app`, repositório próprio) que vende o acesso e redireciona para cá após pagamento confirmado via Pix (Mercado Pago).

## 2. Modelo de negócio

- **Pagamento único** por acesso completo aos 40 dias (não é assinatura). Futuramente pode virar a porta de entrada para um "ecossistema oracional" maior (outros devocionais, assinatura) — mas isso é fase 2, não implementado.
- **Quatro perfis de usuário**, todos implementados e em uso (ver seção 6): Administrador, Intercessor, Membro, Visitante. Administrador e Membro têm acesso pleno; Intercessor tem acesso pleno + pode responder pedidos de oração; Visitante tem uma degustação real (Dia 1 completo, até 3 pedidos de oração próprios), com restrições progressivas para incentivar a conversão.

## 3. Stack técnica

- **Framework**: TanStack Start (React 19, SSR) + TanStack Router (rotas em arquivo, `src/routes/`)
- **Estilo**: Tailwind CSS v4 + componentes shadcn/ui (`src/components/ui/`)
- **Backend**: Supabase (Postgres + Auth + Realtime), acessado via `src/integrations/supabase/`
- **Hospedagem**: Lovable → Cloudflare Workers (build gera `wrangler.json`/`.output` automaticamente)
- **Gerenciador de pacotes**: bun (há `bun.lock`); `npm install` também funciona para desenvolvimento local
- Rodar localmente: `npm install && npm run dev` (ou `bun install && bun dev`)
- Build de produção: `npm run build` (gera `.output/`)

## 4. Estrutura de pastas relevante

```
src/
  routes/            — uma rota por arquivo (TanStack Router). Ex: jornada.tsx é a tela principal.
  components/        — componentes de UI específicos do devocional (não confundir com components/ui/, que é shadcn)
  hooks/             — hooks de dados (useAuth, usePerfil, useJornada, usePedidosOracao, useSom...)
  lib/
    devocional.ts    — TODO o conteúdo dos 40 dias (título, Palavra de Deus, oração, propósito, frase, áudio, sincronia)
    perfis.ts        — tipo Papel e a chave CONTROLE_DE_PERFIL_HABILITADO
    *.functions.ts   — server functions (TanStack Start), rodam no servidor mas são chamáveis do cliente
    *.server.ts      — módulos só-servidor (nunca importar diretamente de um arquivo de rota/componente)
  integrations/supabase/ — clientes Supabase (cliente browser, cliente server com service role, middleware de auth)
public/audio/        — os arquivos .ogg de cada dia (dia-01.ogg, dia-02.ogg, ...)
supabase/migrations/ — migrations SQL (ver seção 7 — aplicação NÃO é automática neste ambiente de trabalho)
```

## 5. Status atual do conteúdo (os 40 dias)

**22 de 40 dias completos** (título oficial, texto real da oração transcrito, áudio e sincronia do destaque com o áudio). Ver `src/lib/devocional.ts` — cada dia pronto tem um bloco `const diaN = ...; if (diaN) { ... }` logo após a definição do array `areas`, sobrescrevendo o conteúdo placeholder original.

| Área | Dias | Status |
|---|---|---|
| 1 — Caminhando com Deus | 1-5 | completa |
| 2 — Quando a vida aperta | 6-10 | completa |
| 3 — O poder da oração | 11-15 | completa |
| 4 — Deus cuida de mim | 16-20 | completa |
| 5 — Perdão e recomeço | 21-25 | 21 e 22 prontos; faltam 23-25 |
| 6 — Fé para viver | 26-30 | placeholder |
| 7 — Quando Deus age no impossível | 31-35 | placeholder |
| 8 — Uma nova vida com Deus | 36-40 | placeholder |

### Como um novo dia é processado (fluxo usado até aqui)

1. Recebe-se o áudio (`.ogg`, gravação espontânea de Marcos) e o texto transcrito (`.docx`, via TurboScribe)
2. Copia-se o áudio para `public/audio/dia-NN.ogg`
3. Roda-se `ffprobe` (duração) e `ffmpeg -af silencedetect=noise=-30dB:d=0.4` (detecta pausas de fala reais)
4. Calcula-se a fronteira proporcional de cada parágrafo (por tamanho de texto) e casa-se com a pausa detectada mais próxima → gera `oracaoTempos` (array de segundos de início de cada parágrafo)
5. Adiciona-se o bloco `if (diaN) {...}` em `devocional.ts` com `titulo`, `audioUrl`, `oracaoTempos`, `oracao` (array de parágrafos)
6. Build + typecheck (`tsc --noEmit`) + lint (`eslint --fix`) antes de todo commit
7. Commit + push direto para o branch `main`

O destaque de texto sincronizado (`PlayerOracao.tsx`) usa `oracaoTempos` quando presente; sem isso, cai para uma estimativa proporcional por tamanho de texto (menos precisa).

## 6. Controle de perfil — LIGADO em 30/08/2026

Existe uma chave central, `CONTROLE_DE_PERFIL_HABILITADO` em `src/lib/perfis.ts`, agora em `true`. Login com Google/Apple está ativo; `jornada.tsx` e `dia.$numero.tsx` usam `useAuth` + `useJornada` (Supabase) em vez do antigo modo sem login (`useJornadaDev`, mantido no repositório só como referência histórica).

- **Tabela `perfis`** (Supabase): `user_id`, `papel` (`administrador` | `intercessor` | `membro` | `visitante`), `acessos_devocional` (contador, ver Visitante abaixo), `tornou_se_membro_em` (timestamp, preenchido automaticamente por um gatilho no banco na primeira vez que o papel vira `membro` — funciona tanto pela sincronização automática de pagamento quanto por promoção manual). RLS: o usuário só cria a si mesmo como `visitante`; promoção de papel exige `service_role`; o próprio usuário só pode alterar a coluna `acessos_devocional` da própria linha (GRANT de coluna, não de papel).
- **`sincronizarPerfilAposLogin.functions.ts`**: conectada ao fluxo de login (`entrar.tsx`) — verifica pagamento confirmado na planilha via Apps Script e promove para `membro` automaticamente; nunca promove a `administrador` nem a `intercessor` (sempre manual). **Importante**: o `redirect_uri` do login social precisa apontar para `/entrar` (não para `/`) — já foi um bug real corrigido, porque a raiz do site não roda essa sincronização.
- **Administrador designado**: Marcos Nascimento de Sousa, `grupomarcosnascimento@gmail.com` — promovido manualmente via SQL.
- **Intercessor**: pessoa preparada para responder pedidos de oração no mural, apoiando esse trabalho junto com o administrador — pensado para quando o administrador não estiver disponível; a tendência é ter vários intercessores ao longo do tempo. Promoção sempre manual via SQL, igual ao administrador. Pode responder pedidos e remover as próprias respostas; não pode fixar pedidos nem remover pedidos/respostas de outras pessoas (isso continua exclusivo do administrador).
- **Menu lateral**: item "Administração" (item 1) só aparece se `papel === 'administrador'` — intercessor não vê esse item nem seus subitens. Reúne 5 subitens: 1.1 Dashboard (`/admin`), 1.2 Cadastros, 1.3 Controle, 1.4 Regras de Negócio, 1.5 Usuários/Permissionamento (as 4 últimas são placeholders — ver seção 9). Todas as rotas exigem login + papel administrador de verdade (não é só o item de menu escondido).
- **Visitante** — regras completas, implementadas em 01-02/09/2026:
  - Cai direto na aba "Jornada de Oração" ao entrar (não em "Devocional")
  - Pode navegar até "Devocional", mas só o **Dia 1** fica desbloqueado (degustação) — vale tanto na listagem quanto na rota `/dia/$numero` direto
  - **A partir da 2ª visita** à aba "Devocional" (contador `acessos_devocional` na conta, não no navegador — sobrevive a limpar cookies), a aba inteira (TV Oracional + as 4 sub-abas) é substituída por uma tela única "Quero ser membro"
  - Na aba "Jornada de Oração" (destino padrão do visitante), tem acesso **igual ao dos membros** ao mural de Pedidos de Oração — publica e vê pedidos livremente, sem limite de quantidade nem de tempo (mudança de 02/09/2026, motivada por um caso real de urgência: alguém pedindo oração por um familiar em estado grave)
  - Só a versão de "Pedidos de Oração" **dentro da aba Devocional** (com reações/fixar/responder) continua bloqueada para visitante — a de "Jornada de Oração" é a mesma dos membros, sem essa restrição
  - "Pedidos de Oração" dentro de "Devocional" (a versão dos membros, com reações/respostas/fixar) continua bloqueada — o visitante usa a versão dele, dentro de "Jornada de Oração"

### Ainda pendente

1. Gate de pagamento (`jornadas.tem_acesso`) — a tabela já tem esse campo, mas nenhuma tela ainda o verifica antes de liberar o conteúdo
2. Conteúdo definitivo da aba "Jornada de Oração" (vídeo/link da transmissão da "Semana da Jornada de Oração" e texto da campanha) — hoje só placeholder
3. Conteúdo real das 4 páginas administrativas criadas em 05/09/2026 (Cadastros, Controle, Regras de Negócio, Usuários/Permissionamento) — hoje são só placeholders "em construção", protegidos por login+administrador, aguardando definição do que cada uma deve fazer de verdade

## 7. Banco de dados (Supabase) — atenção especial

Este ambiente de trabalho (onde o código é editado) não tem acesso de rede ao Supabase real do projeto. Toda migration em `supabase/migrations/` é só o arquivo SQL — ele só passa a valer no banco de verdade quando:

- O Lovable sincroniza automaticamente (nem sempre imediato), **ou**
- Alguém cola o SQL manualmente no **SQL Editor** do painel do Supabase

**Isso já causou pelo menos um bug real**: a tabela `pedidos_oracao` foi criada no código mas ainda não existia no banco ao vivo, gerando erro `PGRST205 - Could not find the table`. Sempre que uma migration nova for adicionada, avisar o usuário que ela precisa ser aplicada manualmente se o sintoma aparecer.

### Tabelas existentes

| Tabela | Propósito |
|---|---|
| `jornadas` | Progresso do usuário nos 40 dias (dias concluídos, acesso liberado) |
| `perfis` | Papel do usuário, contador de acessos ao Devocional (visitante), data em que virou membro, data do último acesso |
| `pedidos_oracao` | Pedidos de oração (papel de quem postou, se está fixado, Realtime habilitado) |
| `respostas_pedidos_oracao` | Respostas de administrador/intercessor a um pedido específico |
| `reacoes_pedidos_oracao` | Reações em emoji aos pedidos (uma por pessoa por pedido) |
| `avisos` | Avisos do painel do topo — tipo (incl. "evento", com `data_evento` para contagem regressiva), público-alvo, título opcional |
| `logs_acesso` | Uma linha por abertura do app (não por pessoa) — usada para contar "vezes que o app foi aberto hoje", excluindo o administrador |
| `leads_captacao` | Contatos (nome/e-mail/WhatsApp) captados na página `/oracao-urgente`, antes da pessoa logar de verdade |
| `push_subscriptions` | Inscrições de notificação push de cada pessoa (endpoint + chaves do navegador) |

Todas com RLS habilitada. Funções `SECURITY DEFINER` (`eh_administrador()`, `pode_responder_pedidos()`) usadas nas policies para evitar recursão — sempre com `EXECUTE` revogado de `anon`/`PUBLIC` e `SET search_path = public` (ver `AGENTS.md` para a convenção completa).

## 8. Variáveis de ambiente / secrets

Configuradas nas configurações do projeto no Lovable (Cloud tab), nunca commitadas:

| Variável | Uso |
|---|---|
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | Cliente Supabase (browser e server) |
| `SUPABASE_SERVICE_ROLE_KEY` | Cliente admin server-side (`client.server.ts`), usado por `sincronizarPerfilAposLogin` |
| `APPS_SCRIPT_URL`, `APPS_SCRIPT_CHAVE` | Consulta ao Apps Script (planilha de pagamentos) — ver `appsScriptPagamento.server.ts` |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` | Notificações push — assinatura das mensagens enviadas (ver seção 15). `VAPID_PRIVATE_KEY` é um JSON (formato JWK, não uma string simples) |
| `MP_ACCESS_TOKEN` | Usado pela landing page separada (não este repositório), para gerar Pix dinâmico via Mercado Pago |

## 9. Funcionalidades já construídas na tela principal (`jornada.tsx`)

- **Menu lateral** (`AppShell.tsx`): recolhível, com hierarquia numerada 1 a 8: 1. Administração (restrito a administrador, com 5 subitens — 1.1 Dashboard, 1.2 Cadastros, 1.3 Controle, 1.4 Regras de Negócio, 1.5 Usuários/Permissionamento, as 4 últimas ainda placeholder), 2. Introdução, 3. Apresentação (com 2 subitens), 4. Força da oração, 5. Palavra ao leitor, 6. Por que 40 dias, 7. Como viver, 8. Os 40 Dias de Oração. Botão "Sair da conta" no rodapé. Suporta níveis de profundidade variáveis (ex: 3.1, 3.2) via renderização recursiva.
- **Mural do topo** (`MuralTopo.tsx`): faixa fina com frases curtas em letreiro animado (direita → esquerda), alterna entre frases automaticamente
- **Painel de avisos** (`PainelAvisos.tsx`): notícias/avisos dispensáveis, tipados (notícia/aviso/alerta/comunicado/evento) com selo colorido, animação de entrada e pulso no tipo alerta. O tipo **evento** mostra uma **contagem regressiva ao vivo** ("Faltam X dias, Y horas, Z minutos e W segundos", atualizando a cada segundo) até uma data/hora definida pelo administrador. Título é **opcional** — sem ele, o painel mostra só a mensagem. Cada aviso tem um **público-alvo** (todos / visitante / todos os membros / só novos membros — até 7 dias desde que virou membro). Gerenciados pelo administrador direto no Dashboard (`GerenciarAvisos.tsx`), sem precisar editar código.
- **TV Oracional** (`TVOracional.tsx`): vídeo do YouTube embutido (API oficial `window.YT.Player`, não postMessage cru — isso corrigiu um bug real de instabilidade), sem controles do YouTube visíveis. **Rodízio automático entre dois vídeos** (vídeo principal por 10 min, depois o secundário por 1 min, contínuo). Som controlado pelo mesmo interruptor global (`useSom`).
- **Duas camadas de abas**: externa ("Devocional" / "Jornada de Oração") e interna, dentro de "Devocional" ("40 Dias de Oração" / "Pedidos de Oração" / "Acompanhamento espiritual" / "Agenda de eventos" — as duas últimas ainda são placeholder "em breve"). Para o Visitante, a aba externa "Devocional" fica bloqueada a partir da 2ª visita (ver seção 6).
- **Pedidos de Oração** (`MuralPedidosOracao.tsx`, dentro de "Devocional", para membro/administrador/intercessor): publicar pedido, reagir com emoji (🙏 ❤️ 🕊️ 🙌), responder publicamente (administrador/intercessor, com destaque visual vermelho), fixar um pedido no topo (administrador), remover pedido (autor ou administrador) ou resposta (autor da resposta ou administrador). Tudo em tempo real via Supabase Realtime. Lista com rolagem própria (não a página inteira), com auto-rolagem para o mais novo e aviso discreto quando a pessoa está lendo pedidos antigos. **Selo vermelho de não vistos** (estilo WhatsApp) no rótulo da aba, contando pedidos chegados desde a última visita — some ao abrir a aba.
- **Jornada de Oração** (aba padrão do Visitante, mas acessível a todos): reformulada em 02/09/2026 para **acolhimento imediato, sem framing comercial** — motivado por um caso real de urgência (visitante pedindo oração por familiar em estado grave). Texto: "um movimento de intercessão pelas pessoas". Tem a **TV Oracional** (a mesma da aba Devocional) e o **mural completo de Pedidos de Oração** (`MuralPedidosOracao`, igual ao dos membros — reações, tempo real) logo abaixo — qualquer pessoa logada publica e vê pedidos livremente, sem espera nem venda. *`MuralVisitanteOracao.tsx` ficou órfão nessa mudança (não é mais importado em lugar nenhum) — mantido no repositório só como referência histórica, não apagado.*
- **Dashboard administrativo** (`admin.tsx`, só administrador): métricas em tempo real — quantidade de membros, gráfico comparando os 4 papéis, "Pessoas conectadas agora" (total) e "Membros simultâneos agora" (via Supabase Realtime Presence, canal único compartilhado — ver `AGENTS.md`), "Vezes que o app foi aberto hoje" (via `logs_acesso`, excluindo o administrador), painel "Quem está conectado agora" (nome + papel de cada pessoa), painel "Pedidos de oração sem resposta" (responde direto ali), e o gerenciamento de avisos.
- **Página de acolhimento urgente** (`/oracao-urgente`): fora do fluxo comercial da landing page — pensada para quem chega precisando de oração, não de uma oferta. Formulário leve (nome, e-mail, WhatsApp opcional) salvo em `leads_captacao`, seguido do convite para entrar com Google/Apple e já escrever o pedido na Jornada de Oração.
- **Instalação como app (PWA)**: manifesto + ícone próprio (cruz dourada sobre navy) + service worker mínimo (`public/sw.js`, sem cache — o conteúdo é dinâmico demais). Banner de sugestão (`SugestaoInstalarApp.tsx`): no Android, botão que dispara o diálogo nativo; no iOS, passo a passo manual (só caminho que a Apple permite).
- **Notificações push** (`useNotificacoesPush.ts`, `enviarNotificacaoAviso.functions.ts`): banner de sugestão (`SugestaoNotificacoes.tsx`), inscrição salva em `push_subscriptions`, envio disparado automaticamente ao publicar um aviso no Dashboard, respeitando o público-alvo do aviso. Ver seção 15 para detalhes técnicos importantes (a biblioteca usada não é a mais óbvia).
- **Player de oração** (`PlayerOracao.tsx`): áudio com destaque de texto sincronizado por parágrafo

## 10. Decisões de UX deliberadas (não mexer sem entender o porquê)

- **Nunca usar barra de menu fixa no topo** — o menu é lateral; qualquer elemento fixo no topo (mural, botão de menu mobile) deve ser fino e discreto
- **Página do dia deve ser rápida** — sem textos de reflexão longos, só Palavra de Deus curta + áudio + propósito sucinto + frase final
- **Tom de voz sempre acolhedor, nunca de cobrança** — inclusive em textos de sistema/erro
- **Botões "Vídeo do dia" e "Testemunhos"** aparecem desde já em cada dia, mas sempre desabilitados ("Em breve disponível") — intencional, para gerar expectativa

## 11. O que fica combinado mas não deve ser feito sem pedido explícito

- Não aplicar migrations diretamente no banco (não há acesso de rede para isso de qualquer forma) — sempre pedir para o usuário repassar ao Lovable
- Não decidir sozinho novas regras de acesso ou de negócio (ex: preço, duração de janelas de tempo como os 7 dias de "novo membro") sem confirmar antes
- Não implementar as ideias registradas na seção 13 (acompanhamento espiritual) sem pedido explícito — ficou combinado só registrar, não construir

## 12. Processo de trabalho neste repositório

Este projeto foi (e continua sendo) desenvolvido em parceria com um assistente de IA, operando num ambiente sem acesso de rede ao Supabase/GitHub por padrão, exceto por domínios específicos liberados (github.com, npm). O fluxo padrão para qualquer mudança:

1. Editar os arquivos
2. `npx vite build` (garante que compila, incluindo geração de rotas)
3. `npx tsc --noEmit` (checagem de tipos)
4. `npx eslint --fix <arquivos>` seguido de `npx eslint <arquivos>` (lint limpo, zero avisos)
5. Commit com mensagem descritiva + push direto para `main`

Veja `AGENTS.md` para instruções mais diretas caso você seja um agente de IA continuando este trabalho.

## 13. Ideia registrada para o futuro — Acompanhamento espiritual individual (vídeochamada paga)

Discutido, **ainda não implementado** — só o texto de "em breve" foi colocado na aba "Acompanhamento espiritual" por enquanto.

Objetivo: membro paga para agendar um encontro individual em vídeochamada com Marcos Nascimento.

Dois caminhos possíveis, avaliados:

1. **Agendamento + ferramenta externa (recomendado para começar)** — o app cuida só de agenda e pagamento; a chamada em si acontece no Google Meet/Zoom (link gerado e enviado ao membro). Mais rápido de construir, sem custo de infraestrutura de vídeo.
2. **Vídeo-chamada embutida no app** — usando um serviço pronto (ex: Daily.co, Twilio Video), mais integrado à experiência, mas mais esforço de construção e custo variável por minuto/sessão.

Recomendação registrada: começar pelo caminho 1 para validar a demanda antes de investir na solução embutida.

Independente do caminho escolhido, vai precisar de: agenda de disponibilidade do Marcos, um produto/preço separado da assinatura do devocional, lembretes antes do horário marcado, e um marcador no perfil do usuário indicando que ele contratou esse serviço.

## 14. Notificações push — detalhes técnicos importantes

Implementado em 03-05/09/2026, com uma descoberta importante no meio do caminho.

- **Fluxo**: `useNotificacoesPush.ts` pede permissão ao navegador, inscreve via Push API (`pushManager.subscribe`), salva `endpoint`/`p256dh`/`auth` em `push_subscriptions`. `enviarNotificacaoAviso.functions.ts` (server function) busca quem se encaixa no público-alvo do aviso publicado, e envia para cada inscrição correspondente.
- **⚠️ NUNCA usar a biblioteca `web-push` (npm)** — ela é **oficialmente incompatível com Cloudflare Workers** (confirmado pelos próprios mantenedores, issue aberta desde 2022: depende de `Buffer` e do módulo `crypto` do Node, que o Workers não tem de verdade, só polyfills parciais que causam comportamento inconsistente — erros vistos: `webpush.setVapidDetails is not a function`, `buffer.hasOwnProperty is not a function`). Usar **`@pushforge/builder`** no lugar: só Web Crypto API + `fetch`, nativo no Workers.
- **Formato da chave privada mudou**: `@pushforge/builder` usa uma chave privada em formato **JWK** (um objeto JSON), não a string base64url simples que `web-push` usava. Gerar com `npx @pushforge/builder vapid`.
- **Rotação de chave = gente precisa ativar de novo**: se as chaves VAPID forem trocadas, inscrições antigas (feitas com a chave pública anterior) passam a falhar com `HTTP 403`. `useNotificacoesPush.ts` já trata isso automaticamente para inscrições *novas* (desfaz qualquer inscrição existente antes de criar uma nova), mas quem já tinha uma inscrição de antes da troca pode precisar resetar manualmente a permissão de notificação do site (nas configurações do navegador) para o banner de "Ativar" voltar a aparecer.
- **Urgência alta**: `urgency: "high"` no envio (necessário mas não suficiente para o Android tratar como notificação "heads-up" — isso também depende de uma configuração de importância de canal que só o próprio Android expõe, por pessoa/aparelho, fora do nosso controle).
- **Diagnóstico embutido**: se o envio falhar, o motivo aparece direto na tela do Dashboard (toast), incluindo o texto do erro real quando disponível — o erro acontece no servidor, então o Console do navegador de quem está testando não ajuda nesse caso específico.

## 15. Instalação como app (PWA)

Implementado em 05/09/2026.

- `public/manifest.json`, `public/icon-*.png` (ícone próprio: cruz dourada sobre navy — o favicon anterior era um placeholder genérico, sem relação com a identidade do devocional), `public/sw.js` (service worker mínimo, sem cache).
- `useInstalarApp.ts`: detecta `beforeinstallprompt` (Android/Chrome) e sistema iOS separadamente; nunca sugere nada se o app já estiver rodando instalado (modo standalone).
- Pré-requisito indireto para notificações push funcionarem bem no iOS (Safari só permite push para PWAs instalados na tela inicial).

## 16. Plano de arquitetura futura (registrado, não iniciado)

Discutido em 05/09/2026, motivado por instabilidades reais e recorrentes do **editor** do Lovable ao longo do desenvolvimento (nunca do site publicado — só da capacidade de publicar/editar em determinados momentos). Registrado como direção para um **próximo projeto**, não uma migração deste.

**Recomendação para um projeto novo:**

1. **Supabase próprio**, fora do Lovable Cloud — migrations aplicadas diretamente (por mim ou pelo usuário), sem depender do chat do Lovable estar disponível
2. **Deploy automático via GitHub** (Cloudflare Pages ou Vercel) — o próprio serviço de hospedagem observa o repositório e publica sozinho a cada mudança, em 1-2 minutos, sem "botão de publicar" de terceiro que possa ficar instável
3. **Ambiente de homologação de graça**: esses mesmos serviços geram automaticamente um link de teste separado para cada branch/mudança ("preview deployment") — dá pra testar antes de ir para o código oficial, sem precisar construir nada a mais para isso
4. Construção do código continua como já funciona: neste chat (ou via Claude Code, se o usuário quiser trabalhar diretamente no próprio computador)

**Trade-off reconhecido**: perde-se a experiência de editor visual do Lovable (ver a IA dele mexendo na tela). Avaliação registrada: nesse projeto específico, quase todo trabalho de peso já passa por este chat, não pelo editor do Lovable digitado diretamente — a perda seria pequena frente ao ganho de estabilidade.

## 17. Histórias de Usuário (documento vivo)

Documento Word separado, cobrindo **todas** as funcionalidades do devocional em formato de histórias de usuário, numeradas por área (10 áreas, ~70 histórias). Gerado a partir de `docs/historias-usuario/gerar.js` — ver o README dentro dessa pasta para saber como atualizar quando uma funcionalidade nova for construída ou mudar de status.
