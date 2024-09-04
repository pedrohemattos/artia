FROM node:18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN rm -rf node_modules

COPY .env.example .env

RUN npm install

COPY . /app
