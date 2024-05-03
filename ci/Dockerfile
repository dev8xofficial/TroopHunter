FROM node:20.12.2 as development

WORKDIR /app

COPY ./ci .

RUN npm install

CMD ["node", "index.js"]