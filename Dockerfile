FROM node:14.15.1-alpine

RUN apk add --no-cache g++ make python openssl

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

# Default env file
ENV ENV_FILE=config/.env.dev

CMD ["yarn","watch"]