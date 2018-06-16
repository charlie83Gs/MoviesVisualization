//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#######################  Binary Tree ############################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################

// TreeNode class
class TreeNode
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree
{
    constructor()
    {
        // root of a binary seach tree
        this.root = null;
    }
 
    insert(data)
    {
        // Creating a node and initailising 
        // with data 
        var newTreeNode = new TreeNode(data);
                         
        // root is null then node will
        // be added to the tree and made root.
        if(this.root === null)
            this.root = newTreeNode;
        else
     
            // find the correct position in the 
            // tree and add the node
            this.insertTreeNode(this.root, newTreeNode);
    }
     
    insertTreeNode(node, newTreeNode)
    {
        // if the data is less than the node
        // data move left of the tree 
        if(newTreeNode.data < node.data)
        {
            // if left is null insert node here
            if(node.left === null)
                node.left = newTreeNode;
            else
     
                // if left is not null recurr until 
                // null is found
                this.insertTreeNode(node.left, newTreeNode); 
        }
     
        // if the data is more than the node
        // data move right of the tree 
        else
        {
            // if right is null insert node here
            if(node.right === null)
                node.right = newTreeNode;
            else
     
                // if right is not null recurr until 
                // null is found
                this.insertTreeNode(node.right,newTreeNode);
        }
    }

    remove(data)
    {
        // root is re-initialized with
        // root of a modified tree.
        this.root = this.removeTreeNode(this.root, data);
    }
     
    removeTreeNode(node, key)
    {
             
        // if the root is null then tree is 
        // empty
        if(node === null)
            return null;
     
        // if data to be delete is less than 
        // roots data then move to left subtree
        else if(key < node.data)
        {
            node.left = this.removeTreeNode(node.left, key);
            return node;
        }
     
        // if data to be delete is greater than 
        // roots data then move to right subtree
        else if(key > node.data)
        {
            node.right = this.removeTreeNode(node.right, key);
            return node;
        }
     
        // if data is similar to the root's data 
        // then delete this node
        else
        {
             // deleting node with no children
            if(node.left === null && node.right === null)
            {
                node = null;
                return node;
            }
     
            // deleting node with one children
            if(node.left === null)
            {
                node = node.right;
                return node;
            }
             
            else if(node.right === null)
            {
                node = node.left;
                return node;
            }
     
            // Deleting node with two children
            // minumum node of the rigt subtree
            // is stored in aux
            var aux = this.findMinTreeNode(node.right);
            node.data = aux.data;
     
            node.right = this.removeTreeNode(node.right, aux.data);
            return node;
        }
     
    }
                     
    findMinTreeNode(node)
    {
        // if left of a node is null
        // then it must be minimum node
        if(node.left === null)
            return node;
        else
            return this.findMinTreeNode(node.left);
    }

    getRootTreeNode()
    {
        return this.root;
    }

    search(node, data)
    {
       // if trees is empty return null
        if(node === null)
            return null;
     
        // if data is less than node's data
        // move left
        else if(data < node.data)
            return this.search(node.left, data);
     
        // if data is less than node's data
        // move left
        else if(data > node.data)
            return this.search(node.right, data);
     
        // if data is equal to the node data 
        // return node
        else
            return node;
    }
}

//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#######################  Hash Table  ############################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################

/*https://gist.github.com/alexhawkins/48d7fd31af6ed00e5c60*/

class HashTable {
  
    constructor(){

        this.data = [];
    }

    createHashIndex(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash = hash >>> 0; //convert to 32bit unsigned integer
        }
        return Math.abs(hash % max);
    }

    insert(key, value) {
        if (key === undefined || value === undefined || key.length === 0 || value.length === 0)
            throw ('Insertion of undefined not possible')
        else {
            var hashIndex = this.createHashIndex(key);
            data[hashIndex] = value;
        }
        return this;
    }

    getValue(key) {
        var hashIndex = this.createHashIndex(key);
        return key + ': ' + data[hashIndex];
    }

};

//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#######################  Movies Data ############################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################


class moviesData {

	constructor(){

		this.arrayYears = [];
		this.arrayOfGenres = [];
	}

	intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

	loadData(jsonFile){
		var tempYearNode;
		var tempBinaryTree;
		var tempListOfWords
		var tempTreeNode;
		var thisMovie;
		var listOfGenres;

		// Iterate movies
		for(var indexOfMovie = 0; indexOfMovie < jsonFile.length; indexOfMovie++){
			thisMovie = jsonFile[indexOfMovie];
			if(arrayYears[thisMovie.year % jsonFile[0].year] == null){
				arrayYears.push(new yearNode());
				indexOfMovie--;
			}else{
				tempYearNode = this.arrayYears[jsonFile[indexOfMovie].year % jsonFile[0].year].;

				// Add genres of movie to Hash
				if(thisMovie.genre == null){
					listOfGenres = ["SinGenero"];
				}else{
					listOfGenres = thisMovie.genre.split(',');
				}
				for(var indexOfGenre = 0; indexOfGenre < listOfGenres.length; indexOfGenre++){
					tempBinaryTree = tempYearNode.genresHash.getValue(listOfGenres[indexOfGenre]);
					if(tempBinaryTree == null){
						tempBinaryTree = new BinarySearchTree();
						tempYearNode.genresHash.insert(listOfGenres[indexOfGenre], tempBinaryTree);
						this.arrayOfGenres.push(listOfGenres[indexOfGenre]);
					}
					tempBinaryTree.count++;
		 
					// Get Words
					tempListOfWords = thisMovie.title.split(' ');
					if(thisMovie.cast != null){
						tempListOfWords.push(thisMovie.cast.split(','))
					}

					//Add words to the Tree
					for(var indexOfWords = 0; indexOfWords < tempListOfWords; indexOfWords++){
						tempTreeNode = tempBinaryTree.search(tempBinaryTree.root, tempListOfWords[indexOfWords]);
						if(tempTreeNode == null){
							tempTreeNode = tempBinaryTree.insert(tempListOfWords[indexOfWords]);
							tempTreeNode.data = [];
						}

						//Add index of Movie to TreeNode
						tempTreeNode.data.push(indexOfMovie);
					}
				}
			}
		}
	}

