// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data1) => {

    // get the metadata field
    let sampleMetadata = Object.values(data1.metadata);
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
    newMetadata.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata. 
    
    for (let j = 0; j < chosenKeys.length; j++) {
      newMetadata
          .append("div")
          .text(chosenKeys[j].toUpperCase() + ": " + chosenValues[j])
          console.log(chosenKeys[j] + ": " + chosenValues[j]);
    }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data2) => {

    // Get the samples field
    let samples = Object.values(data2.samples);
    console.log(samples);

    // Filter the samples for the object with the desired sample number
    function selectSample(item) {
      return item.id == sample;
    }
    let chosenSample = samples.filter(selectSample);
    console.log(chosenSample);

    // Get the otu_ids, otu_labels, and sample_values  
    let otuidArray = chosenSample[0].otu_ids;
    console.log("otiuidArray", otuidArray);

    let samplevalArray = chosenSample[0].sample_values;
    console.log("samplevalArray", samplevalArray);
    
    let otulabelArray = chosenSample[0].otu_labels;
    
    
    let samplesSliced = samplevalArray.slice(0,10);
    console.log("samplesSliced", samplesSliced);
    
    samplesSliced.reverse();
    console.log("samplesSliced.reversed", samplesSliced);
    
    let otuidSliced = otuidArray.slice(0,10);
    console.log("otuidSliced", otuidSliced);
    
    otuidSliced.reverse();
    console.log("otuidSliced.reversed", otuidSliced);
    
    let otulabelsSliced = otulabelArray.slice(0,10);
    console.log("otulabelsSliced", otulabelsSliced);

    otulabelsSliced.reverse();
    console.log("otulabelsSliced.reversed", otulabelsSliced);

    let trace1 = {
      x: otuidArray,
      y: samplevalArray,
      text: otulabelArray,
      mode: 'markers',
      marker: {
        size: samplevalArray,
        color: otuidArray,
      },
      type: 'scatter'
    };


    // Build a Bubble Chart
    let data = [trace1];

    let layout = {
      title: {
        text: 'Bacteria Cultures Per Sample'
      },
      xaxis: {
        title: {
          text: 'OTU ID'
        }
      },
      yaxis: {
        title: {
          text: 'Number of Bacteria'
        }
      },
      showlegend: false,
      height: 500,
      width: 1200
    };
    
    // Render the Bubble Chart
    Plotly.newPlot("bubble", data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    //text: slicedData.map(object => object.greekName),
   
    let labels = otuidSliced.map(item => `OTU ${item} `);

    let trace2 = { 
      x: samplesSliced,
      y: labels,
      text: otulabelsSliced,
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          height: 10,
          width: 1
        }
      },
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let datab = [trace2];

    let layoutb = {
      title: {
        text: 'Top 10 Bacteria Cultures Found'
      },
      xaxis: {
        title: {
          text: 'Number of Bacteria'
        }
      },
      showlegend: false,
      height: 500,
      width: 900
    };

    let config = {responsive: true};

    // Render the Bar Chart
    Plotly.newPlot("bar", datab, layoutb, config);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = Object.values(data.names);
    console.log("sampleNames", sampleNames);

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
      console.log("firstSample", firstSample);

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);

    


});
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  let dropdownMenu = d3.select("#selDataset");
  let nextSample = dropdownMenu.property("value");
  console.log("nextSample", nextSample);

  buildMetadata(nextSample);
  buildCharts(nextSample);
}

// Initialize the dashboard
init();
