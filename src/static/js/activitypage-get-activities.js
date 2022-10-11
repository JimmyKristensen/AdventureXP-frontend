'use strict'

class FrontpageActivityRenderer{
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/activities/";
    //endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities";
    
    //constructor
    constructor(data){
        this.data = data;
        this.fetchData();
    }
    //async fetch, await response then call update
    async fetchData(){
        let response = await fetch(this.endpointURL);
        this.data = await response.json();
        this.updateCardUI();
        console.table(this.data);
    }

    //update ui elements
    updateCardUI() {
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#activitiespage-card');

            let card = `
                <div class="card mb-4 px-0 border-black aktBox">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../static/media/${entry.pictureOfActivity}" class=" img-fluid aktImg" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body less-rounded-end bg-warning">
                                <h5 class="card-title">${entry.typeOfActivity}</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                    additional
                                    content. This content is a little bit longer.</p>
                                <div class="d-flex justify-content-end">
                                    <div class="d-inline-flex">
                                        <a href="aktivitet.html">
                                            <span class="bi bi-info-circle fa-lg"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            target.append(card);
        };
    }
}
var frontpageActivityRenderer = new FrontpageActivityRenderer();