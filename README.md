# SmarkioTestePratico
Atenção os arquivos estão em UTF-8
Necessário que o node e o npm estejam instalados.
node v10.19.0
npm  6.14.4
Necessário o docker e docker-compose instalados.

siga os passos para subir a aplicação

### Dentro da pasta SmarkioTestePratico/mysql
Isso fara subir um conteiner do mysql que utilizará a porta 3306 do seu localhost.

$ docker compose up

O terminal ficará sendo utilizado, espere que seja criado o banco de dados e então realize o passo abaixo.  


### Dentro da pasta SmarkioTestePratico/node
Em outro terminal  após o banco de dados comentario iniciar faça.
Aqui o node iniciará um serviço web na porta 3000 do seu localhost.
$ npm start

