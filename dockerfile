FROM node:lts-alpine

WORKDIR /receipt-processor

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]