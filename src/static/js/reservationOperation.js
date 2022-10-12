'use strict'

/**
 * ReservationRendererOperation class 
 * 
 * This class fetch data and can post/put/delete data with the method
 * reservationOperationData(dataFromForm, id, methodType)
 * It takes dataFromForm, id, methodType ->
 * 1) dataFromForm: the data that are submitted from the form.
 * 2) id: gives the endpointURL the number that is added to the end ex. the 1 is added to this url http://localhost:8080/api/v1/reservations/1.
 * 3) methodType: sets what method it is ex. "PUT"
 * 
 * Is also have mehtod createReservation(dataFromForm, datacustomer, dataTimeTableSlot)
 * It takes dataFromForm, datacustomer, dataTimeTableSlot ->
 * 1) dataFromForm: the data that are submitted from the form.
 * 2) datacustomer: needs customer data with existing id
 * 3) dataTimeTableSlot: needs timeTableSlot data with existing id
 * 
 * And is have mehtod deleteReservation(id)
 * It calls an another method where it will show a pop-up to the user
 * with the options "Ok" and "Annuller". 
 * When selected it will recieve a boolean from the option if "Ok" true
 * And if it is "Ok" then deleteReservation(id) calls reservationOperationData('', id, "DELETE")
 * 
 * endpointURL = "http://localhost:8080/api/v1/reservations/"
 */
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

/**
 * CustomerRendererOperation class 
 * 
 * This class fetch data and can post/put/delete data with the method
 * customerOperationData(dataFromForm, id, methodType)
 * It takes dataFromForm, id, methodType ->
 * 1) dataFromForm: the data that are submitted from the form.
 * 2) id: gives the endpointURL the number that is added to the end ex. the 1 is added to this url http://localhost:8080/api/v1/customers/1.
 * 3) methodType: sets what method it is ex. "POST"
 * 
 * endpointURL = "http://localhost:8080/api/v1/customers/"
 */
class CustomerRendererOperation {
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

/**
 * TimeTableSlotsRendererOperation class 
 * 
 * This class fetch data and can post/put/delete data with the method
 * timeTableSlotOperationData(dataFromForm, id, methodType)
 * It takes dataFromForm, id, methodType ->
 * 1) dataFromForm: the data that are submitted from the form.
 * 2) id: gives the endpointURL the number that is added to the end ex. the 1 is added to this url http://localhost:8080/api/v1/TimeTableSlots/1.
 * 3) methodType: sets what method it is ex. "POST"
 * 
 * endpointURL = "http://localhost:8080/api/v1/TimeTableSlots/"
 */
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

/**
 * ActivityRenderer class
 * 
 * This class Fetch data and then update tag "select" with options 
 * from existing activities and sets the options value to the activities id
 * 
 * endpointURL = "http://localhost:8080/api/v1/activities/"
 */
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
        let response = await fetch(this.endpointURL);
        this.data = await response.json();
        this.updateUI();
    }
    //update ui elements
    updateUI() {
        //append data from function
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            //let target = $('#activity-options')
            let target = $('#activityId');

            let options = `<option value="${entry.activityId}">${entry.typeOfActivity}</option>`;

            target.append(options);
        }
    }
}

/**
 * ShowHideAndValid class
 * 
 * This class have method that check if inputs are filled out or not
 * and if inputs are filled then show the next formula and hide the one that are filled
 */
 class ShowHideAndValid {
    validThenHideCustomerFormula() {
        var isEmpty = false;
        var firstName = document.forms["formCustomerPost"]["firstName"].value;
        var lastName = document.forms["formCustomerPost"]["lastName"].value;
        var phonenumber = document.forms["formCustomerPost"]["phonenumber"].value;
        var email = document.forms["formCustomerPost"]["email"].value;

        if (firstName == '' || lastName == '' || phonenumber == '' || email == '') {
            console.log("Please fill the input!");
            isEmpty = true;
        } else {
            showHideAndValid.hideFormula(isEmpty);
        }
    }

    validThenHideActivityFormula() {
        var isEmpty = false;
        $('#activitiesFormulaSubmit').each(function () {
            $('input[type=date]:required' || 'select:required').each(function () {
                if ($(this).val() === '') {
                    console.log("Please fill the input?");
                    isEmpty = true;
                } else {
                    console.log("Valid?");
                    showHideAndValid.hideFormula(isEmpty);
                }
            });
        });
    }

    hideFormula(isEmpty) {
        var customersFormula = document.getElementById("customersFormula");
        var activitiesFormula = document.getElementById("activitiesFormula");
        var reservationsFormula = document.getElementById("reservationsFormula");

        if (!isEmpty && activitiesFormula.style.display !== "block") {
            customersFormula.style.display = "none";
            reservationsFormula.style.display = "none";
            activitiesFormula.style.display = "block";
        } else if (!isEmpty && activitiesFormula.style.display === "block" && reservationsFormula.style.display !== "block") {
            activitiesFormula.style.display = "none";
            reservationsFormula.style.display = "block";
        }
    }
}


var reservationRendererOperation = new ReservationRendererOperation();
var customerRendererOperation = new CustomerRendererOperation();
var timeTableSlotsRendererOperation = new TimeTableSlotsRendererOperation();
var activityRenderer = new ActivityRenderer();
var showHideAndValid = new ShowHideAndValid();


const formCustomerPostEl = document.querySelector('#formCustomerPost');
const formTimeTableSlotPostEl = document.querySelector('#formTimeTableSlotPost');
const formReservationPostEl = document.querySelector('#formReservationPost');

// listening to when customer Post form get submitted
formCustomerPostEl.addEventListener('submit', event => {
    event.preventDefault();

    //customerRendererPost.fetchData();
    const formData = new FormData(formCustomerPostEl);
    const customerDataFromForm = Object.fromEntries(formData);
    const customerEntries = new Map([
        ['name', (customerDataFromForm.firstName + ' ' + customerDataFromForm.lastName)],
        ['tlf', customerDataFromForm.phonenumber],
        ['email', customerDataFromForm.email]
    ]);
    const customerData = Object.fromEntries(customerEntries);
    customerRendererOperation.customerOperationData(customerData, '', 'POST');
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
    reservationRendererOperation.createReservation(dataFromForm, customerRendererOperation.getNewId(), timeTableSlotsRendererOperation.getNewId());
})