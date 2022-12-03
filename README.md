# 🚀 Sobre este projeto

Essa é uma aplicação para gerenciar projetos. É permitida a criação de usuários, bem como fazer o CRUD de projects para cada usuário.

# 🧠 Contexto

O desafio foi dividido em duas partes, backend e frontend.

### O BACKEND
Foi necessário criar uma API com as seguintes funcionalidades:

#### CRUD de projetos
- [X] Criar um novo projeto
- [X] Listar todos os projetos
- [X] Recuperar um projeto pelo seu `id`
- [X] Alterar informações de um projeto existente (`title`, `deadline`, `cost` e `zip_code`)
- [X] Marcar um projeto como concluído
- [X] Excluir um projeto
- [X] Permitir acesso às funcionalidades do _CRUD de projetos_ apenas aos usuários logados

#### Registro e login de usuários
- [X] Criar um novo usuário
- [X] Login de usuário existente

### O FRONTEND
Foi necessário criar uma tela para criar/logar usuários e outra para ser feita a gestão dos projetos.

## 💡 O que foi entregue

Para o frontend, utilizei [React](https://pt-br.reactjs.org/) ([veja as principais tecnologias utilizadas neste projeto mais abaixo](#-tecnologias-e-ferramentas)), e dividi o fluxo em 4 páginas:

1. Login
2. Cadastro
3. Listagem de todos os projetos
  - A funcionalidade de inserir um novo projeto está nesta tela
4. Detalhes de um projeto
  - As funcionalidades de editar, excluir e marcar como concluído estão nesta tela

Para o backend, desenvolvi a API utilizando [Node.js](https://nodejs.org/pt-br/) e o framework [Express](https://expressjs.com/), conectando a um banco de dados [PostgreSQL](https://www.postgresql.org/), utilizando o [Prisma](https://www.prisma.io/) como ORM ([veja as principais tecnologias utilizadas neste projeto mais abaixo](#-tecnologias-e-ferramentas)), implementando todas as funcionalidades requeridas ([veja a documentação completa da API aqui](docs/api.md)):

> ### POST /users
>
>> Cria um novo usuário

---

> ### POST /users/login
>
>> Autentica um usuário existente

---

> ### POST /project
>
>> Cria um novo projeto

---

> ### GET /project/:id
>
>> Busca um projeto pelo _id_

---

> ### GET /projects
>
>> Busca todos os projetos

---

> ### PATCH /projects/:id/done
>
>> Marca um projeto como concluído

---

> ### PUT /projects/:id
>
>> Altera as informações de um projeto

---

> ### DELETE /projects/:id
>
>> Exclui um projeto

## 🧰 Tecnologias e ferramentas

Para este projeto foram utilizados:

- [Typescript](https://www.typescriptlang.org/)
- [ts-standard](https://github.com/standard/ts-standard) para formatação, padronização e lint do código
- [zod](https://zod.dev/), para validação
- Frontend:
  - [React](https://pt-br.reactjs.org/)
  - [React Hook Form](https://react-hook-form.com/)
  - [React Hot Toast](https://react-hot-toast.com/)
  - [raviger](https://kyeotic.github.io/raviger/), para roteamento
  - [SWR](https://swr.vercel.app/pt-BR)
- Backend:
  - [Express](https://expressjs.com/)
  - [PostgreSQL](https://www.postgresql.org/), via [Docker](https://hub.docker.com/_/postgres)
  - [Prisma](https://www.prisma.io/) como ORM
  - [Axios](https://axios-http.com/)
  - [Vitest](https://vitest.dev/)
  - [Supertest](https://vitest.dev/)

# 📋 Instruções

Clone o projeto:

```bash
git@github.com:israelss/projects-manager.git
```

Após clonar o projeto, entre no diretório e instale as dependências:

```bash
cd projects-manager
npm install
```

Preencha os arquivos `.env` com as variáveis necessárias:

```sh
#/.env
POSTGRES_PASSWORD=ExamplePassword
```

```sh
#/api/.env
PORT=3001
DATABASE_URL="postgresql://postgres:ExamplePassword@db:5432/dbname?schema=public"
```
⚠️ _Algumas observações sobre a variável `DATABASE_URL`:_

_0: Essa variável é necessária por causa do Prisma. Para detalhes de como configurar a conexão com o PostgreSQL via Prisma, [acesse a documentação neste link](https://www.prisma.io/docs/concepts/database-connectors/postgresql)._

_1: `postgres` é o nome de usuário padrão da imagem docker do PostgreSQL utilizada neste projeto. Se for utilizar outa imagem, ou outra instância do PostgreSQL, altere de acordo._

_2: `ExamplePassword` é a mesma senha definida na variável `POSTGRES_PASSWORD` no arquivo `.env` da raiz do projeto._

_3: `db` é o nome do serviço definido nos arquivos `docker-compose.yml` e `docker-compose.dev.yml`. Caso não queira utilizar o PostgreSQL definido nestes arquivos, troque `db` pelo endereço do HOST correspondente (EX: `localhost`)_

_4: `5432` é a porta padrão exposta pela imagem docker do PostgreSQL utilizada neste projeto. Se for utilizar outa imagem, ou outra instância do PostgreSQL, altere de acordo, tomando cuidado para não escolher uma porta que já esteja em uso._

# ⚙️ Rodando o projeto

⚠️ _Este projeto está preparado para utilizar o [Docker Compose](https://docs.docker.com/compose/install/), e é recomendado utilizá-lo, portanto é necessário ter instalada essa ferramenta na sua máquina._

## Modo de Desenvolvimento

A partir da raiz do projeto, execute:

```bash
npm run compose:up:dev
```

O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

O backend estará disponível em [http://localhost:3001](http://localhost:3001).

O banco de dados estará disponível em [http://localhost:3002](http://localhost:3002).

## Modo de Produção

A partir da raiz do projeto, execute:

```bash
npm run compose:up
```

O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

O backend estará disponível em [http://localhost:3001](http://localhost:3001).

O banco de dados estará disponível em [http://localhost:3002](http://localhost:3002).

# 🧪 Testando o projeto
⚠️ _No momento, apenas o backend possui testes. Testes para o frontend estão na lista de [próximos passos](#%EF%B8%8F-pr%C3%B3ximos-passos), assim como testes de integração._

## 1️⃣ Testes unitários

A partir da raiz do projeto, execute os comandos:

```bash
cd api
npm run test
```

### 📊 Cobertura

Para ver a cobertura de código execute o comando:

```bash
npm run coverage
```

# ⏭️ Próximos passos

Com mais tempo eu teria implementado as seguintes funcionalidades, e é o que pretendo fazer em breve:

- [ ] Mais testes unitários
  - [ ] Backend
  - [ ] Frontend
- [ ] Testes de integração
  - [ ] Backend
  - [ ] Frontend
- [ ] Filtragem de projetos:
  - [ ] Nome
  - [ ] Prazo (Data máxima | Data exata)
  - [ ] Custo (Mínimo | Máximo | Exato)
  - [ ] Status de conclusão (Concluído | Não concluído)
  - [ ] Localização
- [ ] Ordenação de projetos:
  - [ ] Nome (A-Z | Z-A)
  - [ ] Prazo (Próximo | Distante)
  - [ ] Custo (Maior | Menor)
- [ ] Melhorar a UX/UI
