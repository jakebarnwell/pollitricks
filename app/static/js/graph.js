graph_exists = {"temp": false, "perm": false};

graph = {
	
	changeGraph: function(graphId, data, population) {
		// $("#" + graphId).css("background-color","red");

		var margin = {top: 20, side: 10, bottom: 20},
		    width = $("#" + graphId).width() - 2 * margin.side;
		    height = $("#" + graphId).height() - margin.top - margin.bottom;

		var largeBarPadding = 2;
		var largeBarWidth = width / 2 - largeBarPadding;
		var smallBarWidth = (2 / 3) * largeBarWidth;
		var smallBarOffsetFromLarge = (largeBarWidth - smallBarWidth) / 2;

		// var x = d3.scale.linear()
		//     .range([barWidth / 2, width - barWidth / 2]);

		// var y = d3.scale.linear()
		//     .range([height, 0]);

		// var yAxis = d3.svg.axis()
		//     .scale(y)
		//     .orient("right")
		//     .tickSize(-width)
		//     .tickFormat(function(d) { return Math.round(d / 1e6) + "M"; });

		// An SVG element 
		var svg = d3.selectAll("#" + graphId)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

		var dataset = [55, 34, 45, 66];
		dataset = [0, 0, 0, 0].map(function(e) {return Math.floor(Math.random() * 100);});

		if(dataset.length != 4) {
			alert("Error: dataset has " + dataset.length + " elements. It should have 4.");
		}

		svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("fill", function(d, i) {
				switch(i) {
					case 0: return "#0e2db7";
					case 1: return "#152c96";
					case 2: return "#f72a37";
					case 3: return "#af131d";
				}
			})
			.attr("x", function(d, i) {
				var nominal_x = Math.floor(i / 2) * (width / 2);
				if(i == 0 || i == 2) {
					return nominal_x;
				} else {
					return nominal_x + smallBarOffsetFromLarge;
				}
			})
			.attr("y", function(d) {
				return height - d;
			})
			.attr("width", function(d, i) {
				if(i == 0 || i == 2) {
					return largeBarWidth;
				} else {
					return smallBarWidth;
				}
			})
			.attr("height", function(d) {
				return d;
			});

		// svg.selectAll("text")
		//    .data(dataset)
		//    .enter()
		//    .append("text")
		//    .text(function(d) {
  //       	return d;
  //  			})
		// 	.attr("x", function(d, i) {
		// 		return i * (width / dataset.length);
		// 	})
		// 	.attr("y", function(d) {
		// 		return height - d;
		// 	});

		

		// // A sliding container to hold the bars by birthyear.
		// var birthyears = svg.append("g")
		//     .attr("class", "birthyears");

		// // A label for the current year.
		// var title = svg.append("text")
		//     .attr("class", "title")
		//     .attr("dy", ".71em")
		//     .text(2000);

		// d3.csv(poll, function(error, data) {

		//   // Convert strings to numbers.
		//   data.forEach(function(d) {
		//     d.poll = +d.poll;
		//     d.twitter = +d.twitter;
		//   });

		//   // // Compute the extent of the data set in age and years.
		//   // var age1 = d3.max(data, function(d) { return d.age; }),
		//   //     year0 = d3.min(data, function(d) { return d.year; }),
		//   //     year1 = d3.max(data, function(d) { return d.year; }),
		//   //     year = year1;

		//   // Update the scale domains.
		//   x.domain([0, 1]);
		//   y.domain([0, 100]);

		//   // Produce a map from year and birthyear to [male, female].
		//   data = d3.nest()
		//       .key(function(d) { return d.year; })
		//       .key(function(d) { return d.year - d.age; })
		//       .rollup(function(v) { return v.map(function(d) { return d.people; }); })
		//       .map(data);

		//   // Add an axis to show the population values.
		//   svg.append("g")
		//       .attr("class", "y axis")
		//       .attr("transform", "translate(" + width + ",0)")
		//       .call(yAxis)
		//     .selectAll("g")
		//     .filter(function(value) { return !value; })
		//       .classed("zero", true);

		//   // Add labeled rects for each birthyear (so that no enter or exit is required).
		//   var birthyear = birthyears.selectAll(".birthyear")
		//       .data(d3.range(year0 - age1, year1 + 1, 5))
		//     .enter().append("g")
		//       .attr("class", "birthyear")
		//       .attr("transform", function(birthyear) { return "translate(" + x(birthyear) + ",0)"; });

		//   birthyear.selectAll("rect")
		//       .data(function(birthyear) { return data[year][birthyear] || [0, 0]; })
		//     .enter().append("rect")
		//       .attr("x", -barWidth / 2)
		//       .attr("width", barWidth)
		//       .attr("y", y)
		//       .attr("height", function(value) { return height - y(value); });

		//   // Add labels to show birthyear.
		//   birthyear.append("text")
		//       .attr("y", height - 4)
		//       .text(function(birthyear) { return birthyear; });

		//   // Add labels to show age (separate; not animated).
		//   svg.selectAll(".age")
		//       .data(d3.range(0, age1 + 1, 5))
		//     .enter().append("text")
		//       .attr("class", "age")
		//       .attr("x", function(age) { return x(year - age); })
		//       .attr("y", height + 4)
		//       .attr("dy", ".71em")
		//       .text(function(age) { return age; });
		  
	},
	deleteGraph: function(graphId) {
		$("#" + graphId + " svg").remove();
		// d3.select("#" + graphId + " svg").transition().attr("height", 300);
	}


}