var BubbleChart = function() {
    var height = 1000;
    var width = 1000;
    
    var circleData;
    var circleRadiusFactor = 1;

    var colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);
    var colorInput;

    var hoverLabel;
    var hoverItemType;

    var transitionDuration = 1000;
    var title = "My New Bubble Chart";
    var titleSize = 50;

    var margin = {
        left: 100,
        bottom: 50,
        top: 30,
        right: 10
    };
 
    //Returns chart function
    var chart = function(selection) {
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;
        
        var pack = d3.pack()
            .size([width, height])
            .padding(2.0);

            selection.each(function(data) {
                var chartTitle = selection
                    .append('div')
                    .style("color", "black")
                    .text(title)
                    .style("font-size", titleSize + "pt");

                var root = d3.hierarchy({
                    values: data
                } , function(d) {
                    return d.values;
                }) .sum(function(d) {
                    return +d[circleData];
                });

                //Get svg to draw graphics in
                var svg = d3.select(this).selectAll('.chart')
                    .data([data]);

                //Set height and width for svg
                var svgEnter = svg.enter()
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

                //Append g elements into svg
                var node = svgEnter.selectAll('.node').data(pack(root).leaves())
                    .enter().append('g')
                    .attr('class', 'node')
                    .attr('transform', function(d) { 
                        return 'translate(' + d.x + ',' + d.y + ')';
                    });

                //Append circles, apply transition duration, change radius, and apply fill
                node.append('circle')
                    .transition() 
                    .duration(transitionDuration)            
                    .attr('r', function(d) {
                        return (d.r * circleRadiusFactor);
                    })
                    //Apply the fill color
                    .attr('fill', function(d) {
                        return colorScale(d.data[colorInput]);
                    });
                
                // Creates tooltip that gives information about circles
                var tooltip = d3.select("body")
                    .append("div")
                    .style("padding", "10px")
                    .style("color", "white")
                    .style("background-color", "black")
                    .style("position", "absolute")
                    .text("tooltip");
                    
                node.selectAll('circle')           
                    .on("mousemove", function() {
                        return tooltip.style("top", (d3.event.pageY-5)+"px").style("left",(d3.event.pageX+5)+"px");
                    })
                    .on("mouseover", function(d) {
                        tooltip.text(d.data[hoverLabel] + ". " + hoverItemType  + ": " + +d.value);
                        tooltip.style("visibility", "visible");
                    })
                    .on("mouseout", function() { 
                        tooltip.text(); //remove text
                        return tooltip.style("visibility", "hidden");
                    });
            node.exit().remove();
        });
    };

    // Parameter: Height Value 
    // Output: Changes the chart height
    chart.height = function(inputHeight) {
        if (!arguments.length) return height;
        height = inputHeight;
        return chart;
    };

    // Parameter: Width Value 
    // Output: Changes the chart width
    chart.width = function(inputWidth) {
        if (!arguments.length) return width;
        width = inputWidth;
        return chart;
    };

    // Parameter: Title string
    // Output: Changes the chart title
    chart.title = function(inputTitle) {
        if (!arguments.length) return title;
        title = inputTitle;
        return chart;
    };

    // Parameter: Title size int
    // Output: Changes the chart title
    chart.titleSize= function(inputTitleSize) {
        if (!arguments.length) return titleSize;
        titleSize = inputTitleSize;
        return chart;
    };

    // Parameter: Radius Value 
    // Output: Changes a circles radius factor 
    chart.circleRadiusFactor = function(inputCircleRadiusFactor) {
        if (!arguments.length) return circleRadiusFactor;
        circleRadiusFactor = inputCircleRadiusFactor;
        return chart;
    };
    
    // Parameter: Array with colors
    // Output: Changes the colorScale 
    chart.colors = function(inputColorsArray) {
        if (!arguments.length) return colors;
        colors = inputColorsArray;
        colorScale = d3.scaleOrdinal().domain(colors).range(d3.schemeCategory20);
        return chart;
    };
    // Parameter: Color Value 
    // Output: Changes the charts input for colorScale
    chart.colorInput = function(inputColor) {
        if (!arguments.length) return colorScale;
        colorInput = inputColor;
        return chart;
    };

    // Parameter: Data wanted
    // Output: Changes the data that will be displayed on circle
    chart.circleData = function(inputData) {
        if (!arguments.length) return circleData;
        circleData = inputData;
        return chart;
    };

    // Parameter: Time 
    // Output: How long it takes for circles to be drawn, set to 0 if no transition wanted
    chart.transitionDuration = function(inputDuration) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = inputDuration
        return chart;
    };

    // Parameter: Hover Label and Item Type 
    // Output: Changes the hover information displayed.
    chart.hovers = function(inputHoverLabel, inputHoverItemType) {
        if (!arguments.length) return hovers;
        hoverLabel = inputHoverLabel;
        hoverItemType = inputHoverItemType
        return chart;
    };

    return chart;
};