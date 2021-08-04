FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


FROM mysql

WORKDIR /home/sql

COPY sql/* ./

EXPOSE 3306

RUN /home/sql/init.sh
