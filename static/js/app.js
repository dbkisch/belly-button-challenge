// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let sampleMetadata = Object.values(data.metadata);
    console.log(sampleMetadata);
    // Filter the metadata for the object with the desired sample number
      
    function selectName(item) {
      return item.id == sample;
    }
    
    let chosen = sampleMetadata.filter(selectName);
    console.log(chosen[0]);
    let chosenKeys = Object.keys(chosen[0]);
    let chosenValues = Object.values(chosen[0]);

    // Use d3 to select the panel with id of `#sample-metadata`
    newMetadata = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata. 
    
    for (let j = 0; j < chosenKeys.length; j++) {
      newMetadata
          .append("div")
          .text(chosenKeys[j] + ": " + chosenValues[j])
          console.log(chosenKeys[j] + ": " + chosenValues[j]);
    }



  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = Object.values(data.names);
    console.log(sampleNames);

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    sampleNames.forEach((sample) => {
      dropdownMenu
          .append("option")
          .text(sample)
          .property("value", sample);
    });
      
    
      // Get the first sample from the list
      let firstSample = dropdownMenu.property("value");
      console.log(firstSample);
    // Build charts and metadata panel with the first sample
    let test = buildMetadata(firstSample);
    


});
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
