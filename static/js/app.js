// Use D3 to read the JSON file
var url = "data/samples.json";

d3.json(url).then(function(data) {
    console.log(data);

//populate the ids
    var idList = data.names;
    for (var i = 0; i < idList.length; i++) {
      selectBox = d3.select("#selDataset");
      selectBox.append("option").text(idList[i]);
    }

 // Set up default plot
updatePlots(0)

// Function for updating plots   
function updatePlots(index) {

    // Set up arrays for horizontal bar chart & gauge chart
    var sampleSubjectOTUs = data.samples[index].otu_ids;
    var sampleSubjectFreq = data.samples[index].sample_values;
    var otuLabels = data.samples[index].otu_labels;
    var washFrequency = data.metadata[+index].wfreq;

    // Populate Demographic Data card
    var demoKeys = Object.keys(data.metadata[index]);
    var demoValues = Object.values(data.metadata[index])
    var demographicData = d3.select('#sample-metadata');

    // clear demographic data
    demographicData.html("");
    for (var i = 0; i < demoKeys.length; i++) {
      demographicData.append("p").text(`${demoKeys[i]}: ${demoValues[i]}`);
    };

    // Slice and reverse data for horizontal bar chart
    var topTenOTUS = sampleSubjectOTUs.slice(0, 10).reverse();
    var topTenFreq = sampleSubjectFreq.slice(0, 10).reverse();
    var topTenToolTips = data.samples[0].otu_labels.slice(0, 10).reverse();
    var topTenLabels = topTenOTUS.map((otu => "OTU " + otu));
    var reversedLabels = topTenLabels.reverse();

     // Chart Traces
     //Bar
    var traceBar = {
        x: topTenFreq,
        y: reversedLabels,
        text: topTenToolTips,
        name: "",
        type: "bar",
        orientation: "h"
      }

    //Bubble
    var traceBubble = {
        x: sampleSubjectOTUs,
        y: sampleSubjectFreq,
        text: otuLabels,
        mode: 'markers',
        marker: {
          color: sampleSubjectOTUs,
          opacity: [1, 0.8, 0.6, 0.4],
          size: sampleSubjectFreq
        }
      }

    //Guage
    var traceGuage = [{
        domain: {x: [0, 1], y: [0,1]},
        type: "indicator",
        mode: "gauge+number",
        value: washFrequency,
        title: { text: "Belly Button Washes Per Week" },
        gauge: {
          axis: { range: [0, 9], tickwidth: 0.5, tickcolor: "black" },
          bar: { color: "#08219e" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "transparent",
          steps: [
            { range: [0, 1], color: "#32a867" },
            { range: [1, 2], color: "#32a850" },
            { range: [2, 3], color: "#3aa832" },
            { range: [3, 4], color: "#6ba832" },
            { range: [4, 5], color: "#98a832" },
            { range: [5, 6], color: "#ebd021" },
            { range: [6, 7], color: "#eb9e21" },
            { range: [7, 8], color: "#eb5e21" },
            { range: [8, 9], color: "#eb2121" } 
          ],
        }
      }];

    //Chart Data Vars
      var barData = [traceBar];
      var bubbleData = [traceBubble];
      var gaugeData = traceGuage;      
      
    //Chart Layouts
    //Bar
      var layoutBar = {
        title: "Top 10 OTUs",
        margin: {
          l: 75,
          r: 75,
          t: 75,
          b: 50
        }
      };
    
    //Bubble
      var layoutBubble = {
        title: 'OTU Frequency',
        showlegend: false,
        height: 600,
        width: 930
      }
    
    //Guage
      var layoutGuage = {
        width: 600,
        height: 500,
        margin: { t: 0, b: 0 }
      };

    // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", barData, layoutBar);
  
    // Render the plot to the div tag with id "bubble-plot"
        Plotly.newPlot("bubble", bubbleData, layoutBubble)
        
    // Render the plot to the div tag with id "guage"   
        Plotly.newPlot("gauge", gaugeData, layoutGuage);
    }
  
    // On button click, call refreshData()
    d3.selectAll("#selDataset").on("change", refreshData);

    function refreshData() {
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var personsID = dropdownMenu.property("value");
      console.log(personsID);
      // Initialize an empty array for the person's data
      console.log(data)
  
      for (var i = 0; i < data.names.length; i++) {
        if (personsID === data.names[i]) {
          updatePlots(i);
          return
        }
      }
    }
  
  });