'use strict'

class ActivityRendererPost {
    //endpoint url
    //endpointURL = "http://localhost:8080/api/v1/activities/";
    endpointURL = "https://adventurexp-backend.azurewebsites.net/api/v1/activities";
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

var activityRendererPost = new ActivityRendererPost();
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const dataFromForm = Object.fromEntries(formData);
    activityRendererPost.postData(dataFromForm);
})

/*
// URL
const api_post_url = "http://localhost:8080/api/v1/activities";
// Post
const formEl = document.querySelector('.form');
const inputs = document.querySelectorAll('#typeOfActivity, #pictureOfActivity');
//const inputs = document.querySelectorAll('#typeOfActivity, #durationOfActivity, #maintenanceOfActivity, #maxAmountOfPeople, #descriptionOfActivity, #pictureOfActivity, #priceOfActivity, #minAge, #minHeight, #restrictionsOfActivity');
formEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    fetch(api_post_url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                console.log("POST request successful");
            } else {
                console.log("POST request unsuccessful");
            }
            return res;
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

    inputs.forEach(input => {
        input.value = '';
    });
})*/

/*async function saveFile() {
    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    await fetch('/upload.php', {method: "POST", body: formData});
    alert('The file has been uploaded successfully!');
}*/

/*$('input#fileContainer').on('change', function () {
    console.log(this);

    var reader = new FileReader();
    reader.onload = function (e) {
        console.log(reader.result + '->' + typeof reader.result)
        var thisImage = reader.result;
        localStorage.setItem("imgData", thisImage);
        $("#pictureOfActivity").val(thisImage);
        document.getElementById('pictureOfActivity').innerHTML = thisImage;
        console.log(document.getElementById('pictureOfActivity').value + "Logger");
    };
    reader.readAsDataURL(this.files[0]);
});


$('input#show').click(function () {
    var dataImage = localStorage.getItem('imgData');
    console.log(dataImage);
    var imgCtr = $('<img/>').prop('src', dataImage);
    $('div#imgContainer').append(imgCtr);
});*/