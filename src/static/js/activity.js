class ActivityRenderer{

    //endpoint url
    //endpointURL = "http://localhost:8080/api/v1/activities/";
    endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities";
    
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
        


        let target = $('#actExpand')

        let card = `<div  class="table-responsive">
        <table class="table text-start">
            <tr>
                <th>Description</th>
                <td>${this.data[0].descriptionOfActivity}</td>
            </tr>
            <tr>
                <th>Aktivitetens varighed</th>
                <td>${this.data[0].durationOfActivity}</td>
            </tr>
            <tr>
                <th>Max antal personer</th>
                <td>${this.data[0].maxAmountOfPeople}</td>
            </tr>
            <tr>
                <th>Aldersgrænse</th>
                <td>${this.data[0].minAge}</td>
            </tr>
            <tr>
                <th>Minimumshøjde</th>
                <td>${this.data[0].minHeight}</td>
            </tr>
            <tr>
                <th>Aktivitets begrænsninger</th>
                <td>${this.data[0].restrictionsOfActivity}</td>
            </tr>
        </table>
    </div>`;

    target.append(card);
    }

    setActivityData(index) {
        let entry = this.data[index];
        $("#activity_type").text(entry.typeOfActivity);
        $("#activity_description").text(entry.descriptionOfActivity);

    }
}
var activityRenderer = new ActivityRenderer();