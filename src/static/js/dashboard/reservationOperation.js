'use strict'

// Reservation class
class ReservationRendererOperation {
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
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${this.endpointURL}.`);
        }
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
    
        this.reservationOperationData(dataEntries, '', 'POST');
    }

    deleteReservation(id) {
        if (this.sureUWantToDelete()) {
            this.reservationOperationData('', id, 'DELETE');
            console.log('Delete was successful');
        } else {
            console.log('Delete was cancelled');
        }
    }

    sureUWantToDelete() {
        return confirm('Er du sikker på du vil slette reservationen?');
    }
}

// Customer class
class CustomerRendererPost {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/customers/";

    //constructor
    constructor(data) {
        this.data = data;
        this.fetchData();
    }

    //async fetch, await response then call update
    async fetchData() {
        let response = await fetch(this.endpointURL);
        this.data = await response.json();
        //console.table(this.data);
    };

    //async fetch, await response then call update
    async customerOperationData(dataFromForm, id, methodType) {
        try {
            let response = await fetch(this.endpointURL + id, {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataFromForm)
            });
            this.data = await response.json();
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting/posting data to remote endpoint ${this.endpointURL}.`);
        }
    }

    getNewId() {
        const customer = new Map([
            ['customerId', this.data.customerId],
        ]);
        return Object.fromEntries(customer);
    }
}

// TimeTableSlots class
class TimeTableSlotsRendererOperation {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/TimeTableSlots/";

    //constructor
    constructor(data) {
        this.data = data;
        this.fetchData();
    }

    //async fetch, await response then call update
    async fetchData() {
        let response = await fetch(this.endpointURL);
        this.data = await response.json();
        console.table(this.data);
    };

    //async fetch, await response then call update
    async timeTableSlotOperationData(dataFromForm, id, methodType) {
        try {
            let response = await fetch(this.endpointURL + id, {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataFromForm)
            });
            this.data = await response.json();
            console.table("timeTableSlotId: " + this.data);
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting/posting data to remote endpoint ${this.endpointURL}.`);
        }
    }

    getNewId() {
        const timeTableSlot = new Map([
            ['timeTableSlotId', this.data.timeTableSlotId]
        ]);
        return Object.fromEntries(timeTableSlot);
    }
}


class ActivityRenderer{
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
            let target = $('#activityId');

            let options = `<option value="${entry.activityId}">${entry.typeOfActivity}</option>`;

            target.append(options);
        }
    }
}

var reservationRendererOperation = new ReservationRendererOperation();
var customerRendererPost = new CustomerRendererPost();
var timeTableSlotsRendererOperation = new TimeTableSlotsRendererOperation();
var activityRenderer = new ActivityRenderer();

const formCustomerPostEl = document.querySelector('#formCustomerPost');
const formTimeTableSlotPostEl = document.querySelector('#formTimeTableSlotPost');
const formReservationPostEl = document.querySelector('#formReservationPost');

// listening to when customer Post form get submitted
formCustomerPostEl.addEventListener('submit', event => {
    event.preventDefault();

    //customerRendererPost.fetchData();
    const formData = new FormData(formCustomerPostEl);
    const customerDataFromForm = Object.fromEntries(formData);
    customerRendererPost.customerOperationData(customerDataFromForm, '', 'POST');
})

// listening to when time table slot Post form get submitted
formTimeTableSlotPostEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formTimeTableSlotPostEl);
    const timeTableSlotDataFromForm = Object.fromEntries(formData);
    const activity = new Map([
        ['activityId', timeTableSlotDataFromForm.activityId],
    ]);
    const activityData = Object.fromEntries(activity);

    timeTableSlotDataFromForm.dateOfTimeTableSlot = timeTableSlotDataFromForm.dateOfTimeTableSlot.split('T')[0] + ' ' + timeTableSlotDataFromForm.timeslot;
    const timeTableSlot = new Map([
        ['dateOfTimeTableSlot', timeTableSlotDataFromForm.dateOfTimeTableSlot],
        ['activity', activityData]
    ]);
    const timeTableSlotData = Object.fromEntries(timeTableSlot);

    timeTableSlotsRendererOperation.timeTableSlotOperationData(timeTableSlotData, '', 'POST');
})

// listening to when reservation Post form get submitted
formReservationPostEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formReservationPostEl);
    const dataFromForm = Object.fromEntries(formData);
    reservationRendererOperation.createReservation(dataFromForm, customerRendererPost.getNewId(), timeTableSlotsRendererOperation.getNewId());
})