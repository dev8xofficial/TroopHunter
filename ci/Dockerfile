FROM node:20.19.5 as development

WORKDIR /app

COPY ./ci .

RUN npm install

CMD ["node", "index.js"]