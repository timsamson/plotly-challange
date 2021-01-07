
// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data
    var sample_metadata = d3.select("#sample-metadata");
    var metadata = `/metadata/${sample}`;
    d3.json(metadata).then(function(sample) {

    // clear any existing metadata
    sample_metadata.html(" ");

        // Parse and filter the data to get the sample's metadata
        Object.entries(sample).forEach(([key, value]) => {
            sample_metadata.append("p").text(`${key} : ${value}`)    
          });

})


}
// Define a function that will create charts for given sample
function buildCharts(sample) {

    var sampledata = `/samples/${sample}`;
    d3.json(sampledata).then((data) => {

    //define values
    var x_values = data.otu_ids;
    var y_values = data.sample_values;
    var m_size = data.sample_values; 
    var m_colors = data.otu_ids;
    var t_values = data.otu_labels;
    
}

// Define function that will run on page load
function init() {

    // Read json data

        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots

}

function optionChanged(newSample){

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

