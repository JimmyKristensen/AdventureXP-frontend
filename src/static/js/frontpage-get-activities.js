'use strict'

class FrontpageActivityRenderer{
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
        this.updateCardUI();
        console.table(this.data);
    }

    //update ui elements
    updateCardUI() {
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#frontpage-card');

            let card = `
                <div class="col d-flex justify-center">
                    <div class="card h-100 container_foto">
                        <a href="html/aktivitet.html">
                            <img src="../static/media/${entry.pictureOfActivity}" class="card-img-top" alt="..." height="150">
                            <div class="ver_mas text-center">
                                <span class="bi bi-info-circle d-flex align-self-center justify-center"></span>
                            </div>
                            <article class="text-left">
                                <h2 class="card-title">${entry.typeOfActivity}</h2>
                            </article>
                        </a>
                    </div>
                </div>`;

            target.append(card);
        };
    }
}
var frontpageActivityRenderer = new FrontpageActivityRenderer();