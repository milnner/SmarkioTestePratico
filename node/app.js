const express = require('express');

const { Sequelize, DataTypes, Model } = require('sequelize');

//MODEL
const sequelize = new Sequelize('comentarios', 'root', 'pass', {
	host: 'smarkiotestepratico_db_1',
	dialect: 'mysql'
})

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


app.use(express.urlencoded({ extended: false}))
app.use(express.json());

//rota 
app.get('/add', (req, res)=>{
	console.log(req.body);
	res.json(req.body);

	let cmt = Cmts.create({
		num: 0, 
		comentario:"sadfs"
	});
});

app.listen(PORT, HOST);