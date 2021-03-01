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
var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

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
d3.csv("data/data.csv").then(healthData => {
    // console.log(data)

    healthData.forEach(function(record) {
        record.healthcare = +record.healthcare;
        record.poverty = +record.poverty;

        record.age = +record.age;
        record.smokes = +record.smokes;
    });

    //add x axis
    var x = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.age))
        .range([0, width]);

    //add y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)])
        .range([height, 0]);

    var y2 = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.poverty)])
        .range([height, 0]);
        
    //create axes
    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y);
    var rightAxis = d3.axisRight(y2);

    //append axes to the chartGroup
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
    chartGroup.append("g").call(leftAxis);
    chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis);

    //add dots
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.age))
        .attr("cy", d => y(d.smokes))
        .attr("r", 8)
        .style("fill", "lightblue")
        .attr("opacity", ".5");
        // .attr("stroke-width", ".2")
        // .attr("stroke", "dark gray");



    })
    
    // .catch(function(error) {
    //     console.log(error);
    // })





