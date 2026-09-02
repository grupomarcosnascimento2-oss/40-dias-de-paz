-- Registra a última vez que cada pessoa usou o devocional — usado no
-- Dashboard para contar quantos acessos aconteceram hoje, no total
-- (diferente da métrica de "membros simultâneos", que só mostra quem
-- está conectado agora).

ALTER TABLE public.perfis ADD COLUMN ultimo_acesso TIMESTAMP WITH TIME ZONE;

-- A policy de UPDATE já existente ("Usuario atualiza seu contador de
-- acessos", criada para acessos_devocional) já garante que só a própria
-- pessoa atualiza a própria linha — não é específica de coluna, então
-- vale também aqui. Só falta liberar a coluna nova para escrita.
GRANT UPDATE (ultimo_acesso) ON public.perfis TO authenticated;