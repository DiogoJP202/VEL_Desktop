# QA Regression Checklist

Checklist objetivo para validar os fluxos principais do `VEL_Desktop` apos as refatoracoes recentes.

## Pre-requisitos

- API rodando e acessivel.
- Frontend `VEL_Desktop` rodando localmente.
- Usuario proprietario e usuario atendente validos.

## 1) Autenticacao e sessao

- [ ] Login proprietario redireciona para `/dashboard`.
- [ ] Login atendente redireciona para `/atendente`.
- [ ] Abrir `/login` com sessao ativa redireciona para a rota correta do papel.
- [ ] Logout limpa sessao e retorna para `/login`.
- [ ] Forcar `401` remove sessao e exibe aviso de expiracao.

## 2) Guards por papel

- [ ] Atendente tentando `/dashboard` eh redirecionado para `/atendente`.
- [ ] Proprietario tentando `/atendente` eh redirecionado para `/dashboard`.

## 3) Feedback e toasts

- [ ] Acoes de sucesso exibem toast (login, cadastro, edicao, envio).
- [ ] Erros de API exibem toast amigavel.
- [ ] Toast fecha automatico e tambem fecha com botao `x`.
- [ ] Tecla `Esc` fecha o toast mais recente.

## 4) Estados de carregamento e erro

- [ ] `Dashboard` mostra carregamento e recupera dados sem quebrar layout.
- [ ] `Pagamentos` mostra carregamento e lista dados apos retorno.
- [ ] `TabelaEntregador` e `TabelaCoordenador` mostram estado vazio quando nao ha dados.
- [ ] Em falha de API, aparece estado de erro com botao `Tentar novamente`.

## 5) Formularios e modais

- [ ] `FormAtendente`: enviar pedido funciona e botao vira `ENVIANDO...`.
- [ ] `ModalAddEntregador`: cadastrar funciona e botao vira `SALVANDO...`.
- [ ] `ModalPerfilEntregador`: editar funciona e botao vira `Salvando...`.
- [ ] Durante submissao, botoes de fechar/cancelar ficam bloqueados quando aplicavel.

## 6) Fluxos de faturamento/pagamentos

- [ ] `PaginaFaturamento` carrega dados e mostra valores de receitas/despesas dinamicos.
- [ ] `Pagamentos` abre e fecha card de detalhe sem glitches visuais.
- [ ] Filtro de mes em pagamentos continua funcional.

## 7) Integridade tecnica rapida

- [ ] Build local executa com sucesso (`npm run build`).
- [ ] Navegacao entre rotas principais ocorre sem tela branca.
- [ ] Sem erros criticos no console durante os cenarios acima.

## 8) Navegacao e compatibilidade de rotas

- [ ] Acessar aliases com maiusculas (ex.: `/Dashboard`, `/Pagamentos`, `/Atendente`) redireciona para a rota canonica.
- [ ] Alias de configuracao (`/Configuracao`) redireciona para `/configuracao`.
- [ ] Rota inexistente (ex.: `/rota-que-nao-existe`) abre a pagina 404.
- [ ] Botao da pagina 404 retorna para a pagina inicial.

## Resultado final

- [ ] Todos os itens acima validados.
- [ ] Pronto para commit e revisao.
