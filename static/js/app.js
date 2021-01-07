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
//  function updatePlots(index) {


  });

