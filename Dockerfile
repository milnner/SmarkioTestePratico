FROM node:alpine

WORKDIR /usr/app

COPY node/package*.json ./
RUN npm install

COPY node/* ./

EXPOSE 3306
EXPOSE 3000

CMD ["npm", "start"]

FROM mysql

WORKDIR /home/sql

COPY sql/* ./

EXPOSE 3306
RUN ["mysql", "-u", "root", "--password=pass", "comentarios", "-e", "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass' flush privileges;"]




