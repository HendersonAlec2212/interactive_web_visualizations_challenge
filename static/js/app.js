// ## Step 1: Plotly

// 1. Use the D3 library to read in `samples.json`.
// the data will be parsed then displayed -> break down the data into parts == variables?

const sample_data = "samples.json";

// function find_sample(sample_entry) {
//     sample_entry = metadata.id;
//     return sample_entry;
// }

// read the data and write to console //
d3.json(sample_data).then(function(data){
    console.log(data);
    // console.log(data.metadata.length);
    // console.log(data.names.length);
    // console.log(data.samples.length);

});
// end read test //



// ----------------- READ DATA FOR ALL FUNCTIONS ----------------- //
// this function sets the global values to be used later in the application. //
function read_data (sample_entry) {
    d3.json(sample_data).then((data) => {
        var metadata = data.metadata;
        // var samples = data.samples;
        // var names = data.names; 

        // 4. Display the sample metadata, i.e., an individual's demographic information.
        // 5. Display each key-value pair from the metadata JSON object somewhere on the page.

        // use the patient id to return all patients

        // Filter returns an array of all values to match the user unput, Patient ID //
        var results_list = metadata.filter(sample_dict => sample_dict.id == sample_entry);
        // final result = first instance of patient list
        var result = results_list[0];
        // find the HTML div where we want the patient info
        var data_display = d3.select('#sample-metadata');
        // clear the data from the HTML patient div
        data_display.html('');

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries //

        // write the patient data - for each entry in dict, append the key:value text in a mini-header, see 14.3.4 for concept
        // demographic info panel html //
        Object.entries(result).forEach(([key,value]) =>{
            data_display.append('h6').text(`${key}: ${value}`);
            // data_display.append('hr')
        });
    });
    
}
// -----------------END READ DATA FOR ALL FUNCTIONS ----------------- //




// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.
// 3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.
// see activities using slice, map, =>, and reverse. //


// function loads in data and sets params for charts
function chart_maker(sample_entry) {

    // read the json and set == variable 'data'
    d3.json(sample_data).then((data) => 
    {
        // ----------------- set data variables  ----------------- //
        var samples = data.samples;
        // for each instance of true in sample array > return data with id matching query
        var result_list = samples.filter(sample_dict => sample_dict.id == sample_entry);
        // final result equals the first entry of the list
        var result = result_list[0];
        // graph params == variabels desired in outline
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values; 


        // ----------------- bar chart ----------------- //
        // https://plotly.com/javascript/bar-charts/
        
        
        // use reverse to pull top ten and change order to ascending //

        // function bacterial_IDs (otu_id)
        // {
        //     return `OTU ${otu_id}`;
        // }
        // var y_ticks = otu_ids.slice(0, 10).map(bacterial_IDs).reverse();

        // y_ticks = a reversed array (ascedning after reverse), returning as a string per array result.
        var y_ticks = otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse();
        
        //trace data for graph //
        var bar_data = 
        [
          {
            x: sample_values.slice(0, 10).reverse(),
            y: y_ticks,
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
          }
        ];
    
        var bar_layout = {
          title: "Top 10 Bacterial Cultures",
          automargin: true,
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          font:{
              color: '#d7d7d7'
          }
        };
    
        Plotly.newPlot("bar", bar_data, bar_layout);

        // ----------------- END BAR CHART ----------------- //

        
        // ----------------- bubble chart ----------------- //
       // https://plotly.com/javascript/bubble-charts/ //
       var bubble_layout = 
        {
            title: 'Bacterial Cultures per Sample',
            automargin:true,
            xaxis: {title: 'OTU ID'},
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font:{
                color: '#d7d7d7'
            }

        };
        //trace data for graph //
        var bubble_data = 
        [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            font:{
                color: '#ffffff'
            },
            marker: 
            {
              size: sample_values,
              color: otu_ids,
              colorscale: "Jet",
            }

          }];

        Plotly.newPlot("bubble", bubble_data, bubble_layout);
        // -----------------  END BUBBLE CHART  ----------------- //
    });
}
// ----------------- END CHART MAKER ----------------- //


        
// ----------------- HOME PAGE ----------------- //
// the app needs something to start with so the 'optionChanged' can then take place on patient_id change.
// see 14.3.10
        function start_up() 
    {
            // find the html div for the patient menu then load in the dataset
            var patient_menu = d3.select('#selDataset');

            d3.json(sample_data).then((data) => 
        {
            
            // build the patient id list from all patients //
            var names = data.names; 
            // https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-ind3 //

            // add an HTML element in drop down list for each patient in patient_list, populate entry with patient_data //
            names.forEach((sample_entry) => 
            {
                patient_menu
                .append('option')
                .property('value', sample_entry)
                .text(sample_entry);
            });
            // need info to start bubble and bar graphs //
            var starter_sample = names[0];
            read_data(starter_sample);
            chart_maker(starter_sample);
            

        });
    }
// ----------------- END HOME PAGE ----------------- //

// 6. Update all of the plots any time that a new sample is selected. //
function optionChanged(new_sample_entry) {
    read_data(new_sample_entry);
    chart_maker(new_sample_entry);
}

// run start up function to start up the functions //
start_up();