'use strict'

class ReservationRendererPost {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/reservations/";

    //constructor
    constructor(data) {
        this.data = data;
    }
    //async fetch, await response then call update
    async postData(id, methodType, dataFromForm) {
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

    deleteReservation(id) {
        if (this.sureUWantToDelete()) {
            this.postData('delete/'+id, 'DELETE', '');
            console.log('Delete was success');
        } else {
            console.log('Delete was cancelled');
        }
    }

    sureUWantToDelete() {
        return confirm('Er du sikker på du vil slette?');
    }
}

var reservationRendererPost = new ReservationRendererPost();