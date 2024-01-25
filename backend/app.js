require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const request = require("request");
const apiRequest = require("request");

const app = express();

app.use(cors());
app.use(express.json());

function getCountryNews(countryName) {

}
function getBreakingNews() {

}
function getFinancialNews() {
}



app.post("/country-news", (request, response) => {
    console.log(request.body.countryName);
    var options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {q: '*', lang: 'en', countries: 'US'},
        headers: {
            'x-api-key': process.env.NEWSCATCHER_API_KEY
        }
    };

    axios.request(options).then(function (apiResponse) {
        console.log(apiResponse.data);
        response.send(apiResponse.data);
    }).catch(function (error) {
        console.error(error);
    });
})

app.get("/financial-news", (request, response) => {
    console.log("Financial News");
    'use strict';
    const apiRequest = require('request');
    const baseUrl = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT";
    const url = baseUrl + "&apikey=" + process.env.ALPHA_VANTAGE_API_KEY;
//    const url = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo";
    apiRequest.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            console.log(data.feed);
            response.send(data.feed);
        }
    });
})


app.listen(9600, () => {
    console.log(`Server is running on port 9600.`);
});

module.exports = app;
