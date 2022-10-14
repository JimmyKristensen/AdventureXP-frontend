'use strict'

// Reservation class
class ReservationRendererOperation {

    //constructor
    constructor(data) {
        this.data = data;
        this.getReservations();
    }
    //async fetch, await response then call update
    async getReservations() {
        this.data = await utilFetch.fetchData('reservations', '');
        this.updateUI();
    }

    //update ui elements
    updateUI() {
        //append data from function
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#tb-reservation');
            let table = `
                <tr id="reservations${entry.reservationId}">
                    <td>${entry.timeTableSlot.activity.activityId}</td>
                    <td>${entry.timeTableSlot.activity.typeOfActivity}</td>
                    <td>${entry.customer.name}</td>
                    <td>${entry.timeTableSlot.activity.durationOfActivity}</td>
                    <td>${entry.amountOfPeople}</td>
                    <td>
                        <button onclick="reservationRendererOperation.getDataToForm(this.value)" 
                            value="${entry.reservationId}" 
                            data-bs-toggle="modal"
                            data-bs-target="#edit-reservation">Edit
                        </button>
                        <button
                            onclick="reservationRendererOperation.deleteReservation(this.value)" 
                            value="${entry.reservationId}">Slet
                        </button>
                    </td>
                </tr>`;
            target.append(table);
        }
    }

    async getDataToForm(id) {
        this.data = await utilFetch.fetchData('reservations', id);
        this.updateUIFormula();
    }

    //update ui elements
    updateUIFormula() {
        document.getElementById("updateName").value = this.data.customer.name;
        document.getElementById("updateTlf").value = this.data.customer.tlf;
        document.getElementById("updateEmail").value = this.data.customer.email;

        //let date = new Date('2000-12-17T10:10:10');
        document.getElementById("updateDateOfTimeTableSlot").value = this.data.timeTableSlot.dateOfTimeTableSlot.split(" ")[0];
        document.getElementById("updateTimeslot").value = this.data.timeTableSlot.dateOfTimeTableSlot.split(" ")[1];
        document.getElementById("updateActivityId").value = this.data.timeTableSlot.activity.activityId;
        document.getElementById("updateAmountOfPeople").value = this.data.amountOfPeople;
        document.getElementById("timeTableSlotId").value = this.data.timeTableSlot.timeTableSlotId;
        document.getElementById("customerId").value = this.data.customer.customerId;
        document.getElementById("reservationId").value = this.data.reservationId;
    }

    createReservation(dataFromForm, datacustomer, dataTimeTableSlot, methodType) {
        const reservation = new Map([
            ['reservationId', dataFromForm.reservationId],
            ['amountOfPeople', dataFromForm.amountOfPeople],
            ['customer', datacustomer],
            ['timeTableSlot', dataTimeTableSlot]
        ]);
        const reservationsData = Object.fromEntries(reservation);

        utilFetch.operationData('reservations', reservationsData, '', methodType);
    }

    deleteReservation(id) {
        utilFetch.delete('reservations', id);
        $('#reservations' + id).remove();
    }
}

// Customer class
class CustomerRendererPost {
    // Use for the newest customer
    customerNew;

    //constructor
    constructor() {
        this.data = utilFetch.fetchData('customers', '');
    }

    getNewId() {
        const customer = new Map([
            ['customerId', this.customerNew.customerId],
        ]);
        return Object.fromEntries(customer);
    }
}

// TimeTableSlots class
class TimeTableSlotsRendererOperation {
    // Use for the newest TimeTableSlot
    timeTableSlotsNew;

    //constructor
    constructor() {
        this.data = utilFetch.fetchData('TimeTableSlots', '');
    }

    getNewId() {
        const timeTableSlot = new Map([
            ['timeTableSlotId', this.timeTableSlotsNew.timeTableSlotId]
        ]);
        return Object.fromEntries(timeTableSlot);
    }
}


class ActivityRenderer {

    //constructor
    constructor(data) {
        this.data = data;
        this.getData();
    }
    //async fetch, await response then call update
    async getData() {
        this.data = await utilFetch.fetchData('activities', '');
        this.updateUI();
    }

    //update ui elements
    updateUI() {
        //append data from function
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            //let target = $('#activityId');
            let target = $('select[name="activityId"]');

            let options = `<option value="${entry.activityId}">${entry.typeOfActivity}</option>`;

            target.append(options);
        }
    }
}

var reservationRendererOperation = new ReservationRendererOperation();
var customerRendererPost = new CustomerRendererPost();
var timeTableSlotsRendererOperation = new TimeTableSlotsRendererOperation();
var activityRenderer = new ActivityRenderer();

/* Listener to POST */
const formCustomerPostEl = document.querySelector('#formCustomerPost');
const formTimeTableSlotPostEl = document.querySelector('#formTimeTableSlotPost');
const formReservationPostEl = document.querySelector('#formReservationPost');

// listening to when customer Post form get submitted
formCustomerPostEl.addEventListener('submit', event => {
    event.preventDefault();

    //customerRendererPost.fetchData();
    const formData = new FormData(formCustomerPostEl);
    const customerDataFromForm = Object.fromEntries(formData);

    utilFetch.operationData('customers', customerDataFromForm, '', 'POST');
})

// listening to when time table slot Post form get submitted
formTimeTableSlotPostEl.addEventListener('submit', event => {
    event.preventDefault();
    customerRendererPost.customerNew = utilFetch.data;

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

    utilFetch.operationData('TimeTableSlots', timeTableSlotData, '', 'POST');
})

// listening to when reservation Post form get submitted
formReservationPostEl.addEventListener('submit', event => {
    event.preventDefault();
    timeTableSlotsRendererOperation.timeTableSlotsNew = utilFetch.data;
    const formData = new FormData(formReservationPostEl);
    const dataFromForm = Object.fromEntries(formData);
    reservationRendererOperation.createReservation(dataFromForm, customerRendererPost.getNewId(), timeTableSlotsRendererOperation.getNewId(), 'POST');
})


/* Listener to PUT */
const formReservationPutEl = document.querySelector('#formReservationPut');

formReservationPutEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formReservationPutEl);
    const dataFromForm = Object.fromEntries(formData);

    // Making new entries so elements names are maching backend entries
    const entriesCustomer = new Map([
        ['customerId', dataFromForm.customerId],
        ['name', dataFromForm.name],
        ['tlf', dataFromForm.tlf],
        ['email', dataFromForm.email]
    ]);
    dataFromForm.dateOfTimeTableSlot = dataFromForm.dateOfTimeTableSlot.split("T")[0] + ' ' + dataFromForm.timeslot;
    const customerData = Object.fromEntries(entriesCustomer);
    const entriesTimeTableSlot = new Map([
        ['timeTableSlotId', dataFromForm.timeTableSlotId],
        ['dateOfTimeTableSlot', dataFromForm.dateOfTimeTableSlot],
        ['isReserved', putReservationRenderer.data.timeTableSlot.isReserved],
        ['activity', putReservationRenderer.data.timeTableSlot.activity]
    ]);
    const timeTableSlotData = Object.fromEntries(entriesTimeTableSlot);

    reservationRendererOperation.createReservation(dataFromForm, customerData, timeTableSlotData, 'PUT');
    //putReservationRenderer.createReservation(dataFromForm, putReservationRenderer.data.customer, putReservationRenderer.data.timeTableSlot);
})