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
var svgWidth = 900;
var svgHeight = 900;

//set chart's margins as an object
var chartMargin = {
  top: 100,
  right: 50,
  bottom: 10,
  left: 50
};

//set dimensions for chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//append svg to body of the page
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


//append a group to the SVG area 
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//read the data
d3.csv("data/data.csv").then(data => {
    console.log(data)

    data.forEach(function(record) {
        // rate.healthcare = +rate.healthcare;
        // rate.poverty = +rate.poverty;

        record.age = +record.age;
        record.smokes = +record.smokes;
    });

    //add x axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.age))
        .range([0, chartWidth]);
    svg.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(x));

    //add y axis
    var y = d3.scaleLinear()
        .domain([0, 30])
        .range([chartHeight, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    //add dots
    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d, i) { 
            return x(d.age); 
        })
        .attr("cy", function (d) { 
            return y(d.smokes); 
        })
        .attr("r", 4)
        .style("fill", "blue");

    }).catch(function(error) {
        console.log(error);
    })





