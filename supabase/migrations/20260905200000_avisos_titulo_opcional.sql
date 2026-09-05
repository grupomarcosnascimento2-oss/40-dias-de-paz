-- Título do aviso passa a ser opcional — quando não informado, o
-- painel mostra só a mensagem, sem título em destaque acima dela.

ALTER TABLE public.avisos ALTER COLUMN titulo DROP NOT NULL;
