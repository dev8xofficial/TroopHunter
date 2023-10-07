FROM node:20.6.1 as development

WORKDIR /app

COPY ./ci .

RUN npm install

CMD ["node", "index.js"]