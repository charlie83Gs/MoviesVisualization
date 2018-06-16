var encriptionPasword = 'Bryan-Charlie'



var CryptoJS = require("crypto-js");

// para soportar cross domain
var cors = require('cors')
// servidor web
var express = require('express');
// para recibir y parsear content en formato json
var bodyParser = require('body-parser');

// constante para definir el puerto a ser usado
var PORT_NUMBER = 3500;

// se inicia el servidor web express
var app = express()

//server path
var path = require('path');



// iniciar el parsing de json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// para habilitar cross domain
app.use(cors())

//se carga el json antes de iniciar la aplicacion
var fs = require('fs');
var movieData = JSON.parse(fs.readFileSync('data/movies.json', 'utf8'));
var categorias = JSON.parse(fs.readFileSync('data/categories.json', 'utf8'));
// publicar contenido estatico que esta en ese folder
//app.use(express.static("C:\\Users\\rodri\\OneDrive\\Personales\\Itcr\\SemI2018\\Analisis de Algoritmos\\node"));




//funciones para json
app.get('/getchart',function(req, res) {
	console.log(req.query);
	//console.log(movieData);
	//res.send(req.query.temp+' '+ req.query.title+ ' --- Hola mundo');
	var data = { years: [{ year: 1990,
					genres : [{name:"Comedy", amount : 130}
							,{name:"Horror", amount : 80}
							,{name:"Sci-Fi", amount : 60}
							,{name:"Thriller", amount : 115}]
				},
				{ year: 1991,
					genres : [{name:"Comedy", amount : 50}
							,{name:"Horror", amount : 20}
							,{name:"Sci-Fi", amount : 80}
							,{name:"Thriller", amount : 12}]
				},
				{ year: 1992,
					genres : [{name:"Comedy", amount : 310}
							,{name:"Horror", amount : 115}
							,{name:"Sci-Fi", amount : 30}]
				},
				{ year: 1993,
					genres : [{name:"Comedy", amount : 16}
							,{name:"Sci-Fi", amount : 89}
							,{name:"Thriller", amount : 64}]
				}],
		totalYears:4,
		maxValue:310,
		firstYear:1990
		};
	let stringData = JSON.stringify(data);

	let ciphertext = CryptoJS.AES.encrypt(stringData, encriptionPasword);
	stringData = ciphertext.toString();
	console.log(stringData);
	let decripted = CryptoJS.AES.decrypt(stringData, encriptionPasword);
	decripted = decripted.toString(CryptoJS.enc.Utf8);
	console.log(decripted);
	JSON.parse(decripted);

	
	res.send(stringData);
		
});


app.get('/getcategories', function(req, res) {
	console.log(req.query);
	//console.log(categorias);
	res.send(categorias);
});



//rutas
app.route('/d3.js').get((req, res) => {
	res.sendFile(path.join(__dirname+'/vista/d3/d3.js'));
});

app.route('/grafico.js').get((req, res) => {
	res.sendFile(path.join(__dirname+'/vista/grafico.js'));
});

app.route('/p5.js').get((req, res) => {
	res.sendFile(path.join(__dirname+'/vista/p5.js'));
});
app.route('/p5.dom.js').get((req, res) => {
	res.sendFile(path.join(__dirname+'/vista/p5/addons/p5.dom.js'));
});
app.route('/processing.js').get((req, res) => {
	res.sendFile(path.join(__dirname+'/vista/processing.js'));
});

app.route('/').get((req, res) => {
	
	
	
	res.sendFile(path.join(__dirname+'/vista/index.html'));
});


app.route('/home').get((req,res) =>{
		res.send({
		cats: [{ name: 'lilly' }, { name: 'lucy' }]
		});
	});

app.on('listening', function () {
    
});




// escuchar comunicacion sobre el puerto indicado en HTTP
app.listen(PORT_NUMBER);

console.log("Listening on port "+PORT_NUMBER)


