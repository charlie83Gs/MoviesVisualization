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


//cache relate libraries
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const url = require('url'); 

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
	var key = req.query.key.toString();
	//console.log(movieData);
	//res.send(req.query.temp+' '+ req.query.title+ ' --- Hola mundo');
	//var data = getDummyQuery();
	var data = myCache.get(key);
	console.log("Visualization requet received: " + key);
	if ( data == undefined ){
	 	 console.log("request unsuccessfull: " + key);
	 	 res.send("");
	}else{
		console.log("request successfull: " + key);
		let stringData = JSON.stringify(data);

		let ciphertext = CryptoJS.AES.encrypt(stringData, encriptionPasword);
		stringData = ciphertext.toString();


		//console.log(stringData);
		//let decripted = CryptoJS.AES.decrypt(stringData, encriptionPasword);
		//decripted = decripted.toString(CryptoJS.enc.Utf8);
		//console.log(decripted);
		//JSON.parse(decripted);
		
		
		res.send(stringData);
	}
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
	
	
	
	res.sendFile(path.join(__dirname+'/vista/query.html'));
});

app.route('/visualization').get((req, res) => {
	
	
	
	res.sendFile(path.join(__dirname+'/vista/index.html'));
});

app.route('/visualization').post((req, res) => {
	
	//console.log(req.body);
	let cast = req.body.actores;
	let words =  req.body.titulos;
	let genres =  req.body.generos;
	
	let firstYear =  parseInt(req.body.limite1);
	let lastYear =  parseInt(req.body.limite2);
	if(firstYear > lastYear ){
		let swaping = lastYear;
		lastYear = firstYear;
		firstYear = swaping;
	}

	let password = req.body.password;

	//creandp un json como lo resive el sistema de busquedas
	let search_request = {"cast" : cast, "words" : words, "genres": genres,"firstYear" : firstYear, "lastYear" : lastYear};
	//console.log(search_request);

	var llaveConsulta = CryptoJS.SHA1(JSON.stringify(search_request) + password).toString();
	
	//res.body = req.body;

	//verifiar si ya se creo la consulta
	//si no existe crearla
	value = myCache.get( llaveConsulta );
	if ( value == undefined ){
  // handle miss!
	
	

	var data = getDummyQuery();
	success = myCache.set( llaveConsulta, data, 10000 );
	console.log("Stored with key: " + llaveConsulta);
	//si existe solo cargarla


	res.redirect(url.format({
       pathname:"/visualization",
       query: {
       		key : llaveConsulta
       }
     }));
	}else{
		res.redirect(url.format({
       pathname:"/visualization",
       query: {
       		key : llaveConsulta
       }
     }));
	}
});


app.route('/loadVisualization').post((req, res) => {
	console.log("Trying to load visualization: " + req.body.key)
	res.redirect(url.format({
       pathname:"/visualization",
       query: {
       		key : req.body.key
       }
     }));
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


function getDummyQuery(){
	var data = { years: [{ year: 1990,
					genres : [{name:"Comedy", amount : Math.floor(Math.random() * 480)}
							,{name:"Horror", amount : Math.floor(Math.random() * 480)}
							,{name:"Sci-Fi", amount : Math.floor(Math.random() * 480)}
							,{name:"Thriller", amount : Math.floor(Math.random() * 480)}]
				},
				{ year: 1991,
					genres : [{name:"Comedy", amount : Math.floor(Math.random() * 480)}
							,{name:"Horror", amount : Math.floor(Math.random() * 480)}
							,{name:"Sci-Fi", amount : Math.floor(Math.random() * 480)}
							,{name:"Thriller", amount : Math.floor(Math.random() * 480)}]
				},
				{ year: 1992,
					genres : [{name:"Comedy", amount : Math.floor(Math.random() * 480)}
							,{name:"Horror", amount : Math.floor(Math.random() * 480)}
							,{name:"Sci-Fi", amount : Math.floor(Math.random() * 480)}]
				},
				{ year: 1993,
					genres : [{name:"Comedy", amount : Math.floor(Math.random() * 480)}
							,{name:"Sci-Fi", amount : Math.floor(Math.random() * 480)}
							,{name:"Thriller", amount : Math.floor(Math.random() * 480)}]
				}],
		totalYears:4,
		maxValue:500,
		firstYear:1990
		};
		return data;
}	

