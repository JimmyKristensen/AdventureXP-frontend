'use strict'

class ActivityRendererOperation {

    //constructor
    constructor(data) {
        this.data = data;
        this.getData();
    }

    async getData() {
        this.data = await utilFetch.fetchData('activities', '');
        this.updateUI();
    }

    //update ui elements
    updateUI() {
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#dash-card');

            let card = `
                <div class="col" id="activity${entry.activityId}">
                    <div class="card mb-4 rounded-3 shadow-sm" style="max-width: 350px">
                        <div class="card-header py-3">
                            <div class="row row-cols-2">
                                <div class="col-9 col-xm-8 d-flex justify-content-center align-items-center">
                                    <h4 class="my-0 fw-normal">${entry.typeOfActivity}</h4>
                                </div>
                                <div class="col-2">
                                    <button type="button" 
                                        class="btn btn-md btn-danger btnid max-w-25" 
                                        value="${entry.activityId}" onclick="activityRendererOperation.deleteActivity(this.value)">
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
                            <button type="button" class="w-100 btn btn-lg btn-primary btnid" value="${entry.activityId}" onclick="activityRendererOperation.getDataToForm(this.value)" data-bs-toggle="modal" data-bs-target="#update-activity">Rediger</button>
                        </div>
                    </div>
                </div>`;

            target.append(card);
        };
    }

    async getDataToForm(id) {
        this.data = await utilFetch.fetchData('activities', id);
        this.updateUIFormula();
    }

    //update ui elements
    updateUIFormula() {
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

    deleteActivity(id) {
        utilFetch.delete('activities', id);
        $('#activity' + id).remove();
    }
}

var activityRendererOperation = new ActivityRendererOperation();

const formPostEl = document.querySelector('#formPost');
const formPutEl = document.querySelector('#formPut');

// listening to when Post form get submitted
formPostEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formPostEl);
    const dataFromForm = Object.fromEntries(formData);
    dataFromForm.pictureOfActivity = $("input[name=pictureOfActivity]:checked").val();
    utilFetch.operationData('activities', dataFromForm, '', 'POST');
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
    utilFetch.operationData('activities', PutData, parseInt(dataFromForm.updateID), 'PUT');
})