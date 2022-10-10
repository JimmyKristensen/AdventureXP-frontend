'use strict'

class ActivityRendererPost {
    //endpoint url
    //endpointURL = "http://localhost:8080/api/v1/activities/";
    endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities";
    //constructor
    constructor(data) {
        this.data = data;
    }
    //async fetch, await response then call update
    async postData(dataFromForm) {
        try {
            let response = await fetch(this.endpointURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataFromForm)
            });
            this.data = await response.json();
            console.table(this.data);
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed posting data to remote endpoint ${this.endpointUrl}.`);
        }
    }
}

var activityRendererPost = new ActivityRendererPost();
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const dataFromForm = Object.fromEntries(formData);
    activityRendererPost.postData(dataFromForm);
})
