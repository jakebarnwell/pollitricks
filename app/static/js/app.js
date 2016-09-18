/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
		
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */

// function everything(statesLived, citiesLived, unitedStates) {
function everything(kwargs) {
	//Width and height of map
	var width = $("#mapContainer").width();
	var height = $("#mapContainer").height();

	// D3 Projection
	var projection = d3.geo.albersUsa()
					   .translate([width/2, height/2])    // translate to center of screen
					   .scale([1000]);          // scale things down so see entire US
	        
	// Define path generator
	var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
			  	 .projection(projection);  // tell path generator to use albersUsa projection

			
	// Define linear scale for output
	var color = d3.scale.linear()
				  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

	var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

	//Create SVG element and append map to the SVG
	var svg = d3.select("#mapContainer")
				.append("svg")
				.attr("width", width)
				.attr("height", height);
	        
	// Append Div for tooltip to SVG
	// var div = d3.select("body")
	// 		    .append("div")   
	//     		.attr("class", "tooltip")               
	//     		.style("opacity", 0);

	d3.csv(kwargs.voting_data, function(voting_data) {
		color.domain([0,1,2,3]); // setting the range of the input data

		// Load GeoJSON data and merge with states data
		d3.json(kwargs.the_map, function(json_map) {
			// Loop through each state data value in the .csv file
			for (var i = 0; i < voting_data.length; i++) {
				// console.log(json_map.features[i]);
				// Grab State Name
				var dataState = voting_data[i].state;

				// Grab data value 
				var dataValue = voting_data[i].poll_approve;

				// Find the corresponding state inside the GeoJSON
				for (var j = 0; j < json_map.features.length; j++)  {
					var jsonState = json_map.features[j].properties.name;

					// Check if this is the right state, if so, copy the data value into the JSON
					if (dataState == jsonState) {
						json_map.features[j].properties.leftist = dataValue; 
						break; // stop looking through the JSON
					}
				}
			}

			function format_graph_data(d) {
				var the_data = [0, 0, 0, 0, d.properties.name];
				for(var i = 0; i < voting_data.length; i++) {
					if(d.properties.name === voting_data[i].state) {
						if(voting_data[i].candidate === "Hillary Clinton") {
							the_data[0] = +voting_data[i].poll_approve;
							the_data[1] = +voting_data[i].twitter_approve;
						} else {
							the_data[2] = +voting_data[i].poll_approve;
							the_data[3] = +voting_data[i].twitter_approve;
						}
					}
				}
				return the_data;
			}

			function mouseOver_state(d) {
				d["the_data"] = format_graph_data(d);
				graph.changeGraph("graphTemp", d, kwargs.population);
			}

			function mouseOut_state() {
				;
			}

			function mouseClick_state(d) {
				d["the_data"] = format_graph_data(d);
				graph.changeGraph("graphPerm", d, kwargs.population);
			}

			function interpolateColor(frac) {
				frac = +frac;
				// 5, 21, 252, to 252, 38, 5 
				if(frac) {
					var reds = d3.scale.linear().domain([0, 1]).range([5, 252]);
					var greens = d3.scale.linear().domain([0, 1]).range([21, 38]);
					var blues = d3.scale.linear().domain([0, 1]).range([252, 5]);
					return "rgb(" + Math.floor(reds(frac)) + "," + Math.floor(greens(frac)) + "," + Math.floor(blues(frac)) +")";
				} else {
					return "rgb(213,222,217)"; // Neutral gray color if there is no score
				}
			}
					
			// Bind the data to the SVG and create one path per GeoJSON feature
			svg.selectAll("path")
				.data(json_map.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "#fff")
				.style("stroke-width", "1")
				.style("fill", function(d) {
					// Get data value
					var leftist = d.properties.leftist;
					return interpolateColor(leftist);
				})
				.on("mouseover", mouseOver_state)
				.on("mouseout", mouseOut_state)
				.on("click", mouseClick_state);

			// Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
			// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
			// .on("mouseover", function(d) {      
		 //    	div.transition()        
		 //      	   .duration(200)      
		 //           .style("opacity", .9);      
		 //           div.text(d.place)
		 //           .style("left", (d3.event.pageX) + "px")     
		 //           .style("top", (d3.event.pageY - 28) + "px");    
			// })   

		 //    // fade out tooltip on mouse out               
		 //    .on("mouseout", function(d) {       
		 //        div.transition()        
		 //           .duration(500)      
		 //           .style("opacity", 0);   
		 //    });
		
		        
		// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
		// var legend = d3.select("body").append("svg")
		// 	.attr("class", "legend")
		// 	.attr("width", 140)
		// 	.attr("height", 200)
		// 	.selectAll("g")
		// 	.data(color.domain().slice().reverse())
		// 	.enter()
		// 	.append("g")
		// 	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	 //  	legend.append("rect")
	 //   		  .attr("width", 18)
	 //   		  .attr("height", 18)
	 //   		  .style("fill", color);

	 //  	legend.append("text")
	 //  		  .data(legendText)
	 //      	  .attr("x", 24)
	 //      	  .attr("y", 9)
	 //      	  .attr("dy", ".35em")
	 //      	  .text(function(d) { return d; });
		});
	});	

}