// @TODO: YOUR CODE HERE!

//get data from csv file
// function logData() {
//     d3.csv("data/data.csv", (d) => {
//         console.log(d)
//     })
// }

// logData();

function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#scatter").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
    svgArea.remove();
    }

    //set svg area dimensions
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    //set chart's margins as an object
    var chartMargin = {
    top: 100,
    right: 750,
    bottom: 100,
    left: 70
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
            record.abbr = record.abbr;
        });

        //add x axis
        var x = d3.scaleLinear()
            .domain([20, 60])
            .range([0, width]);

        //add y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(healthData, d => d.smokes)])
            .range([height, 0]);
            
        //create axes
        var bottomAxis = d3.axisBottom(x);
        var leftAxis = d3.axisLeft(y);

        //append axes to the chartGroup
        chartGroup.append("g").attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
        chartGroup.append("g")
            .call(leftAxis);


        //add dots
        var circlesGroup = chartGroup.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.age))
            .attr("cy", d => y(d.smokes))
            .attr("r", 8)
            .style("fill", "steelblue")
            .attr("opacity", ".5");
        
        //append text in dots
            
        // var gdots =  svg.selectAll("g.dot")
        //     .data(healthData)
        //     .enter()
        //     .append("g");

        // gdots.append("circle")
        //     .attr("class", "dot")
        //     .attr("r", function (d) {
        //         return d.r;
        //     })
        //     .attr("cx", function (d) {
        //         return x(d.x);
        //     })
        //     .attr("cy", function (d) {
        //         return y(d.y);
        //     })
        //     .style("fill", function (d) {
        //         return d.c;
        //     });

        // gdots.append("text").text(function(d){
        //         return d.abbr;
        //     })
        //     .attr("x", function (d) {
        //         return x(d.x);
        //     })
        //     .attr("y", function (d) {
        //         return y(d.y);
        //     });

        //add tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return (`Smokes: ${d.smokes} %<br>Age: ${d.age}<br>In Poverty: ${d.poverty} %`);
            });
        
        chartGroup.call(toolTip);

        //power up mouseover
        circlesGroup.on("mouseover", function(d) {
            toolTip.style("display", "block")
                .show(d, this);
        })

        //create mouseout
            .on("mouseout", function(d, i) {
                toolTip.style("display", "none");
            });

        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - chartMargin.left + 20)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Smokes (%)");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + 40})`)
            .attr("class", "axisText")
            .text("Age (Median)");

    }).catch(function(error) {
    console.log(error);
    })
}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);






