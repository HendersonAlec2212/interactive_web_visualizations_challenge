# interactive_web_visualizations_challenge

# Intro

The purpose of this project was to use HTML, CSS, and JavaScript to dynamically display a database of information allowing users to alter which data is being actively displayed. This allows for rapid visualization of any data desired (from within the dataset).

# Data Set 

![samples.json](samples.json)

link to original study -> http://robdunnlab.com/projects/belly-button-biodiversity/

The data set was a collection of data point on the types of bacteria identified in the belly buttons of 153 individuals. The microbial species found also called operational taxonomic units, or OTUs, were present in almost 70% of people.

# Method

First an index.html document was created to act as the skeleton/homepage for the data being transformed through the app.js file.

Secondly the app.js was created and the samples.json file was read and printed to console as a means of testing viable file paths within the index.html. After the primary file paths were successful the next step was to construct the parameters needed for the Plotly graphs. The data was loaded, the variables for data objects were set and parsed to variables as needed for the Bar and Bubble Graphs.

I made the graph construction into one solid function after build each and noticing that I was passing the same information through two separate graphing functions. I feel this is important for systems running much larger data sets so that the information is only loaded once per query, I'm unsure of the time difference when loading or the performance change but I imagine it would have an affect.
Now that the graphing functions were assembled and layouts tailored I wanted a means of starting the page with the first instance of the sample.json patient ID. So I set up a function to load the names from the .json dataset and constructed a means of adding a text entry in the patient selection drop down menu for each instance of a name in the data.names array. This allows for the drop down menu to change according to the dataset and not need any adjustments.
Since this function would be running first, I included the main data call and plot building functions at the end so that everything would load at start up.
The last challenge was to assign a function to allow for the app to update the page/plots as the user changed the information via the drop down menu. This was accomplished by having an event execute when the user selects a new value from the drop down menu.

    <select id="selDataset" onchange="optionChanged(this.value)"></select>

The function 'optionChanged' in the app.js mimics the startup function and plugs the selected value into the read_data and chart_maker functions executing the application to load the new information, displays, and plotly graphs.

# Analysis
There was a small amount of data used in this assignment but the purpose was focused towards HTML & JS so this section will be more about analysis and thoughts pertaining to the languages used in this assignment.

HTML & JS are fantastic for displaying data that can be changed on a whim and appear beautifully. The plotly package is pretty awesome in allowing for so many visualizations to be made. I'm excited to mess around with it and make some truly beautiful data visualizations.

The languages themselves are a bit tricky at the moment, as a novice to JS and someone that started on python, some of the syntax and best practices give me pause. I routinely forget the semicolon after code blocks and I've had to to take things slow with the function building when using => to create in-line functions. I am still able to achieve what I want but as of now I have to build the core function in a block and then break it down to build the "simplified" version.

Locating all of the attributes and KWARGs needed to change the plots as desired was an unexpected challenge. The original documentation is incredibly vast and I didn't fully understand where to look for the information needed to teach myself how to alter the plots as I desired. Thankfully I was able to locate the information needed to create a dark-themed web page that is much easier on the eyes.


# Conclusion

Having information visualization change on the whim of the user is a fantastic and powerful tool. Seeing data portrayed in different styles allows for potentially unseen trends to emerge. More impressive is that these visualizations can be built around dynamic datasets allowing for the applications to change based on the amount of information present. Removing this restriction of having to match the points of the plots to the length(s) of the information sets being graphed is incredibly useful.
