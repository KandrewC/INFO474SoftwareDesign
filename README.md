# BubbleChart.js API 

A D3v4 BubbleChart 

## Usage

Load in a data file.

```javascript
d3.csv('data/prepped_data.csv', function(error, data) {}.
```

Make sure you have the javascript file loaded into your html.

```html
<script src="js/BubbleChart.js"></script>
```

Then create an instance of the Bubble Chart.
```javascript
var myChart = BubbleChart()
```

Then load your data into the chart and call your chart

```javascript
var div = d3.select("#vis")datum(data).call(myChart) 
```

**API Methods**
======
 
Here are the possible changes to the bubble chart that can be made

**Bubble Chart Title** : Takes in a value to set the title of chart

* bubble.title(inputTitle)

**Bubble Chart TitleSize** : Takes in a value to set the size of title of chart

* bubble.title(inputTitleSize)


**Bubble Height** : Takes in a value to set the height of chart

* bubble.height(inputHeight)


**Bubble Width** : Takes in a value to set the width of chart

* bubble.width(inputWidth)


**Bubble Radius** : Takes in a value to set the radius multiplier of chart

* bubble.radius(inputCircleRadiusFactor)

**Bubble Color** : Takes in an array to set color of data for chart

* bubble.colors(inputColorsArray)

**Bubble ColorInput** : Takes in a string to set how colors will be shown for chart

* bubble.colorInput(inputColorString)

Needs to take a property of your dataset that specifies how the colors should be bound to your data. 

**Bubble CircleData** : Takes in data to show where circle will be placd in chart

* bubble.circleData(inputData)

**Bubble Transition** : Takes in an input duration for time to draw bubbles. Use 0 to have no transition

* bubble.transitionDuration(inputDuration)

**Bubble Hovers** : Takes in two values, a Hover Label and Item Type in order to change the information on a tool tip for hovering

* bubble.hover(inputHoverLabel, inputHoverItemType)

