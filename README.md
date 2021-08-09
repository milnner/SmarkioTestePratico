# SmarkioTestePratico
- Atenção os arquivos estão em UTF-8
- Necessário que o node e o npm estejam instalados.
- node v10.19.0
- npm  6.14.4
- Necessário o docker e docker-compose instalados.

Siga os passos para subir a aplicação

### Colocando a chave da API
~~~javascript
const { Sequelize, DataTypes, Model } = require('sequelize');
const express = require('express');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');

//TEXT_TO_SPEECH
const API_KEY = '{api-key}'

const tts = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: 'ScFTZMJHpbSAixBe_ibb-msWVytvwoh66NAsKZQE5X7u',
    }),
    serviceUrl: API_KEY,
});

//Resto do código
~~~
Substitua '{api-key}' por uma string com sua chave de acesso do Watson Text To Speech
### Dentro da pasta _SmarkioTestePratico/mysql_
Isso fara subir um conteiner do mysql que utilizará a porta 3306 do seu localhost.
~~~sh
$ docker compose up 
~~~
O terminal ficará sendo utilizado, espere que seja criado o banco de dados e então realize o passo abaixo.  


### Dentro da pasta _SmarkioTestePratico/node_
Em outro terminal  após o banco de dados comentario iniciar faça.
Aqui o node iniciará um serviço web na porta 3000 do seu localhost. 
~~~sh
$ npm install
$ npm start
~~~
