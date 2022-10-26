FROM node:18.11.0-alpine3.16

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json tsconfig.json src ./

RUN npm install

RUN npm run transpile
RUN npm run build

RUN rm -rf ./node_modules