	getData(jsonQuery){
		var jsonResult = {	"years":[],
							"totalYears": jsonQuery.lastYear - jsonQuery.firstYear + 1,
							"maxValue": 0,
							"firstYear":jsonQuery.firstYear,
							"lastYear":jsonQuery.lastYear}
		var listOfGenres;
		var listOfActors;
		var tempListOfActors;
		var tempListOfWords;
		var listOfWords;
		var cantOfMovies;
		var setOfMoviesA = new Set();
		var setOfMoviesB = new Set();
		var tempBinaryTree;

		// Iterate years
		for(var thisYearIndex = jsonQuery.firstYear % arrayYears[0]; thisYearIndex <= jsonQuery.lastYear % arrayYears[0]; thisYearIndex++){
			if(jsonQuery.genres == null){
				listOfGenres = this.arrayOfGenres;
			}else{
				listOfGenres = jsonQuery.genres;
			}
			jsonResult.years.push({	"year": arrayYears[thisYearIndex],
									"genres":[]});

			if(jsonQuery.cast == null && jsonQuery.words == null){
				for(var indexOfGenre = 0; indexOfGenre < listOfGenres.length; indexOfGenre++){
					cantOfMovies = arrayYears[thisYearIndex].genresHash.getValue(arrayOfGenres[indexOfGenre]).count;
					jsonResult.years[jsonResult.years.length - 1].genres.push(
					{"name":listOfGenres[indexOfGenre],
					 "amount":cantOfMovies});
					if(cantOfMovies > jsonQuery.maxValue){
						jsonQuery.maxValue = cantOfMovies;
					}
				}
			}
			else{
				// Iterate Genres
				for(var indexOfGenre = 0; indexOfGenre < listOfGenres.length; indexOfGenre++){
					if(jsonQuery.cast == null){listOfActors = [];}
					else{
						listOfActors = jsonQuery.cast;
					}
					if(jsonQuery.words == null){listOfWords = [];}
					else{
						listOfWords = jsonQuery.words;
					}
					tempBinaryTree = this.arrayYears[thisYearIndex].genresHash.getValue(listOfGenres[indexOfGenre]);

					//Iterate Actors/ Cast
					for(var indexOfCast = 0; indexOfCast < listOfActors.length; indexOfCast++){
						tempListOfActors = tempBinaryTree.search(tempBinaryTree.root, listOfActors[indexOfCast]);
						if(tempListOfActors!= null){
							for(var indexOfMovieIndex = 0; indexOfMovieIndex < tempListOfActors.length; indexOfMovieIndex++){
								setOfMoviesA.add(tempListOfActors[indexOfMovieIndex]);
							}
						}
					}

					//Iterate Words
					for(var indexOfWords = 0; indexOfWords < listOfWords.length; indexOfWords++){
						tempListOfWords = tempBinaryTree.search(tempBinaryTree.root, listOfWords[indexOfWords]);
						if(tempListOfWords!= null){
							for(var indexOfMovieIndex = 0; indexOfMovieIndex < tempListOfWords.length; indexOfMovieIndex++){
								setOfMoviesB.add(tempListOfWords[indexOfMovieIndex]);
							}
						}
					}
					if(jsonQuery.cast == null || jsonQuery.words == null || jsonQuery.cast == [] || jsonQuery.words == []){
						jsonResult.years[jsonResult.years.length - 1].genres.push(
						{"name":listOfGenres[indexOfGenre],
					 	"amount":setOfMoviesA.length + setOfMoviesB.length});
					}
					else{
						jsonResult.years[jsonResult.years.length - 1].genres.push(
						{"name":listOfGenres[indexOfGenre],
					 	"amount":intersection(setOfMoviesA, setOfMoviesB)});	
					}	
				}

			}
		}
		return jsonResult;
	}

};

class yearNode
{

    constructor()
    {
        this.genresHash = new HashTable();
        this.genresCount = 0;
    }
};


//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#######################   Code Node  ############################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################



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
	res.send({
		years: [{ year: 1990,
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
		maxValue:130,
		firstYear:1990
		});
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
//#################################################################

console.log(movieData.length);
let movieDataInstance;
movieDataInstance = new moviesData();
movieDataInstance.loadData(movieData);
//#################################################################

console.log("Listening on port "+PORT_NUMBER)
