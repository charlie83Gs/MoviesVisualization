var w, h;
var canvas;
var jsonData;
var visualization;
var ready;
var maxV;
var tGroups;

function setup() {
	let scwidth = window.innerWidth;
	let scheight = window.innerHeight;
	canvas = createCanvas(scwidth-200, scheight-100);
	canvas.position(100,50);
	ready = false;
	loadJSON("http://localhost:3500/getchart", loadData);
	
}

function draw() {
	background(120);
	
	
	fill(0);
	noStroke();
	//draw if json has been recived
	if(ready){
		for(let i = 0; i < visualization.length; i++){
			visualization[i].drawSelf(i,visualization.length,maxV)
		}
		fill(170,0,40)
	}
	drawHvalues(maxV, 10);
	//ellipse(mouseX, mouseY, 80, 80);
}



function drawVisualization(){
	
}


function Group(year, extension){
	this.year = year;
	this.extension = extension;
	this.totalMovies = 0;
	this.groups = [];
}

Group.prototype.addGenreData = function(name, amount){
	//se crea un nuevo objeto que sera visualizado
	var newElement = new GenreData(name, amount);
	//si no hay elementos se inserta al inicio
	this.groups.push(newElement);
	
	this.groups.sort(
	function(a,b){
			return b.amount - a.amount;
		}
	);
	
	this.totalMovies += amount;
	}

Group.prototype.drawSelf = function(position, totalGroups, maxValue){
	var gap = 30;
	var sideGap = 100;
	var horizontalSize = (width - sideGap) / totalGroups - gap;
	//console.log(this.groups.length);
	var acumulado = 0;
	let initialX = position*horizontalSize + sideGap/2 + gap*(position+1);
	maxValue += 50;
	let maxCircleSize = horizontalSize / 3.0;
	strokeWeight(2);
	textAlign(CENTER);
	for(group = 0; group < this.groups.length; group++){
		fill(this.groups[group].drawcolor);
		stroke(0);
		let amount = this.groups[group].amount
		let radius = map(amount, 0, maxValue, 1 , maxCircleSize);
		let yPos = map(amount,0, maxValue,height,0);
		let xPos = map(acumulado,0, this.totalMovies,0,horizontalSize) + initialX;
		ellipse( xPos, yPos,radius,radius);
		let d = dist(xPos, yPos, mouseX,mouseY);
		if(d < radius){
			ellipse( xPos, yPos,radius*1.1,radius*1.1);
			fill(180);
			noStroke;
			text(this.groups[group].name, xPos, yPos);
			text(amount, xPos, yPos+20);
			
		}
		acumulado += amount;
	}
	fill(0);
	console.log(height)
	stroke(0,0,0,60)
	line(initialX - gap,0, initialX - gap,height);
	textAlign(RIGHT);
	stroke(255);
	strokeWeight(2);
	text(this.year, initialX - gap, height - 10);
	}
	
function GenreData(name, amount){
	this.name = name;
	this.amount = amount;
	let r = Math.floor(map(Math.random(),0,1,45,255));
	let g= Math.floor(map(Math.random(),0,1,45,255));
	let b = Math.floor(map(Math.random(),0,1,45,255));
	this.drawcolor = color(r,g,b);
	}

function drawHvalues(maxV, segments){
	textAlign(LEFT);
	segmentSize = height/(segments);
	fill(0);
	for(let segment = 0; segment < segments; segment++){
		text(Math.floor(segment*segmentSize), 0 ,  height - segmentSize * segment);
	}
	}



window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w-200,h-100);	
  canvas.position(100,50);
  width = w-200;
  height = h-100;
};
















function loadData(data) {
	//console.log(data);
	jsonData = data;
	visualization = [];
	var totalYears = data["totalYears"];
	maxV = data["maxValue"];
	
	var groupSize = 0;
	if(totalYears < 10){
		groupSize = 1;
	}else{
		groupSize = totalYears/3;
	}
	tGroups = Math.floor(totalYears / groupSize);
	
	for(let group = 0; group < totalYears / groupSize; group++){
		visualization.push(new Group(jsonData["firstYear"]+group*groupSize,groupSize));
	}
	
	//let years = jsonData["years"];
	for(let year = 0; year < totalYears; year++){
		let yearData = jsonData["years"][year];
		for(genre  = 0; genre < yearData["genres"].length; genre++){
			visualization[Math.floor(year/groupSize)]
			.addGenreData(yearData["genres"][genre].name,yearData["genres"][genre].amount);
		}
		
		
	}
	ready = true;
	
}
