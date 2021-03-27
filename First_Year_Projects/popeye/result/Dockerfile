FROM node:12-alpine

EXPOSE 80

RUN npm install

WORKDIR /app

COPY . /app

CMD ["node", "server.js"]
