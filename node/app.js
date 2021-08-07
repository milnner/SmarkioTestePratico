const express = require('express');

 
const { Sequelize, DataTypes, Model } = require('sequelize');

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
		}
	}, {
		sequelize,
		modelName: 'Cmts' 
	});


	Cmts.sync();
	console.log(Cmts === sequelize.models.Cmts);
	
} catch (error) {
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
		await Cmts.create({
			num: 0, 
			comentario: req.body.comment
		});
	}
	cmts =  await Cmts.findAll();
	console.log(cmts);
	res.send(cmts)

});


app.get('/comments', (req, res) => {
	
});

app.listen(PORT, HOST);