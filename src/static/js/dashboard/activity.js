'use strict'

class ActivityRenderer {

    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/activities/";
    //endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities/";
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
        console.log("Image: " + $("input[name=pictureOfActivity]").val());
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#dash-card');

            let card = `
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm" style="max-width: 350px">
                        <div class="card-header py-3">
                            <div class="row row-cols-2">
                                <div class="col-9 col-xm-8 d-flex justify-content-center align-items-center">
                                    <h4 class="my-0 fw-normal">${entry.typeOfActivity}</h4>
                                </div>
                                <div class="col-2">
                                    <button type="button" 
                                        class="btn btn-md btn-danger btnid max-w-25" 
                                        value="${entry.activityId}" onclick="activityRendererPost.deleteActivity(this.value)">
                                        <i class="bi bi-trash fs-5"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" style="min-height: 280px;">
                            <h1 class="card-title pricing-card-title">${entry.priceOfActivity} DKK</h1>
                            <img src="../../static/media/${entry.pictureOfActivity}" class="card-img-top card-style" alt="..." height="150">
                            <div  class="table-responsive">
                                <table class="table text-start">
                                    <tr>
                                        <th>Description</th>
                                        <td>${entry.descriptionOfActivity}</td>
                                    </tr>
                                    <tr>
                                        <th>Aktivitetens varighed</th>
                                        <td>${entry.durationOfActivity}</td>
                                    </tr>
                                    <tr>
                                        <th>Max antal personer</th>
                                        <td>${entry.maxAmountOfPeople}</td>
                                    </tr>
                                    <tr>
                                        <th>Aldersgrænse</th>
                                        <td>${entry.minAge}</td>
                                    </tr>
                                    <tr>
                                        <th>Minimumshøjde</th>
                                        <td>${entry.minHeight}</td>
                                    </tr>
                                    <tr>
                                        <th>Aktivitets begrænsninger</th>
                                        <td>${entry.restrictionsOfActivity}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="w-100 btn btn-lg btn-primary btnid" value="${entry.activityId}" onclick="activityRendererPost.fetchData(this.value)" data-bs-toggle="modal" data-bs-target="#update-activity">Rediger</button>
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