<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

---

## Para agentes de IA continuando este projeto

Leia o `README.md` primeiro — ele tem o contexto completo do produto, do modelo de negócio e do status atual. Esta seção é só o "como trabalhar aqui" prático.

### Checklist obrigatório antes de qualquer commit

1. `npx vite build` — precisa passar sem erro (também regenera `src/routeTree.gen.ts` se rotas mudaram)
2. `npx tsc --noEmit` — zero erros de tipo
3. `npx eslint --fix <arquivos alterados>` seguido de `npx eslint <arquivos alterados>` — zero avisos/erros
4. `rm -f package-lock.json` antes de `git add -A` (o projeto usa `bun.lock`; não deixar os dois lockfiles coexistindo)
5. Commit descritivo (pode ser em português) + push direto para `main`

### Convenções do código

- **Nomes de variáveis, funções e comentários em português** — é o padrão de todo o projeto, mantenha
- **Sombra 3D consistente**: reaproveitar `sombra3d`/`sombra3dAberto` de `src/lib/estilo3d.ts` em vez de inventar novo `boxShadow` — é o que dá a identidade visual "cartão elevado" usada em todo o app
- **Tom de voz**: todo texto de interface (inclusive erros/estados vazios) segue o tom acolhedor descrito no README, seção 10 — nunca soar corporativo ou de cobrança
- **Server functions (`*.server.ts`)**: nunca importe um módulo `*.server.ts` no topo do arquivo se ele expõe segredos (ex: `client.server.ts`, que usa `SUPABASE_SERVICE_ROLE_KEY`) — use `await import(...)` dinâmico dentro do `handler`, como em `sincronizarPerfilAposLogin.functions.ts`. Arquivos `.functions.ts` são empacotados para o cliente (como um stub RPC), então qualquer import no topo do arquivo vai parar no bundle do navegador.
- **Funções `SECURITY DEFINER` no banco** (ex: `eh_administrador()`, usada para checar papel sem recursão de RLS): sempre revogar `EXECUTE` de `anon`/`PUBLIC` depois de criar, mantendo só para `authenticated`. Essas funções servem só para as próprias policies de RLS chamarem internamente — não devem ser executáveis diretamente por qualquer um. Também sempre incluir `SET search_path = public` na definição da função (evita o alerta de "search path mutável" do linter de segurança do Supabase, e previne um tipo de ataque onde alguém manipula o search_path da sessão para a função resolver um objeto errado).
- **Dois hooks abrindo um canal Supabase Realtime com o mesmo nome fixo, ao mesmo tempo, na mesma página**: causa erro real em produção (não aparece no build nem no ambiente de teste local) — já aconteceu duas vezes neste projeto. Duas soluções diferentes, dependendo do tipo de canal:
  - **`postgres_changes`** (escutar mudanças numa tabela, ex: `usePedidosOracao`, `useReacoesPedidos`, `useRespostasPedidos`, `useAvisos`): cada hook só precisa ouvir por si, então basta dar um nome de canal único por instância (`useId()` do React, ou `Math.random()` dentro do `useEffect`).
  - **`presence`** (saber quem está conectado, ex: `usePresencaGlobal.ts`): aqui NÃO dá pra usar nomes únicos, porque todo mundo precisa estar no mesmo canal pra se enxergar. A solução é um único canal compartilhado (variável de módulo, criado e inscrito uma única vez), com uma função interna para "anunciar presença" e outra para "assinar atualizações", que todos os hooks chamam — nunca cada hook abrindo o próprio canal.
  - Ao criar qualquer hook novo que abra um canal Supabase Realtime, sempre se perguntar: "esse hook pode estar ativo mais de uma vez ao mesmo tempo na mesma página?" — se sim, precisa de um dos dois padrões acima.
- **Rotas**: TanStack Router baseado em arquivo. Nomes com ponto (`apresentacao.caminhada.tsx`) viram `/apresentacao/caminhada`. Sempre rodar `npx vite build` depois de criar/renomear uma rota para regenerar `routeTree.gen.ts`.
- **Conteúdo dos 40 dias**: nunca editar o array `areas` diretamente para um dia já processado — o padrão é um bloco `const diaN = todosOsDias.find(...); if (diaN) { dia N.titulo = ...; ... }` logo depois do array, sobrescrevendo o placeholder. Siga esse padrão para manter o histórico de diffs legível.

### Coisas que já foram tentadas e não funcionaram (não repetir)

- **Controlar o player do YouTube via `postMessage` cru** (sem a API oficial `window.YT.Player`): causava instabilidade real — o evento `onLoad` do iframe disparava antes do player estar de fato pronto para receber comandos, principalmente após SSR/refresh. Corrigido usando a API oficial (ver `TVOracional.tsx`). Não reverter para postMessage cru.
- **Assumir que uma migration nova já está ativa no banco real**: este ambiente de trabalho não tem acesso de rede ao Supabase do usuário. Toda migration em `supabase/migrations/` precisa ser aplicada manualmente por ele (SQL Editor do Supabase) ou via sincronização do Lovable — nunca presumir que já rodou. Se uma funcionalidade nova envolvendo banco não funcionar, o primeiro suspeito é sempre "a migration não foi aplicada ainda" (erro típico: `PGRST205 - Could not find the table`).
- **Chamar `useSom()` (ou qualquer hook com estado local) em dois componentes que precisam compartilhar o mesmo valor ao vivo**: cada chamada cria uma instância de estado independente (só o valor inicial vem do `localStorage`; mudanças não se propagam entre instâncias). Quando dois componentes precisam do mesmo estado reativo (ex: `TVOracional` e o `InterruptorSom` no rodapé dela), o padrão é o componente pai chamar o hook uma vez e passar `ativo`/`alternar` como props para o filho (ver como `InterruptorSom.tsx` aceita esses props opcionais, com fallback para o próprio hook quando usado isoladamente).
- **`redirect_uri` do login social apontando para a raiz do site (`/`)**: causou um bug real onde `sincronizarPerfilAposLogin` nunca era chamada, porque a página raiz só verifica se há sessão e redireciona — não roda a sincronização de perfil/pagamento. Corrigido apontando o `redirect_uri` para `/entrar` (`entrar.tsx`), onde essa checagem de fato acontece. Se mexer no fluxo de login, sempre confirmar que o OAuth volta para `/entrar`.
- **Deixar uma tela de carregamento sem tratamento de erro**: se uma consulta (ex: `usePerfil`) falhar (por exemplo, uma coluna nova que a migration ainda não aplicou no banco real), a tela pode ficar presa numa mensagem de "carregando" para sempre, sem explicação — isso já aconteceu de verdade e afetou vários usuários ao mesmo tempo. Qualquer tela que dependa de uma consulta assim (`jornada.tsx`, `dia.$numero.tsx`) precisa checar o estado `isError` da query e mostrar uma tela de erro com botão de tentar de novo, nunca só a tela de carregamento condicionada a `isLoading`.

### Decisões deliberadamente pausadas — não resolver sozinho

- Gate de pagamento (`jornadas.tem_acesso`) — campo existe na tabela, mas nenhuma tela ainda verifica antes de liberar conteúdo
- Conteúdo definitivo da aba "Jornada de Oração" (vídeo/link real da "Semana da Jornada de Oração", texto da campanha) — hoje só placeholder, aguardando o autor
- As ideias registradas no README (seção 13, acompanhamento espiritual em vídeochamada; e outras trilhas temáticas de 40 dias discutidas em conversa) — registradas, não implementar sem pedido explícito

