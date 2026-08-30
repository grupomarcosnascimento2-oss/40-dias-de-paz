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
- **Server functions** (`*.functions.ts`, via `createServerFn` do `@tanstack/react-start`): nunca importe um módulo `*.server.ts` no topo do arquivo se ele expõe segredos (ex: `client.server.ts`, que usa `SUPABASE_SERVICE_ROLE_KEY`) — use `await import(...)` dinâmico dentro do `handler`, como em `sincronizarPerfilAposLogin.functions.ts`. Arquivos `.functions.ts` são empacotados para o cliente (como um stub RPC), então qualquer import no topo do arquivo vai parar no bundle do navegador.
- **Rotas**: TanStack Router baseado em arquivo. Nomes com ponto (`apresentacao.caminhada.tsx`) viram `/apresentacao/caminhada`. Sempre rodar `npx vite build` depois de criar/renomear uma rota para regenerar `routeTree.gen.ts`.
- **Conteúdo dos 40 dias**: nunca editar o array `areas` diretamente para um dia já processado — o padrão é um bloco `const diaN = todosOsDias.find(...); if (diaN) { dia N.titulo = ...; ... }` logo depois do array, sobrescrevendo o placeholder. Siga esse padrão para manter o histórico de diffs legível.

### Coisas que já foram tentadas e não funcionaram (não repetir)

- **Controlar o player do YouTube via `postMessage` cru** (sem a API oficial `window.YT.Player`): causava instabilidade real — o evento `onLoad` do iframe disparava antes do player estar de fato pronto para receber comandos, principalmente após SSR/refresh. Corrigido usando a API oficial (ver `TVOracional.tsx`). Não reverter para postMessage cru.
- **Assumir que uma migration nova já está ativa no banco real**: este ambiente de trabalho não tem acesso de rede ao Supabase do usuário. Toda migration em `supabase/migrations/` precisa ser aplicada manualmente por ele (SQL Editor do Supabase) ou via sincronização do Lovable — nunca presumir que já rodou. Se uma funcionalidade nova envolvendo banco não funcionar, o primeiro suspeito é sempre "a migration não foi aplicada ainda" (erro típico: `PGRST205 - Could not find the table`).
- **Chamar `useSom()` (ou qualquer hook com estado local) em dois componentes que precisam compartilhar o mesmo valor ao vivo**: cada chamada cria uma instância de estado independente (só o valor inicial vem do `localStorage`; mudanças não se propagam entre instâncias). Quando dois componentes precisam do mesmo estado reativo (ex: `TVOracional` e o `InterruptorSom` no rodapé dela), o padrão é o componente pai chamar o hook uma vez e passar `ativo`/`alternar` como props para o filho (ver como `InterruptorSom.tsx` aceita esses props opcionais, com fallback para o próprio hook quando usado isoladamente).

### Decisões deliberadamente pausadas — não resolver sozinho

- `CONTROLE_DE_PERFIL_HABILITADO` (`src/lib/perfis.ts`) permanece `false` até instrução explícita do usuário
- Regras de acesso do perfil Visitante ainda não foram definidas
- Login (`entrar.tsx`) existe mas não está no fluxo ativo — não reconectar por conta própria

