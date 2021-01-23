# Clean Architecture Clone

Simple app with clean achitecture metodolgy & solid principle.
using nodejs for server, typescript for OOP implementation, and docker for container

## Indication

1. Framework Independent
   - We are trying to implement a server using rest and graphql by using an isolated business process
     see [detail rest](https://github.com/sankester/clean-architecture-clone/blob/master/docs/Rest.md) and [detail graphql]()
2. Testable
   - perform a test on each layer using jest
3. UI Independent
4. Database Independent
5. External agency independence

## Scripts

> This application by default uses Docker and Docker Compose, so make sure Docker and Docker Compose are installed on your system

| Script       | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| start        | start server in prod mode execute file after builder, make sure build first |
| dev          | start server with development mode                                          |
| build        | build script from `typescript`                                              |
| watch        | build script from `typescript` and start server with `dev` mode             |
| tests        | run all tests with `jest`                                                   |
| tests:co     | run all tests and generate `coverage`                                       |
| dev:up       | start `docker` for development                                              |
| dev:down     | stop `docker` for development                                               |
| prod:up      | start `docker` for production                                               |
| prod:down    | stop `docker` for production                                                |
| localdb:up   | start `docker` for database without docker-compose                          |
| localdb:down | stop `docker` for database without docker-compose                           |

## Command

look in [`command.md`](https://github.com/sankester/clean-architecture-clone/blob/master/commad.md) for used command

## Layering

Encapsulate `entity`, `application`, and `adapter` layer in folder `core`, and `framework & driver` layer in folder `backend`

### Entity

- `Book`

### Application Use Cases

- `Get All Book`
- `Get Book By ID`
- `Add Book`
- `Update Book`
- `Delete Book`
- `Add Account`
- `Get Account By Email`
- `Check Account By Email`

### Adapter

**Controller**

- `GetAllBookConttroller`
- `GetBookByIdController`
- `AddBookController`
- `UpdateBookController`
- `DeleteBookController`
- `SignupController`
- `LoginController`

**Presentation**

- `GetAllBookPresenter`
- `GetBookByIdPresenter`
- `AddBookPresenter`
- `UpdateBookPresenter`
- `DeleteBookPresenter`
- `SignUpPresentation`
- `LoginPresentation`

**Validation**

- validation with `composite pattern`
- validation with `class-validator` & `class-transformer`

### Framework And Driver

**Framework**

- `Rest` - [detail doc](https://github.com/sankester/clean-architecture-clone/blob/master/docs/Rest.md)
  - using `express` and `swagger` (for api docs)
- `Graphql`
  - using `apollo server` and `graphql-modules`

**Database**

- `Mongodb`
- `Redis`

## Design Pattern

- **Singleton**

  ex: in connection database and event dispatcher

- **Factory**

  ex: in make controller in framework etc.

- **Abstract Factory**

- **Builder**

  ex: in HttpBodyBuilder class

- **Adapter**

  ex: router, controller etc

- **Composite**

  ex: in validation etc

- **Template Method**

  ex: in presentasion

- **Proxy**

  ex: in validation controller, authentication, auth middleware

- **Mediator**

  ex: in logging

- **Observer**

  ex: in logging

- **Dependency Injection**

  ex: in many comunicated class

- **Reponsitory Pattern**

  ex: all transaction with database

## Packages

### Default & Production

- bcrypt - _for hashing_
- jsonwebtoken - _for encrypting_
- body-parser - _parsing http body_
- cors - _handle cors request_
- dotenv-extended - _for configuration_
- dotenv-parse-variables - _for parsing configuration variable_
- express - _router framework_
- module-alias - _aliases module for simple access_
- mongoose - _mongodb object modeling_
- morgan - _log request_
- morgan-body - _log request body_
- winston - _custom system logger_
- swagger-ui-express - _api documentation_
- class-validator & class-transformer - _validate input request_
- apollo-server-express - _graphql server_
- gprahpql-modules - _toolling manage graphql_

### For Deveploper

- typescript
- tsc-watch - _run watch in detach mode_
- nodemon
- mongodb-memory-server - _use mongodb in memory_
- tsconfig-paths - _module aliases for typescript_
- eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin - _linter_
- prettier, eslint-config-prettier, eslint-plugin-prettier - _formatter_
- husky - _git hook_

### For Test

- mongodb-memory-server - _mongodb run in memory_
- jest - _unit testing_
- ts-jest - _jest for typescript_
- faker - _mockup helper_
- bson-objectid - _mock objectid_
- supertest - _request to server_

### Types package

- @types/bcrypt
- @types/jsonwebtoken
- @types/cors
- @types/dotenv-parse-variables
- @types/express
- @types/morgan
- @types/node
- @types/faker
- @types/validator
- @types/supertest
- @types/swagger-ui-express

## Reference

[Node Clean Architecture -Deep Dive](https://roystack.home.blog/2019/10/22/node-clean-architecture-deep-dive)

[clean-ts-api](https://github.com/rmanguinho/clean-ts-api)

[Backend API Server Development with Node.js from Scratch to Production](https://losikov.medium.com/backend-api-server-development-with-node-js-from-scratch-to-production-fe3d3b860003)
