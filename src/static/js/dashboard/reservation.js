'use strict'

class ReservationRenderer {

    //endpoint url
    //endpointURL = "http://localhost:8080/api/v1/reservations/";
    endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/reservations";
    
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

            let table = `
                <tr>
                    <td>${entry.timeTableSlot.activity.activityId}</td>
                    <td>${entry.timeTableSlot.activity.typeOfActivity}</td>
                    <td>${entry.customer.name}</td>
                    <td>${entry.timeTableSlot.activity.durationOfActivity}</td>
                    <td>${entry.amountOfPeople}</td>
                    <td>
                        <button onclick="putReservationRenderer.fetchData(this.value)" 
                            value="${entry.reservationId}" 
                            data-bs-toggle="modal"
                            data-bs-target="#edit-reservation">Edit
                        </button>
                        <button
                            onclick="reservationRendererPost.deleteReservation(this.value)" 
                            value="${entry.reservationId}">Slet
                        </button>
                    </td>
                </tr>`  ;

            target.append(table);

        }
    }
}
var reservationRenderer = new ReservationRenderer();