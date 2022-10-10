'use strict'

class ReservationRenderer {

    //endpoint url
    //endpointURL = "http://localhost:8080/api/v1/reservations/";
    endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/reservations/";
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
        this.updateUI();
    };
    //update ui elements
    updateUI() {
        //append data from function
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#tb-activities');

            let table = `<tr>
                <td>${entry.activityId}</td>
                <td>${entry.typeOfActivity}</td>
                <td>${entry.name}</td>
                <td>${entry.durationOfActivity}</td>
                <td>${entry.maxAmountOfPeople}</td>
                <td>
                <a class="btn sm">Edit</a>
                <a class="btn sm">Delete</a>
                </td>
                </tr>`;

            target.append(table);

        }
    }
}
var reservationRenderer = new ReservationRenderer();