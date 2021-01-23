# Implement With Resh Architecture

## Framework
- express

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
    expiredAt: datestring
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
    expiredAt: datestring
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

- Get Book By ID

  **GET** - `http://localhost:3000/api/book/:bookId`

  Accept: `application/json`

  Content-Type: `application/json`

  Response

  ```js
  {
    data: [
      {
        id: string,
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