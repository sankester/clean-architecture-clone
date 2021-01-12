# Clean architecture

Simple clean architecture with nodejs and typescript

## Layering

### Entitiy

- Book

### Application Use Cases

- `Get All Book`
- `Add Book`
- `Update Book`
- `Delete Book`
- `Add Account`
- `Get Account By Email`
- `Check Account By Email`

### Adapter

**Controller**

- `GetAllBookConttroller`
- `AddBookController`
- `UpdateBookController`
- `DeleteBookController`
- `SignupController`
- `LoginController`

**Presentation**

- `GetAllBookPresenter`
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

- `Express`

**Database**

- `Mongodb`

## API Swagger Docs

API docs in **`http:localhost:3000/api-docs`**

## API Contract

### Account

- Signup

  **POST** - `http://localhost:3000/api/signup`

  Accept: `application/json`

  Content-Type: `application/json`

  Request Body

  ```js
  {
      name: string,
      email: string,
      password: string
  }
  ```

  Response

  ```js
  {
    accessToken: string,
    name: string
  }
  ```

- Login

  **POST** - `http://localhost:3000/api/login`

  Accept: `application/json`

  Content-Type: `application/json`

  Request Body

  ```js
  {
      email: string,
      password: string
  }
  ```

  Response

  ```js
  {
    accessToken: string,
    name: string
  }

  ```

### Book

- Get All Book

  **GET** - `http://localhost:3000/api/book`

  Accept: `application/json`

  Content-Type: `application/json`

  Response

  ```js
  {
    data: [
      {
        title: string,
        author: string,
        issn: string,
      },
    ];
  }
  ```

- Create Book

  **POST** - `http://localhost:3000/api/book`

  Accept: `application/json`

  Content-Type: `application/json`

  Request Body

  ```js
  {
      title: string,
      author: string,
      issn: string
  }
  ```

- update Book

  **PUT** - `http://localhost:3000/api/book/{bookId}`

  Accept: `application/json`

  Content-Type: `application/json`

  Request Params

  - `bookId: string`

  Request Body

  ```js
  {
      title: string,
      author: string,
      issn: string
  }
  ```

- Delete Book

  **DELETE** - `http://localhost:3000/api/book/{bookId}`

  Accept: `application/json`

  Content-Type: `application/json`

  Request Params

  - `bookId: string`

## Design Pattern

- Singleton

  ex: in connection database

- Factory

  ex: in make controller in framework etc.

- Abstract Factory

- Builder
  ex: in HttpBodyBuilder class

- Adapter
  ex: router, controller etc

- Composite
  ex: in validation etc

- Template Method
  ex: in presentasion
  
- Dependency Injection

## Packages

### Default

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

### For Deveploper

- typescript
- nodemon
- mongodb-memory-server - _use mongodb in memory_
- tsconfig-paths - _module aliases for typescript_
- eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin - _linter_
- prettier, eslint-config-prettier, eslint-plugin-prettier - _formatter_

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
