'use strict'

/**
 * Acts as a rest server for the activities..
 */
// File O/I feature.
const fs = require('fs');
// Web server feature.
const express = require('express');
// CORS feature.
const cors = require('cors');
// Web server app instance.
const app = express();

// Used HTTP port numbers
const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 8080;

// Returns planets.
app.get('/api/v1/activities', cors(), (req, res) => createResponse('../json/activity.json', res));
app.get('/api/v1/reservations', cors(), (req, res) => createResponse('../json/reservation.json', res));

/**
 * Creates a response for a given local json file. 
 * @param {*} jsonFile 
 * @param {*} res 
 */
function createResponse(jsonFile, res) {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(jsonFile, 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log(JSON.stringify(json));
        res.json(json);
    })
}
// Start the HTTP server task.
app.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));