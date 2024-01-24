const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

function getCountryNews(countryName) {

}
function getBreakingNews() {

}
function getFinancialNews() {
    'use strict';
    const request = require('request');
    const baseUrl = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT";
    const url = baseUrl + "&apikey=" + process.env.ALPHA_VANTAGE_API_KEY;

    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            console.log(data);
        }
    });
}



app.post("/countryNews", (request, response) => {
    console.log(request.body.countryName);
    response.send("Responded with: " + request.body.countryName);
})



app.listen(9600, () => {
    console.log(`Server is running on port 9600.`);
});

module.exports = app;
