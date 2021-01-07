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
    console.log(sampleSubjectOTUs);
    var sampleSubjectFreq = data.samples[index].sample_values;
    var otuLabels = data.samples[index].otu_labels;

    var washFrequency = data.metadata[+index].wfreq;
    console.log(washFrequency);


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

    // Set up trace
    var trace1 = {
      x: topTenFreq,
      y: reversedLabels,
      text: topTenToolTips,
      name: "",
      type: "bar",
      orientation: "h"
    };

    // data
    var barData = [trace1];

    // Apply  layout
    var layout = {
      title: "Top 10 OTUs",
      margin: {
        l: 75,
        r: 75,
        t: 75,
        b: 50
      }
    };
 // Render the plot to the div tag with id "plot"
 Plotly.newPlot("bar", barData, layout);

 

