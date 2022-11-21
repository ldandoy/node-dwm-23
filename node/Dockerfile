FROM node:lts

WORKDIR /app

EXPOSE 4500

COPY ./app/package.json ./

RUN npm install

RUN npm install nodemon -g

CMD ["npm", "run", "dev"]