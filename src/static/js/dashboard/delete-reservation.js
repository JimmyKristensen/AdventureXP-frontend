'use strict'

class ReservationRendererPost {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/reservations/";

    //constructor
    constructor(data) {
        this.data = data;
    }
    //async fetch, await response then call update
    async postData(id) {
        try {
            let response = await fetch(this.endpointURL+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
                redirect: 'follow'
            });
            this.data = await response.json();
            console.table(this.data);
        } catch (error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed posting data to remote endpoint ${this.endpointUrl}.`);
        }
    }
}

var reservationRendererPost = new ReservationRendererPost();

function deleteFunction(id) {
    reservationRendererPost.postData(id);
    return confirm('Er du sikker på du vil slette?');
}
