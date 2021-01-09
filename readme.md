# Clean architecture

Simple clean architecture with nodejs and typescript

## Packages

### Default

- bcrypt - _for encription_
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

### Khusus Deveploper

- typescript
- nodemon
- mongodb-memory-server - _use mongodb in memory_
- tsconfig-paths - _module aliases for typescript_
- eslint, @typescript-eslint/parser,  @typescript-eslint/eslint-plugin - _linter_
- prettier, eslint-config-prettier, eslint-plugin-prettier - _formatter_


**Types package**

- @types/bcrypt
- @types/cors
- @types/dotenv-parse-variables
- @types/express
- @types/morgan
- @types/node
- @types/validator
- @types/swagger-ui-express

### Khusus Test

- mongodb-memory-server
- jest
- ts-jest
- faker & @types/faker
- bson-objectid

## Reference

[Node Clean Architecture -Deep Dive](https://roystack.home.blog/2019/10/22/node-clean-architecture-deep-dive)

[clean-ts-api](https://github.com/rmanguinho/clean-ts-api)

[Backend API Server Development with Node.js from Scratch to Production](https://losikov.medium.com/backend-api-server-development-with-node-js-from-scratch-to-production-fe3d3b860003)
