class moviesData {

	this.arrayYears = [];

	constructor(jsonFile){

		loadData(jsonFile);

	}

	loadData(jsonFile){
		var tempYearNode;
		for(var indexOfMovie = 0; indexOfMovie < jsonFile.length; indexOfMovie++){
			//Se asume que la primera pelicula es la mas antigua y que no habran peliculas en el 3400
			if(this.arrayYears[jsonFile[indexOfMovie].year % jsonFile[0].year] == null){
				arrayYears.push(new yearNode());
				indexOfMovie--;
			}
			tempYearNode = this.arrayYears[jsonFile[indexOfMovie].year % jsonFile[0].year];
			tempYearNode.genresCount++;
			console.log(tempYearNode.genresCount);
			console.log(this.arrayYears[jsonFile[indexOfMovie].year % jsonFile[0].year]);
		}
		
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

