# Guia para o Cursor - VEL Desktop

Este documento explica como o projeto funciona atualmente para orientar alteracoes futuras no Cursor.

## Visao geral

Este repositorio e um front-end React com Vite para a plataforma VEL, uma aplicacao de gestao de entregas. O projeto nao contem backend local. As telas integradas consomem uma API externa hospedada em:

```txt
https://vel-tnpo.onrender.com
```

O app atual e uma SPA carregada por `index.html` e roteada em `src/main.jsx`.

## Stack principal

- React 18
- Vite 5
- React Router DOM
- styled-components
- CSS Modules
- Highcharts via `highcharts-react-official`
- react-icons

Scripts em `package.json`:

```bash
npm run dev       # servidor local Vite
npm run build     # build de producao
npm run preview   # preview da build
npm run lint      # ESLint
```

## Entrada da aplicacao

O ponto de entrada real e:

```txt
index.html
src/main.jsx
```

`src/main.jsx` cria o React root e registra as rotas com `BrowserRouter`, `Routes` e `Route`.

Rotas principais:

```txt
/                         -> Pagina inicial
/inicial                  -> Pagina inicial
/inicialingles            -> Pagina inicial em ingles
/pagamento                -> Pagamento/cadastro de plano
/sobrenos                 -> Sobre nos
/sobrenosen               -> Sobre nos em ingles
/login                    -> Login
/dashboard                -> Dashboard do proprietario
/recuperarsenha           -> Recuperacao de senha
/codigovalidacao          -> Codigo de validacao
/atendente                -> Tela do atendente
/atribuirentrega          -> Atribuir entrega
/pagamentos               -> Pagamentos
/entregadores             -> Entregadores
/faturamento              -> Faturamento
/configuracao             -> Configuracoes
/contratoentregador       -> Contratos de entregador
/contratoempregador       -> Contratos de empresa
/coordenador              -> Coordenadores
/perfilempresa            -> Perfil da empresa
/editarperfilempresa      -> Editar perfil da empresa
```

## Estrutura de pastas

```txt
src/
  main.jsx
  Paginas/
    ...
  components/
    ...
  assets/
    images/
public/
  images/
pages/
  ...
```

### `src/Paginas`

Contem as telas/rotas de alto nivel. Muitas delas apenas importam um componente de `src/components` e aplicam `GlobalStyle`.

Exemplos:

- `src/Paginas/Dashboard/app.jsx`
- `src/Paginas/PaginaLogin/app.jsx`
- `src/Paginas/PaginaInicial/App.jsx`
- `src/Paginas/PaginaPagamento/app.jsx`

### `src/components`

Contem os componentes reais de interface, menus, modais, tabelas, formularios, graficos e estilos.

Exemplos:

- `MenuLateral`
- `FormAtendente`
- `TabelaEntregador`
- `ModalAddEntregador`
- `ModalPerfilEntregador`
- `TelaPagamento`
- `Graficos`

### `pages`

A pasta `pages` parece legado/prototipo antigo. Os HTMLs apontam para entradas como:

```txt
../src/Paginas/PaginaInicial/main.jsx
```

Esses arquivos `main.jsx` por pagina nao existem atualmente. O app funcional deve ser tratado como SPA via `index.html` e `src/main.jsx`.

Evite criar novos fluxos baseados em `pages/` sem uma decisao explicita de migracao.

## Backend e API

Nao existe backend neste repositorio. O front usa `fetch` diretamente para a API externa.

Helper HTTP:

```txt
src/components/RequisicaoHTTP/Http.jsx
```

Esse helper apenas monta as opcoes do `fetch`:

```js
{
  method: Mt,
  body: JSON.stringify(data),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}
```

Ele nao faz tratamento de erro, nao injeta token e nao centraliza base URL.

## Endpoints usados atualmente

Base:

```txt
https://vel-tnpo.onrender.com
```

Endpoints encontrados:

