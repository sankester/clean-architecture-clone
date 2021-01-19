FROM node:14.15.1-alpine

RUN apk add --no-cache g++ make python

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .
RUN NODE_OPTIONS=--max-old-space-size=8192 yarn build

ENV NODE_ENV=production

EXPOSE 3000

ENV ENV_FILE=config/.env.prod

CMD ["yarn","start"]