var canvas = d3.selectAll("#MovielizeChartArea").append("svg")
			.attr("width", 400)
			.attr("height", 400);

		var rScale = d3.scaleLinear()
			.domain([0,200])
			.range([10, 50]);

		d3.json("http://localhost:3500/getchart").then(function(data){
			var resultData = data.columns;
			console.log(data);
			/*canvas.selectAll("circle")
				.data(resultData)
				.enter()
				.append("circle")
					.attr("r", function(d, i){
						//return rScale(d.cantidad);
						return 200;
					})
					.attr("cx", function(d, i) {
						return 40;
					})
					.attr("cy", 50)*/

		});
		
		
