var appID = "3f298489e458740182dca3f9cdabb85f"; // app_id assigned by Bandsintown.com
new Vue({
    el: '#container', // Binding root element with Vue.js to manage the content within
    data () {         
        return {
    	   artist_name: "",            // {
    	   name: "",                   //
           facebook_page_url: "#",     //
    	   thumbnail:"#",              // 
    	   upcoming_events: 0,         // Initializing object with inital element values
           events:[],                  //
           found: false,               //
           error:false,                //   
           loading:false               // }
        }
    },
    filters: {  // a date filter to return date as day and month e.g. 21, Feb
        getDate (datetime) { 
            var months = ["Jan","Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // A months list to match with from API
            var extract_date = datetime.split("T")[0]; // Spliting date and time
            var split_date = extract_date.split("-"); // Further splitting the date into months, days, and year
            var month = months[parseInt(split_date[1]-1)]; // Matching month number with Months name
            return split_date[2] + ", " + month; // Returning date as day and month e.g. 21, Feb
        }
    },
    methods: { // This function is invoked when search button is pressed or enter is pressed in the search form
    	validate: async function(event) { // this function is being asynchrously to so that http API called within may get completed  
            if(event) {
                    event.preventDefault(); // Disabling default behaviour of search form otherwise page would relaod when data is submitted
                }
            this.events = [];                  // {
            this.name = "";                    //
            this.thumbnail = "#";              //
            this.facebook_page_url = "#";      // Resetting elements values to default on every submission
            this.upcoming_events = 0;          //
            this.found = false;                //
            this.error = false;                // }
            this.loading = true;               // Display loading button while api call is being made
            this.artist_name = this.artist_name.trim();
            if(this.artist_name == "") {
                this.error = true;
                this.error_message = "Input value can not be empty.";
                this.loading = false;
            }
            else {
                await axios                        // Using Axios to call the api to find the entered artist name. This call awaits for the response before the rest of the code can be executed.
        		.get('https://rest.bandsintown.com/artists/'+this.artist_name+'?app_id='+appID) 
        		.then(response => {
                        if(response.data == "" || response.data.error) { // Display the error if api call yields no results
                            this.error = true;
                            this.error_message = "No artist found.";
                        }
                        else { // Set element values, if api yields results
                            this.name = response.data.name; // Set artist name
                            this.thumbnail = response.data.thumb_url; // Set Artist profile image
                            this.facebook_page_url = response.data.facebook_page_url; // Set Artist Facebook page link
                            this.upcoming_events = response.data.upcoming_event_count; // Set the number of upcoming events
                            this.found = true;  // Set the flag to true so that data can be displayed on the frontend
                        }
                    })
                .catch(error => {           // Throw error if api call returns critcal error or not working
                    console.log(error);     // log technical error in the browser console for developer diagnoses
                    this.error = true;
                    this.error_message = "Something went wrong. Please check your input value and also please make sure the internet it working ";
                })
                .finally(() => this.loading = false) // Stop displaying the loading button
                if(this.upcoming_events) { // Look for events' details, if artist have upcoming events
                    axios
                    .get('https://rest.bandsintown.com/artists/'+this.artist_name+'/events/?app_id='+appID)
                    .then(response => (this.events = response.data))
                    .catch(error => {
                        console.log(error) // Intended for developer to diagnose, if call for events throw any error
                    })
                }
            }
    	}
    }
})