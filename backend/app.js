require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const request = require("request");
const apiRequest = require("request");

const app = express();

app.use(cors());
app.use(express.json());



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
        console.log(apiResponse.data.articles);
        response.send(apiResponse.data.articles);
    }).catch(function (error) {
        console.error(error);
    });
})

app.get("/financial-news", (request, response) => {
    var options = {
        method: 'GET',
        url: 'https://www.alphavantage.co/query?',
        params: {
            function: 'NEWS_SENTIMENT',
            topics: 'finance',
            apikey: process.env.ALPHA_VANTAGE_API_KEY
        }
    };

    axios.request(options).then(function (apiResponse) {
        console.log(apiResponse.data);
        console.log(apiResponse.data.feed);
        response.send(apiResponse.data.feed);
    }).catch(function (error) {
        console.error(error);
    });
})

app.get("/technology-news", (request, response) => {
    var options = {
        method: 'GET',
        url: 'https://www.alphavantage.co/query?',
        params: {
            function: 'NEWS_SENTIMENT',
            topics: 'technology',
            apikey: process.env.ALPHA_VANTAGE_API_KEY
        }
    };

    axios.request(options).then(function (apiResponse) {
        console.log(apiResponse.data);
        console.log(apiResponse.data.feed);
        response.send(apiResponse.data.feed);
    }).catch(function (error) {
        console.error(error);
    });
})

app.get("/sports-news", (request, response) => {
    var options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {q: '*', lang: 'en', topic: 'sport'},
        headers: {
            'x-api-key': process.env.NEWSCATCHER_API_KEY
        }
    };
    axios.request(options).then(function (apiResponse) {
        console.log(apiResponse.data.articles);
        response.send(apiResponse.data.articles);
    }).catch(function (error) {
        console.error(error);
    });
})

app.get("/politics-news", (request, response) => {
    var options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {q: '*', lang: 'en', topic: 'politics'},
        headers: {
            'x-api-key': process.env.NEWSCATCHER_API_KEY
        }
    };
    axios.request(options).then(function (apiResponse) {
        console.log(apiResponse.data.articles);
        response.send(apiResponse.data.articles);
    }).catch(function (error) {
        console.error(error);
    });
})


app.listen(9600, () => {
    console.log(`Server is running on port 9600.`);
});

module.exports = app;
