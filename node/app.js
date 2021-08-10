const { Sequelize, DataTypes, Model } = require('sequelize');
const express = require('express');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const md5 = require('md5');
const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');

//TEXT_TO_SPEECH
const API_KEY = '{api-key}';

const tts = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      	apikey: API_KEY,
    }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com',
});

async function fazAudio(params){ //faz o arquivo de audio com nome de um hash md5 do texto usa como o nome do arquivo e retorna o hash 

	fileName = `${md5(params.text)}`;
 	tts.synthesize(params).then(response => {
		return tts.repairWavHeaderStream(response.result);
  	
	}).then(buffer => {
    
		fs.writeFileSync(`webpage/audio/${fileName}.wav`, buffer, () => {
		
		});	
	}).catch(err => {
    		console.log('error:', err);
  	});
		return fileName;
};

//MODEL

const sequelize = new Sequelize('comentarios', 'root', 'pass', {
	host: 'localhost',
	dialect: 'mysql'
});

class Cmts extends Model {}
try {
	sequelize.authenticate();
	console.log('Conectado');

	Cmts.init({
		num: { 
			  type: DataTypes.INTEGER,
			  primaryKey: true,
			  allowNull: false,
			  autoIncrement: true
		},
		comentario: {
			 type: DataTypes.STRING(6000),
			  allowNull:false 
		},
		audio:{
			type: DataTypes.STRING(255),
			allowNull: false
		},
	}, {
		sequelize,
		modelName: 'Cmts'
	});


	Cmts.sync();
	console.log(Cmts === sequelize.models.Cmts);

} 
catch (error) {
	console.error('O erro e', error);
}

//SERVIDOR 
const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static('webpage/'));


app.use(express.urlencoded({ extended: true}))
app.use(express.json());


//rota 
app.post('/add', async (req, res)=>{
	console.log(req.body);
	if('' !== req.body.comment)
	{
		let local = await fazAudio({
			text: req.body.comment,
			accept: 'audio/wav',
			voice: 'pt-BR_IsabelaV3Voice',
		});

		await Cmts.create({
			num: 0, 
			comentario: req.body.comment,
			audio: local
		});
	}
	cmts =  await Cmts.findAll();
	
	res.send(cmts)
});


app.listen(PORT, HOST);