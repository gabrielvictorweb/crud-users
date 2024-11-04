# CRUD para Usuários

Aplicação com usuário ADMIN, que faz o gerenciamento dos usuários através de um Dashboard.

## Dependências

- node:22.9.0
- npm:10.8.3

## Como executar

### Docker (Recomendado)

Em seu terminal de comando, execute:

```shell
$ cd pasta-de-downloads/crud-users
$ docker-compose up --build
$ docker-compose up
```

### Execução manual

#### IMPORTANTE: Existem arquivos de configuração de ambiente (env) em cada projeto, lembre-se de substituir os parametros de acordo com o endereço do seu banco de dados e outros endereços da aplicação.

#### Backend

Em seu terminal de comando, execute:

```shell
$ cd pasta-de-downloads/crud-users/api
$ npm i
$ npx prisma generate
$ npx prisma db push
$ npm run db-seed
$ npm run start:dev
```

#### Frontend

Em seu terminal de comando, execute:

```shell
$ cd pasta-de-downloads/crud-users/frontend
$ npm i
$ npm run dev
```

## Usuário Admin

Por padrão é executado um seed para criar um Usuário Admin, para que seja possível utilizar a aplicação, segue as credênciais:

email: admin@admin.com - senha: password

## API DOC

A documentação da API, é disponibilizada através do Swagger no seguinte endereço:

http://localhost:8000/api

## Testes

Os testes são executados automaticamente através da execução do Container, caso utilize o Docker. Mas é possivel verificar os testes e sua cobertura com o seguinte comando:

#### Docker:

```shell
$ docker container exec api npm run test:cov
```

#### Executando manualmente

```shell
$ npm run test:cov
```
