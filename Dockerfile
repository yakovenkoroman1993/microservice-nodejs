FROM node:8.9

WORKDIR /app

COPY . /app
RUN npm i

EXPOSE 3000

CMD npm start