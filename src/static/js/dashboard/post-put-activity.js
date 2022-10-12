'use strict'

class ActivityRendererPost {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/activities/";
    //endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities/";
    //constructor
    constructor(data) {
        this.data = data;
    }

    //async fetch, await response then call update
    async fetchData(id) {
        try {
            let response = await fetch(this.endpointURL + id);
            this.data = await response.json();
            console.table(this.data);
            this.updateUI();
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${this.endpointURL}.`);
        }
    }

    //update ui elements
    updateUI() {
        console.log('updateUI ' + this.data.typeOfActivity);
        document.getElementById("updateID").value = this.data.activityId;
        document.getElementById("updateTypeOfActivity").value = this.data.typeOfActivity;
        document.getElementById("updateDurationOfActivity").value = this.data.durationOfActivity;
        document.getElementById("updateMaintenanceOfActivity").value = this.data.maintenanceOfActivity;
        document.getElementById("updateMaxAmountOfPeople").value = this.data.maxAmountOfPeople;
        document.getElementById("updateDescriptionOfActivity").value = this.data.descriptionOfActivity;
        document.getElementById("updatePictureOfActivity").value = this.data.pictureOfActivity;
        document.getElementById("updatePriceOfActivity").value = this.data.priceOfActivity;
        document.getElementById("updateMinAge").value = this.data.minAge;
        document.getElementById("updateMinHeight").value = this.data.minHeight;
        document.getElementById("updateRestrictionsOfActivity").value = this.data.restrictionsOfActivity;
    }

    //async fetch, for Post and Put
    async activityOperationData(dataFromForm, id, methodType) {
        try {
            let response = await fetch(this.endpointURL + id, {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataFromForm),
                redirect: window.location.reload()
            });
            this.data = await response.json();
            console.table(this.data);
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed posting data to remote endpoint ${this.endpointURL + id}.`);
        }
    }

    deleteActivity(id) {
        if (this.sureUWantToDelete()) {
            this.activityOperationData('', id, 'DELETE');
            console.log('Delete was successful');
        } else {
            console.log('Delete was cancelled');
        }
    }

    sureUWantToDelete() {
        return confirm('Er du sikker på du vil slette aktiviten?');
    }
}

var activityRendererPost = new ActivityRendererPost();

const formPostEl = document.querySelector('#formPost');
const formPutEl = document.querySelector('#formPut');

// listening to when Post form get submitted
formPostEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formPostEl);
    const dataFromForm = Object.fromEntries(formData);
    dataFromForm.pictureOfActivity = $("input[name=pictureOfActivity]:checked").val();
    activityRendererPost.activityOperationData(dataFromForm, '', 'POST');
})

// listening to when Put form get submitted
formPutEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formPutEl);
    // Have Data from form but elements name are not maching entries data yet
    const dataFromForm = Object.fromEntries(formData);
    // Making new entries so elements names are maching backend entries
    const entries = new Map([
        ['activityId', dataFromForm.updateID],
        ['typeOfActivity', dataFromForm.updateTypeOfActivity],
        ['durationOfActivity', dataFromForm.updateDurationOfActivity],
        ['maintenanceOfActivity', dataFromForm.updateMaintenanceOfActivity],
        ['maxAmountOfPeople', dataFromForm.updateMaxAmountOfPeople],
        ['descriptionOfActivity', dataFromForm.updateDescriptionOfActivity],
        ['pictureOfActivity', dataFromForm.updatePictureOfActivity],
        ['priceOfActivity', dataFromForm.updatePriceOfActivity],
        ['minAge', dataFromForm.updateMinAge],
        ['minHeight', dataFromForm.updateMinHeight],
        ['restrictionsOfActivity', dataFromForm.updateRestrictionsOfActivity]
    ]);
    const PutData = Object.fromEntries(entries);
    activityRendererPost.activityOperationData(PutData, parseInt(dataFromForm.updateID), 'PUT');
})