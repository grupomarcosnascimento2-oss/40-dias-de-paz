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
- **Três perfis de usuário** estão desenhados (ver seção 6): Administrador, Membro, Visitante. Só o Administrador e o Membro têm acesso pleno; o Visitante (ainda não implementado de fato) teria uma amostra/teaser.

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

## 6. Controle de perfil — implementado, ainda desligado

Existe uma chave central, `CONTROLE_DE_PERFIL_HABILITADO` em `src/lib/perfis.ts`, hoje em `false`. Enquanto ela for `false`, o app se comporta como hoje: **sem login, acesso livre** (modo criado deliberadamente para agilizar os ajustes visuais).

Toda a infraestrutura já está construída, esperando ser ligada:

- **Tabela `perfis`** (Supabase): `user_id`, `papel` (`administrador` | `membro` | `visitante`). RLS: o usuário só cria a si mesmo como `visitante`; promoção a `membro`/`administrador` exige `service_role`.
- **`sincronizarPerfilAposLogin.functions.ts`**: depois do login, consulta o Apps Script (planilha de pagamentos) e promove automaticamente para `membro` se o pagamento estiver confirmado.
- **Administrador designado**: Marcos Nascimento de Sousa, `grupomarcosnascimento@gmail.com` — precisa ser promovido **manualmente** no banco na primeira vez (nunca automático, por segurança).
- **Menu lateral já preparado**: item "Painel administrativo" (rota `/admin`, placeholder) só aparece se `papel === 'administrador'` — mas como a chave está desligada, esse item nunca aparece hoje.

### Para "ligar" de verdade, falta:

1. Reconectar o login (`entrar.tsx` já existe e funciona, só não está no fluxo ativo — `index.tsx` hoje redireciona direto para `/jornada`)
2. Trocar `useJornadaDev` (progresso local, `localStorage`) por `useJornada` (Supabase, já existe e já funciona) nas páginas `jornada.tsx` e `dia.$numero.tsx`
3. Mudar `CONTROLE_DE_PERFIL_HABILITADO` para `true`
4. Decidir e implementar as regras específicas do Visitante (ainda não definidas — hoje, se a chave for ligada sem mais nada, o Visitante herdaria o mesmo menu do Membro)
5. Promover manualmente a conta do administrador (ver acima)

## 7. Banco de dados (Supabase) — atenção especial

Este ambiente de trabalho (onde o código é editado) não tem acesso de rede ao Supabase real do projeto. Toda migration em `supabase/migrations/` é só o arquivo SQL — ele só passa a valer no banco de verdade quando:

- O Lovable sincroniza automaticamente (nem sempre imediato), **ou**
- Alguém cola o SQL manualmente no **SQL Editor** do painel do Supabase

**Isso já causou pelo menos um bug real**: a tabela `pedidos_oracao` foi criada no código mas ainda não existia no banco ao vivo, gerando erro `PGRST205 - Could not find the table`. Sempre que uma migration nova for adicionada, avisar o usuário que ela precisa ser aplicada manualmente se o sintoma aparecer.

### Tabelas existentes

| Tabela | Propósito | Migration |
|---|---|---|
| `jornadas` | Progresso do usuário nos 40 dias (dias concluídos, acesso liberado) | `20260823173838_...sql` |
| `perfis` | Papel do usuário (administrador/membro/visitante) | `20260828120000_perfis.sql` |
| `pedidos_oracao` | Mural de pedidos de oração da Comunidade de Oração (Realtime habilitado) | `20260830140000_pedidos_oracao.sql` |

## 8. Variáveis de ambiente / secrets

Configuradas nas configurações do projeto no Lovable (Cloud tab), nunca commitadas:

