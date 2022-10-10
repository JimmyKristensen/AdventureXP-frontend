'use strict'

class ReservationRendererPost {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/reservations/";
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

class CustomerRendererPost {
    //endpoint url
    endpointURL = "http://localhost:8080/api/v1/customers/";
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

var reservationRendererPost = new ReservationRendererPost();
var customerRendererPost = new CustomerRendererPost();
const formEl = document.querySelector('#go-cart-reservation');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const dataFromForm = Object.fromEntries(formData);
    reservationRendererPost.postData(dataFromForm);
    customerRendererPost.postData(dataFromForm);
})
