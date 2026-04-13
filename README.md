# Gestao Escolar Mobile

Aplicativo mobile multiplataforma em React Native com Expo para centralizar o cadastro das escolas publicas municipais e de suas turmas. Neste momento o repositorio contem apenas o setup tecnico do projeto, sem telas de negocio, hooks de dominio ou fluxos funcionais implementados.

## Objetivo do projeto

A prefeitura de uma cidade do interior precisa substituir o controle manual em planilhas Excel por um aplicativo mobile que concentre:

- cadastro de escolas publicas
- cadastro de turmas vinculadas a cada escola
- base unica de dados para Android e iOS

## Stack e versoes

- Node recomendado para desenvolvimento, build e CI: `>= 20.19.4`
- arquivo `.nvmrc` incluido com `20.19.4`
- campo `engines.node` configurado no `package.json`
- Expo: `~55.0.6`
- React: `19.2.0`
- React Native: `0.83.2`
- TypeScript: `~5.9.2`
- Expo Router: `~55.0.5`
- Gluestack UI: `@gluestack-ui/themed ^1.1.73`
- Zustand: `^5.0.12`
- MirageJS: `^0.1.48`

Essa base atende ao requisito de Expo SDK 54 ou superior com React 19 e React Native 0.81 ou superior.

## O que ja esta pronto

- scaffold do app com Expo Router
- TypeScript em modo `strict`
- provider global com Gluestack UI, Safe Area e Gesture Handler
- store base com Zustand para bootstrap do app
- mock API local com MirageJS preparada para expansao
- cliente HTTP base e constante de `API_BASE_URL`
- Jest + Testing Library React Native configurados
- ESLint + Prettier configurados
- pipeline de CI com GitHub Actions
- estrutura inicial de pastas para `schools` e `classrooms`

## O que ainda nao foi implementado

- telas de dashboard, listagem, cadastro ou edicao
- hooks de dominio
- stores de escolas e turmas
- rotas e seeds reais do MirageJS
- servicos de negocio

## Instalacao

```bash
npm install
```

## Execucao

```bash
nvm use
npm run start
```

Atalhos por plataforma:

```bash
npm run android
npm run ios
npm run web
```

## Qualidade de codigo

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test:ci
npm run build:web
```

## Testes

O repositorio ja inclui a base de testes e um teste inicial para o store de bootstrap.

```bash
npm run test
```

## Mock de back-end

Nenhum processo separado precisa ser iniciado.

- em ambiente de desenvolvimento, o MirageJS sobe automaticamente no bootstrap do app
- a base da API mockada usa `https://mock.api.local`
- as rotas ainda nao foram implementadas, apenas a estrutura do mock server

## Estrutura principal

```text
app/
  _layout.tsx
  index.tsx
  schools/
  classrooms/

src/
  components/
    actions/
    feedback/
    forms/
    icons/
    layout/
    ui/
  features/
    schools/
    classrooms/
  lib/
    api/
    platform/
    router/
    utils/
  providers/
  server/
    mirage/
      dto/
      models/
      routes/
      seeds/
      utils/
  store/
  test-utils/
  theme/
  types/
```

## CI

O projeto possui uma workflow em `.github/workflows/ci.yaml`.

Validacoes executadas na pipeline:

- `npm ci`
- `npm run lint`
- `npm run format:check`
- `npm run typecheck`
- `npm run test:ci`
- `npm run build:web`
