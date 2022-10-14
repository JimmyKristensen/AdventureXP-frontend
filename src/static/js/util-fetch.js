'use strict'

/**
 * ReservationRendererOperation class 
 * 
 * This class fetch data and can post/put/delete data with the method
 * operationData(endpointChoice, formData, id, methodType)
 * It takes endpointChoice, formData, id & methodType ->
 * 1) endpointChoice: taktes a string with 'activities' or 'TimeTableSlots' or 'customers' or 'reservations'.
 *      It then calls the method endpoints(endpointChoice) that will get the correct endpoint url.
 * 2) formData: the data that are submitted from the form.
 * 3) id: gives the endpointURL the number that is added to the end ex. the 1 is added to this url http://localhost:8080/api/v1/reservations/1.
 * 4) methodType: sets what method it is ex. "PUT"
 * 
 * And is have mehtod deleteReservation(id)
 * It calls an another method where it will show a pop-up to the user
 * with the options "Ok" and "Annuller". 
 * When selected it will recieve a boolean from the option if "Ok" true
 * And if it is "Ok" then deleteReservation(id) calls reservationOperationData('', id, "DELETE")
 * 
 * endpointURL = "http://localhost:8080/api/v1/reservations/"
 */
class UtilFetch {
    //constructor
    constructor(data) {
        this.data = data;
    }

    /**
     * The different choices:
     * 1) activities
     * 2) TimeTableSlots
     * 3) customers
     * 4) reservations
     * @param {*} endpointChoice 
     * @returns http://localhost:8080/api/v1/endpointChoice/
     */
    endpoints(endpointChoice) {
        //endpointURL = "http://localhost:8080/api/v1/reservations/";
        //endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/reservations/";
        if (endpointChoice == 'activities') {
            //return "http://localhost:8080/api/v1/activities/";
            return "https://adventurexp-backend.azurewebsites.net/api/v1/activities/";
        } else if (endpointChoice == 'TimeTableSlots') {
            //return "http://localhost:8080/api/v1/TimeTableSlots/";
            return "https://adventurexp-backend.azurewebsites.net/api/v1/TimeTableSlots/";
        } else if (endpointChoice == 'customers') {
            //return "http://localhost:8080/api/v1/customers/";
            return "https://adventurexp-backend.azurewebsites.net/api/v1/customers/";
        } else if (endpointChoice == 'reservations') {
            //return "http://localhost:8080/api/v1/reservations/";
            return "https://adventurexp-backend.azurewebsites.net/api/v1/reservations/";
        }
    }

    //async fetch, await response then call update
    async fetchData(endpointChoice, id) {
        try {
            let response = await fetch(this.endpoints(endpointChoice) + id);
            this.data = await response.json();
            console.log("Util fetchData");
            console.table(this.data);
            return this.data;
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${this.endpoints(endpointChoice)}.`);
        }
    }

    /**
     * async fetch, for Post, Put & delete
     * @param {*} endpointChoice 
     * @param {*} formData 
     * @param {*} id 
     * @param {*} methodType 
     */
    async operationData(endpointChoice, formData, id, methodType) {
        try {
            let response = await fetch(this.endpoints(endpointChoice) + id, {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            this.data = await response.json();
            console.log("Util operationData");
            console.table(this.data);
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed to send data to remote endpoint ${this.endpoints(endpointChoice) + id}.`);
        }
    }

    /**
     * Delete
     * @param {*} endpointChoice 
     * @param {*} id 
     */
    delete(endpointChoice, id) {
        if (this.confirmDelete()) {
            this.operationData(endpointChoice, '', id, 'DELETE');
            console.log('Delete was successful');
        } else {
            console.log('Delete was cancelled');
        }
    }

    confirmDelete() {
        return confirm('Er du sikker på du vil slette?');
    }
}

var utilFetch = new UtilFetch();