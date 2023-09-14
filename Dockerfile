FROM node:lts-alpine

EXPOSE 3000
WORKDIR /usr/src/app
COPY . .

RUN npm install

ENTRYPOINT [ "node", "src/index.js" ]