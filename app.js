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
	res.send(req.query.temp+' '+ req.query.title+ ' --- Hola mundo');
	
});

app.get('/getchart',function(req, res) {
	console.log(req.query);
	//console.log(movieData);
	res.send(req.query.temp+' '+ req.query.title+ ' --- Hola mundo');
	
});

app.get('/getcategories', function(req, res) {
	console.log(req.body);
	res.send(categorias);
});



//rutas
app.route('/d3.js').get((req, res) => {
	res.sendFile(path.join(__dirname+'/vista/d3/d3.js'));
});

app.route('/grafico.js').get((req, res) => {
	res.sendFile(path.join(__dirname+'/vista/grafico.js'));
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
