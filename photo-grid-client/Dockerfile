FROM node:alpine

WORKDIR /app

COPY ./photo-grid-client/package.json .

RUN npm install

COPY ./photo-grid-client/ .

EXPOSE 3000

CMD ["npm", "start"]