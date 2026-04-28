# QA Auth Checklist

Checklist manual rapido para validar autenticacao, sessao e autorizacao por papel no `VEL_Desktop`.

## Pre-requisitos

- API rodando e acessivel pela URL configurada em `VITE_API_URL` (ou `http://localhost:8084`).
- Frontend `VEL_Desktop` rodando localmente.
- Pelo menos 1 usuario proprietario e 1 usuario atendente validos para login.

## 1) Login proprietario (OWNER)

- [ ] Acessar `/login`
- [ ] Logar com credenciais de proprietario
- [ ] Confirmar redirecionamento para `/dashboard`
- [ ] Confirmar no `localStorage`:
  - `AuthToken` preenchido
  - `User` preenchido
  - `AuthRole = OWNER`

## 2) Login atendente (ATTENDANT)

- [ ] Fazer logout
- [ ] Logar com credenciais de atendente
- [ ] Confirmar redirecionamento para `/atendente`
- [ ] Confirmar no `localStorage`:
  - `AuthToken` preenchido
  - `User` preenchido
  - `AuthRole = ATTENDANT`

## 3) Bloqueio por papel (role guard)

### 3.1 Atendente tentando rota de proprietario

- [ ] Estando logado como atendente, abrir `/dashboard` direto na URL
- [ ] Esperado: redirecionar para `/atendente`

### 3.2 Proprietario tentando rota de atendente

- [ ] Estando logado como proprietario, abrir `/atendente` direto na URL
- [ ] Esperado: redirecionar para `/dashboard`

## 4) Sessao parcial (hardening)

- [ ] No DevTools, remover `AuthRole` e manter `AuthToken` + `User`
- [ ] Abrir `/login`
- [ ] Esperado: app limpar sessao parcial automaticamente e permanecer no login
- [ ] Confirmar que `AuthToken`, `User` e `AuthRole` foram removidos

## 5) Usuario autenticado abrindo login

- [ ] Com sessao completa valida, abrir `/login`
- [ ] Esperado:
  - Se `AuthRole = OWNER`, redirecionar para `/dashboard`
  - Se `AuthRole = ATTENDANT`, redirecionar para `/atendente`

## 6) Expiracao de sessao (401)

- [ ] Com sessao ativa, forcar uma chamada que retorne `401 Unauthorized`
- [ ] Esperado:
  - Logout automatico
  - Redirecionamento para `/login`
  - Exibicao de aviso de sessao expirada

## Resultado final

- [ ] Todos os cenarios aprovados sem erro visual ou loop de redirecionamento
- [ ] Fluxo de login/logout consistente para OWNER e ATTENDANT