| Variável | Uso |
|---|---|
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | Cliente Supabase (browser e server) |
| `SUPABASE_SERVICE_ROLE_KEY` | Cliente admin server-side (`client.server.ts`), usado por `sincronizarPerfilAposLogin` |
| `APPS_SCRIPT_URL`, `APPS_SCRIPT_CHAVE` | Consulta ao Apps Script (planilha de pagamentos) — ver `appsScriptPagamento.server.ts` |
| `MP_ACCESS_TOKEN` | Usado pela landing page separada (não este repositório), para gerar Pix dinâmico via Mercado Pago |

## 9. Funcionalidades já construídas na tela principal (`jornada.tsx`)

- **Menu lateral** (`AppShell.tsx`): recolhível, com hierarquia numerada (Introdução, Apresentação com 2 subitens, Força da oração, Palavra ao leitor, Por que 40 dias, Como viver, Os 40 Dias de Oração, + Painel administrativo restrito a admin)
- **Mural do topo** (`MuralTopo.tsx`): faixa fina com frases curtas em letreiro animado (direita → esquerda), alterna entre frases automaticamente
- **Painel de avisos** (`PainelAvisos.tsx`): notícias/avisos dispensáveis, tipados (notícia/aviso/alerta/comunicado) — hoje vazio (`src/lib/avisos.ts`)
- **TV Oracional** (`TVOracional.tsx`): vídeo do YouTube embutido (API oficial `window.YT.Player`, não postMessage cru — isso corrigiu um bug real de instabilidade), sem controles do YouTube visíveis, som controlado pelo mesmo interruptor global (`useSom`)
- **Duas camadas de abas**: externa ("Devocional" / "Jornada de Oração" — esta última reservada para visitantes/não-membros, ainda placeholder) e interna ("40 Dias de Oração" / "Comunidade de Oração" / "Acompanhamento espiritual" / "Agenda de eventos" — só a primeira e a Comunidade estão implementadas de verdade, as outras duas são placeholder "em breve")
- **Comunidade de Oração** (`MuralPedidosOracao.tsx`): mural de pedidos de oração com publicação, atualização em tempo real (Supabase Realtime) e moderação (autor ou administrador podem remover) — assume que quem acessa já está logado, sem prompt de login inline (isso será resolvido pelo controle de acesso do item 6)
- **Player de oração** (`PlayerOracao.tsx`): áudio com destaque de texto sincronizado por parágrafo

## 10. Decisões de UX deliberadas (não mexer sem entender o porquê)

- **Nunca usar barra de menu fixa no topo** — o menu é lateral; qualquer elemento fixo no topo (mural, botão de menu mobile) deve ser fino e discreto
- **Página do dia deve ser rápida** — sem textos de reflexão longos, só Palavra de Deus curta + áudio + propósito sucinto + frase final
- **Tom de voz sempre acolhedor, nunca de cobrança** — inclusive em textos de sistema/erro
- **Botões "Vídeo do dia" e "Testemunhos"** aparecem desde já em cada dia, mas sempre desabilitados ("Em breve disponível") — intencional, para gerar expectativa

## 11. O que fica combinado mas não deve ser feito sem pedido explícito

- Não habilitar `CONTROLE_DE_PERFIL_HABILITADO`
- Não reconectar o login por conta própria
- Não aplicar migrations diretamente no banco (não há acesso de rede para isso de qualquer forma)
- Não decidir sozinho as regras de acesso do Visitante — ainda em aberto

## 12. Processo de trabalho neste repositório

Este projeto foi (e continua sendo) desenvolvido em parceria com um assistente de IA, operando num ambiente sem acesso de rede ao Supabase/GitHub por padrão, exceto por domínios específicos liberados (github.com, npm). O fluxo padrão para qualquer mudança:

1. Editar os arquivos
2. `npx vite build` (garante que compila, incluindo geração de rotas)
3. `npx tsc --noEmit` (checagem de tipos)
4. `npx eslint --fix <arquivos>` seguido de `npx eslint <arquivos>` (lint limpo, zero avisos)
5. Commit com mensagem descritiva + push direto para `main`

Veja `AGENTS.md` para instruções mais diretas caso você seja um agente de IA continuando este trabalho.
