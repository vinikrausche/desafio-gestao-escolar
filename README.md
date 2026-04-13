# Gestao Escolar Mobile

Aplicativo mobile multiplataforma em React Native com Expo para centralizar o cadastro das escolas publicas municipais e de suas turmas. O repositorio ja contem a base tecnica do projeto e a primeira entrega funcional do modulo de escolas, com CRUD de escolas e turmas associadas usando API mockada localmente.

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
- mock API local com MirageJS em memoria
- cliente HTTP base e constante de `API_BASE_URL`
- Jest + Testing Library React Native configurados
- ESLint + Prettier configurados
- pipeline de CI com GitHub Actions
- modulo de escolas com listagem, cadastro, edicao e exclusao
- suporte a turmas associadas dentro de cada escola
- seeds iniciais para escolas e turmas

## Funcionalidades implementadas

### Modulo de Escolas

- listar escolas com nome, endereco e quantidade de turmas
- cadastrar escola com nome e endereco obrigatorios
- editar escola existente
- excluir escola com confirmacao
- adicionar e remover turmas no formulario da escola
- persistencia simulada via MirageJS com banco em memoria

## Arquitetura aplicada

- `app/` concentra apenas rotas e composicao das telas
- `src/features/schools` concentra tipos, componentes, hooks, servicos e store do dominio
- `src/server/mirage` concentra DTOs, modelos, rotas e seeds do back-end simulado
- `src/components` concentra componentes reutilizaveis de layout, formularios, feedback e acoes
- `src/lib/api` centraliza o cliente HTTP e tratamento de erro

Essa organizacao foi mantida para favorecer evolucao incremental com aderencia a Clean Code, S.O.L.I.D. e separacao clara de responsabilidades.

## O que ainda nao foi implementado

- autenticacao e perfis de acesso
- sincronizacao com back-end real
- modulo dedicado de turmas com fluxo proprio de CRUD
- dashboard e indicadores consolidados
- testes de interface para os componentes visuais

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

O repositorio inclui testes unitarios para:

```bash
npm run test
```

- bootstrap do app com Zustand
- mapeamento e validacao do formulario de escolas
- store de escolas
- modelo de dominio do MirageJS

## Mock de back-end

Nenhum processo separado precisa ser iniciado.

- em ambiente de desenvolvimento, o MirageJS sobe automaticamente no bootstrap do app
- a base da API mockada usa `https://mock.api.local`
- as rotas disponiveis atualmente ficam sob `/api/v1/schools`
- os dados sao mantidos em memoria e reiniciados ao recriar o processo

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

## Fluxos atuais

- `/schools`: lista de escolas
- `/schools/new`: cadastro de escola
- `/schools/[schoolId]/edit`: edicao de escola
