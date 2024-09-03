FROM node:18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN rm -rf node_modules

RUN npm install

COPY . /app

CMD npm run dev
