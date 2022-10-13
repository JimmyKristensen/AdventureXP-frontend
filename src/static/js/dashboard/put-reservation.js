'use strict'

// Reservation class
class PutReservationRenderer {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/reservations/";
    //endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/reservations/";

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
        document.getElementById("updateName").value = this.data.customer.name;
        document.getElementById("updateTlf").value = this.data.customer.tlf;
        document.getElementById("updateEmail").value = this.data.customer.email;

        //let date = new Date('2000-12-17T10:10:10');
        document.getElementById("updateDateOfTimeTableSlot").value = this.data.dateOfTimeTableSlot;
        document.getElementById("updateTimeslot").value = this.data.timeslot;
        document.getElementById("updateActivityId").value = this.data.activityId;
        document.getElementById("updateAmountOfPeople").value = this.data.amountOfPeople;
        document.getElementById("timeTableSlotId").value = this.data.timeTableSlot.timeTableSlotId;
        document.getElementById("customerId").value = this.data.customer.customerId;
        activityRenderer.fetchData();
    }

    //async fetch, for Post and Put
    async reservationOperationData(dataFromForm, id, methodType) {
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

    createReservation(dataFromForm, datacustomer, dataTimeTableSlot) {
        const reservation = new Map([
            ['amountOfPeople', dataFromForm.amountOfPeople],
            ['customer', datacustomer],
            ['timeTableSlot', dataTimeTableSlot]
        ]);
        const dataEntries = Object.fromEntries(reservation);
    
        this.reservationOperationData(dataEntries, '', 'PUT');
    }
}

class PutActivityRenderer{
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/activities/";
    //endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities/";

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
    }
    //update ui elements
    updateUI(){
        //append data from function
        for(let dataIndex in this.data){
            let entry = this.data[dataIndex];
            
            //let target = $('#activity-options')
            let target = $('#updateActivityId');

            let options = `<option value="${entry.activityId}">${entry.typeOfActivity}</option>`;

            target.append(options);
        }
    }
}

var putReservationRenderer = new PutReservationRenderer();
var putActivityRenderer = new PutActivityRenderer();

const formReservationPutEl = document.querySelector('#formReservationPut');

formReservationPutEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formReservationPutEl);
    const dataFromForm = Object.fromEntries(formData);

    // Making new entries so elements names are maching backend entries
    const entriesCustomer = new Map([
        ['customerId', dataFromForm.customerId]
    ]);
    const customerData = Object.fromEntries(entriesCustomer);
    const entriesTimeTableSlot = new Map([
        ['timeTableSlotId', dataFromForm.timeTableSlotId]
    ]);
    const timeTableSlotData = Object.fromEntries(entrieentriesTimeTableSlotsCustomer);

    
    reservationRendererOperation.createReservation(dataFromForm, customerData, timeTableSlotData);
})