```txt
POST /login/usuario
GET  /entregador/{userId}
GET  /faturamento/{userId}
POST /pedido/adicionar/{idUsuario}
POST /entregador/adicionar
PUT  /entregador/editar/{cpf}
GET  /coordenador/idcnpj/{userId}
```

Ha tambem uma chamada incompleta em `TelaPagamento`:

```js
fetch("<URL AQUI>", Http("POST", form))
```

Esse fluxo de pagamento ainda nao esta integrado.

## Estado local usado pelo app

O app usa `localStorage` para guardar dados importantes:

```txt
User   -> id retornado no login
Plano  -> valor do plano escolhido na landing page
```

O `User` e usado como identificador para buscar entregadores, faturamento, cadastrar pedidos e relacionar cadastros.

Nao existe token JWT, sessao, refresh token ou guarda de rota. Qualquer rota pode ser acessada diretamente pelo navegador. Se `localStorage.User` estiver ausente, as telas integradas tendem a chamar a API com `null` ou falhar.

## Fluxos atuais

### Landing page e plano

Arquivo principal:

```txt
src/Paginas/PaginaInicial/App.jsx
```

O usuario escolhe um plano. O valor e salvo em `localStorage.Plano` e o app navega para `/pagamento`.

### Pagamento

Arquivos:

```txt
src/Paginas/PaginaPagamento/app.jsx
src/components/TelaPagamento/TelaPagamento.jsx
```

Le `localStorage.Plano` e mostra um resumo. A submissao ainda esta incompleta porque usa `"<URL AQUI>"`.

Tambem existe um redirecionamento para `/pages/paginaLogin.html`, que nao segue o fluxo da SPA. Em novas alteracoes, prefira `useNavigate("/login")`.

### Login

Arquivo:

```txt
src/Paginas/PaginaLogin/app.jsx
```

Envia email e senha para `POST /login/usuario`.

Se `response.isproprietario` for verdadeiro:

```txt
localStorage.User = response.id
navega para /dashboard
```

Se for falso:

```txt
localStorage.User = response.id
navega para /atendente
```

Atencao: a condicao atual usa `else if (!response.isproprietario)`. Se a API retornar um objeto sem essa propriedade, o front tambem pode tratar como atendente. O ideal seria comparar explicitamente com `false`.

### Dashboard

Arquivo:

```txt
src/Paginas/Dashboard/app.jsx
```

Busca:

```txt
GET /entregador/{User}
GET /faturamento/{User}
```

Calcula faturamento diario, semanal, despesas e lista status dos entregadores. Usa Highcharts para graficos.

### Atendente

Arquivos:

```txt
src/Paginas/TelaAtendente/app.jsx
src/components/FormAtendente/index.jsx
```

O atendente cadastra pedidos. O submit envia:

```txt
POST /pedido/adicionar/{idUsuario}
```

O `idUsuario` vem de `localStorage.User`.

### Entregadores

Arquivos:

```txt
src/Paginas/TelaEntregador/app.jsx
src/components/TabelaEntregador/TabelaEntregador.jsx
src/components/ModalAddEntregador/index.jsx
src/components/ModalPerfilEntregador/index.jsx
```

Lista entregadores por `User`, permite abrir modal de perfil, cadastrar entregador e editar entregador.

### Coordenadores

Arquivos:

```txt
src/Paginas/TelaCoordenador/app.jsx
src/components/TabelaCoordenador/TabelaCoordenador.jsx
```

Busca coordenadores por CNPJ/id do usuario:

```txt
GET /coordenador/idcnpj/{User}
```

### Pagamentos e faturamento

Arquivos:

```txt
src/Paginas/Pagamentos/app.jsx
src/components/PaginaFaturamento/PaginaFaturamento.jsx
```

Buscam entregadores e faturamento na API, mas ainda misturam dados reais com dados estaticos em algumas partes da interface.

### Atribuir entrega

Arquivo:

```txt
src/components/AtribuirEntrega/AtribuirEntrega.jsx
```

Atualmente usa listas fixas de pedidos e entregadores. O formulario abre modal de confirmacao, mas nao envia a atribuicao para a API.

### Contratos, perfil e configuracoes

Essas areas sao majoritariamente estaticas:

```txt
src/components/PaginaContratosEmpresa/
src/components/PaginaContratosEntregador/
src/components/PaginaPerfilEmpresa/
src/components/PaginaEditarPerfilEmpresa/
src/components/PaginaConfiguracoes/
```

Perfil e contratos usam dados mockados. Configuracoes tem toggles e links visuais, mas sem persistencia real.

## Estilos

O projeto mistura:

- `styled-components`, geralmente em arquivos `.ts`
- CSS Modules, geralmente `estilo.module.css`
- estilos inline

Ha tambem `GlobalStyle` em:

```txt
src/components/globalStyles.js
```

Ele zera margem, padding e `box-sizing` do body.

Ao editar, prefira manter o padrao do componente atual. Se a tela ja usa styled-components, continue nele. Se usa CSS Module, continue no CSS Module.

## Pontos de atencao tecnica

### 1. Build passa

O comando abaixo foi validado e passou:

```bash
npm run build
```

O Vite emite apenas aviso de bundle grande.

### 2. Lint falha

O comando abaixo falha atualmente:

```bash
npm run lint
```

Foram encontrados muitos erros, principalmente:

- imports `React` nao usados
- variaveis nao usadas
- props sem validacao `prop-types`
- `class` em vez de `className`
- atributos SVG em formato HTML, como `fill-rule`
- ponto e virgula extra em alguns arquivos
- falta de `key` em alguns `.map`

Nao trate o lint falhando como regressao nova sem antes comparar com o estado atual.

### 3. Muitos formularios usam DOM direto

Varios componentes leem campos com `document.querySelector`, por exemplo:

```js
document.querySelector("#email").value
```

Isso funciona, mas nao e o padrao mais seguro em React. Ao refatorar formularios, prefira `useState`, `useRef` ou `FormData`.

### 4. URL da API esta hardcoded

A base URL aparece diretamente nos componentes:

```txt
https://vel-tnpo.onrender.com
```

Uma melhoria futura seria criar uma camada central, por exemplo:

```txt
src/services/api.js
```

e ler a URL por variavel de ambiente Vite:

```txt
VITE_API_URL
```

### 5. Sem protecao de rotas

Nao ha middleware, guard ou wrapper de autenticacao. Telas privadas dependem apenas de `localStorage.User`.

### 6. Possivel problema de codificacao

Varios textos aparecem com caracteres quebrados, como `PÃ¡gina`, `vocÃª`, `ConfiguraÃ§Ã£o`. Antes de alterar muito texto, verificar codificacao dos arquivos e padronizar para UTF-8.

## Recomendacoes para o Cursor ao editar

1. Use `src/main.jsx` como fonte das rotas atuais.
2. Nao use `pages/` como base para novas telas, a menos que a tarefa seja migrar/remover legado.
3. Preserve o estilo local da tela: styled-components com styled-components, CSS Module com CSS Module.
4. Se mexer em API, procure todas as chamadas com:

```bash
rg "vel-tnpo|fetch\\(" src
```

5. Se mexer em login/autenticacao, revise todos os usos de:

```bash
rg "localStorage" src
```

6. Depois de alterar, rode:

```bash
npm run build
```

7. Rode `npm run lint` se a tarefa envolver limpeza de qualidade, mas lembre que o lint ja falha no estado atual.

## Estado atual resumido

O projeto e funcional como front-end e compila. Ele tem integracoes reais com uma API externa para login, entregadores, faturamento, pedidos e edicao/cadastro de entregadores. Ao mesmo tempo, ainda ha partes mockadas, HTML legado, pagamento incompleto, falta de protecao de rotas e bastante debito tecnico em lint e formularios.
