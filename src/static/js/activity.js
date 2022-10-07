class ActivityRenderer{

    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/activities/";
    //constructor
    constructor(data){
        this.data = data;
        this.fetchData();
    }
    //async fetch, await response then call update
    async fetchData(){
        let response = await fetch(this.endpointURL);
        this.data = await response.json();
        this.updateUI();
        console.log(this.data)
    }
    //update ui elements
    updateUI(){
        //append data from function
        for(let dataIndex in this.data){
            let entry = this.data[dataIndex];
            activityRenderer.setActivityData(dataIndex);
        }
    }

    setActivityData(index) {
        let entry = this.data[index];
        $("#activity_type").text(entry.typeOfActivity);
        $("#activity_description").text(entry.descriptionOfActivity);
    }
}
var activityRenderer = new ActivityRenderer();