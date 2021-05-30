FROM node:alpine

WORKDIR /app

COPY ./photo-grid-api/package.json .

RUN npm install

COPY ./photo-grid-api/ .

EXPOSE 3001

CMD ["npm", "start"]