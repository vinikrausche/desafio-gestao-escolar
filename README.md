# Gestao Escolar Mobile

Aplicativo multiplataforma em React Native com Expo para centralizar o cadastro de escolas publicas e turmas da rede municipal.

O projeto foi estruturado por dominio, com foco em Clean Code, S.O.L.I.D., componentes reutilizaveis e separacao clara entre UI, estado, servicos e back-end mockado.

## Requisitos atendidos

- Expo SDK `~55.0.6`
- React `19.2.0`
- React Native `0.83.2`
- TypeScript `~5.9.2`
- Navegacao com `expo-router`
- UI com `@gluestack-ui/themed`
- Estado com `zustand`
- Back-end simulado com `miragejs`
- Persistencia offline opcional com `@react-native-async-storage/async-storage`
- Testes com `jest` e `@testing-library/react-native`

## Funcionalidades implementadas

### Modulo de Escolas

- listagem de escolas com nome, endereco e quantidade de turmas
- cadastro de escola com validacao de nome e endereco obrigatorios
- edicao e exclusao de escolas
- feedback visual para carregamento, erro, lista vazia e confirmacao de exclusao
- busca textual e filtro por status de turmas

### Modulo de Turmas

- listagem de turmas vinculadas a uma escola
- cadastro de turma com nome, turno e ano letivo
- edicao e exclusao de turmas
- busca textual e filtro por turno

### Diferenciais implementados

- componentizacao da UI para formularios, filtros, botoes, dialogos e cards
- hooks customizados para formularios e carregamento de recurso
- armazenamento offline opcional do banco mockado com AsyncStorage
- testes unitarios de modelos, store, componentes e rotas do Mirage

## Arquitetura

- `app/`: rotas e composicao das telas com Expo Router
- `src/features/`: organizacao por dominio (`schools` e `classrooms`)
- `src/components/`: componentes reutilizaveis de layout, formularios, filtros e feedback
- `src/lib/`: infraestrutura compartilhada, cliente HTTP, storage e utilitarios
- `src/server/mirage/`: DTOs, modelos, rotas e seeds do back-end simulado

Alguns padroes aplicados:

- `Repository`: persistencia JSON tipada para AsyncStorage em `src/lib/storage/json-storage.repository.ts`
- `Adapter`: encapsulamento do AsyncStorage em `src/lib/storage/async-storage.client.ts`
- separacao entre regras puras de formulario/filtro, camada de servico HTTP e store global

## Instalacao

```bash
npm install
```

Node recomendado:

```bash
nvm use 20.19.4
```

O `package.json` exige `node >= 20.19.4`, e a CI usa a mesma versao.

## Execucao

Suba o app em modo desenvolvimento:

```bash
npx expo start
```

Ou use os atalhos:

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Mock de back-end

Nenhum processo separado precisa ser iniciado.

- o MirageJS sobe automaticamente no bootstrap da aplicacao em ambiente de desenvolvimento
- a base da API mockada eh `https://mock.api.local`
- os dados do mock sao persistidos localmente com AsyncStorage quando disponivel
- se o storage falhar, o app continua funcionando com banco em memoria

### Endpoints simulados

#### Escolas

- `GET /schools`
- `POST /schools`
- `PUT /schools/:schoolId`
- `DELETE /schools/:schoolId`

#### Turmas por escola

- `GET /schools/:schoolId/classrooms`
- `POST /schools/:schoolId/classrooms`
- `PUT /schools/:schoolId/classrooms/:classroomId`
- `DELETE /schools/:schoolId/classrooms/:classroomId`

#### Recurso literal de turmas

- `GET /classes`
- `GET /classes?schoolId=:schoolId`
- `GET /classes/:classroomId`
- `POST /classes`
- `PUT /classes/:classroomId`
- `DELETE /classes/:classroomId`

O aplicativo consome as rotas aninhadas por escola, e o endpoint literal `/classes` foi mantido no mock para atender integracoes e validacoes que esperam esse recurso explicitamente.

## Rotas da aplicacao

- `/schools`
- `/schools/new`
- `/schools/[schoolId]/edit`
- `/schools/[schoolId]/classrooms`
- `/schools/[schoolId]/classrooms/new`
- `/schools/[schoolId]/classrooms/[classroomId]/edit`

## Qualidade de codigo

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test:ci
npm run build:web
```

## Testes

Execucao local:

```bash
npm run test
```

Cobertura atual:

- bootstrap global da aplicacao
- modelos puros de formulario e filtro
- store de escolas com Zustand
- componentes reutilizaveis com Testing Library React Native
- persistencia e modelos do Mirage
- rotas do Mirage, incluindo o endpoint literal `/classes`

## CI

Workflow em `.github/workflows/ci.yaml` com:

- `npm ci`
- `npm run lint`
- `npm run format:check`
- `npm run typecheck`
- `npm run test:ci`
- `npm run build:web`

## Estrutura principal

```text
app/
  _layout.tsx
  index.tsx
  schools/
    index.tsx
    new.tsx
    [schoolId]/
      edit.tsx
      classrooms/
        index.tsx
        new.tsx
        [classroomId]/
          edit.tsx

src/
  components/
  features/
    classrooms/
    schools/
  lib/
    api/
    platform/
    storage/
  providers/
  server/
    mirage/
  store/
  test-utils/
  theme/
```

## Observacoes

- o mock eh iniciado automaticamente apenas em desenvolvimento
- o build web gerado na CI valida compilacao e bundling; para testar o app com o mock ativo, use `expo start` em modo desenvolvimento
