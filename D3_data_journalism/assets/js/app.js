// @TODO: YOUR CODE HERE!

//get data from csv file
function logData() {
    d3.csv("data/data.csv", (d) => {
        console.log(d)
    })
}

logData();


// var dataHealth = d3.csv("data/data.csv", (d) => {
//     console.log(d)
//     });


//set svg area dimensions
var svgWidth = 960;
var svgHeight = 660;

//set chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

//set dimensions for chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//append svg to body of the page
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

//append a group to the SVG area 
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//read the data
d3.csv("data/data.csv").then(data => {
    console.log(data)

    data.forEach(function(rate) {
        rate.healthcare = +rate.healthcare;
        rate.poverty = +rate.poverty;
        rate.smokes = +rate.smokes;
        rate.age = +rate.age;
    })

    //add x axis
    var x = d3.scaleLinear()
        .domain([0, max])
        .range([0, chartWidth]);
    svg.append("g")
        .attr("transform", `translate(${chartHeight})`)
        .call(d3.axisBottom(x));

    //add y axis
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([chartHeight, 0]);
    svg.append("g")
        .attr("transform", `translate(${chartHeight})`)
        .call(d3.axisLeft(y));

    //add dots
    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { 
            return x(d.smokes); 
        })
        .attr("cy", function (d) { 
            return y(d.age); 
        })
        .attr("r", 1.5)
        .style("fill", "light blue");

})




