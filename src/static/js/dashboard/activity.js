'use strict'

class ActivityRenderer {

    //endpoint url
    //endpointURL = "http://localhost:8080/api/v1/activities/";
    endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities";
    //constructor
    constructor(data) {
        this.data = data;
        this.fetchData();
    }
    //async fetch, await response then call update
    async fetchData() {
        try {
            let response = await fetch(this.endpointURL);
            this.data = await response.json();
            console.table(this.data);
            this.updateUI();
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${this.endpointUrl}.`);
        }
    }
    //update ui elements
    updateUI() {
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#dash-card');

            let card = `
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm" style="max-width: 350px">
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal">${entry.typeOfActivity}</h4>
                        </div>
                        <div class="card-body" style="min-height: 280px;">
                            <h1 class="card-title pricing-card-title">${entry.priceOfActivity} DKK</h1>
                            <ul class="list-unstyled mt-3 mb-4">
                                <li><img src="../../static/media/${entry.pictureOfActivity}" class="card-img-top" alt="..." height="150"></li>
                                <li>${entry.descriptionOfActivity}</li>
                                <li>${entry.durationOfActivity} minutter</li>
                                <li>Max. ${entry.maxAmountOfPeople} person(er)</li>
                                <li>${entry.minAge}</li>
                                <li>${entry.minHeight}</li>
                                <li>${entry.restrictionsOfActivity}</li>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="w-100 btn btn-lg btn-primary">Rediger (Lav modal pop-up)</button>
                        </div>
                    </div>
                </div>`;

            target.append(card);
        };
    }

    imageChoice() {
        
    }
}
var activityRenderer = new ActivityRenderer();