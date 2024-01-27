require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const request = require("request");
const apiRequest = require("request");

const app = express();

app.use(cors());
app.use(express.json());

const countryCodes = {
    Afghanistan: "af",
    Albania: "al",
    Algeria: "dz",
    Angola: "ao",
    Argentina: "ar",
    Australia: "au",
    Austria: "at",
    Azerbaijan: "az",
    Bahrain: "bh",
    Bangladesh: "bd",
    Barbados: "bb",
    Belarus: "by",
    Belgium: "be",
    Bermuda: "bm",
    Bhutan: "bt",
    Bolivia: "bo",
    "Bosnia And Herzegovina": "ba",
    Brazil: "br",
    Brunei: "bn",
    Bulgaria: "bg",
    "Burkina Faso": "bf",
    Cambodia: "kh",
    Cameroon: "cm",
    Canada: "ca",
    "Cape Verde": "cv",
    "Cayman Islands": "ky",
    Chile: "cl",
    China: "cn",
    Colombia: "co",
    Comoros: "km",
    "Costa Rica": "cr",
    "Côte d'Ivoire": "ci",
    Croatia: "hr",
    Cuba: "cu",
    Cyprus: "cy",
    "Czech Republic": "cz",
    Denmark: "dk",
    Djibouti: "dj",
    Dominica: "dm",
    "Dominican Republic": "do",
    "DR Congo": "cd",
    Ecuador: "ec",
    Egypt: "eg",
    "El Salvador": "sv",
    Estonia: "ee",
    Ethiopia: "et",
    Fiji: "fj",
    Finland: "fi",
    France: "fr",
    "French Polynesia": "pf",
    Gabon: "ga",
    Georgia: "ge",
    Germany: "de",
    Ghana: "gh",
    Greece: "gr",
    Guatemala: "gt",
    Guinea: "gn",
    Haiti: "ht",
    Honduras: "hn",
    "Hong Kong": "hk",
    Hungary: "hu",
    Iceland: "is",
    India: "in",
    Indonesia: "id",
    Iraq: "iq",
    Ireland: "ie",
    Israel: "il",
    Italy: "it",
    Jamaica: "jm",
    Japan: "jp",
    Jordan: "jo",
    Kazakhstan: "kz",
    Kenya: "ke",
    Kuwait: "kw",
    Kyrgyzstan: "kg",
    Latvia: "lv",
    Lebanon: "lb",
    Libya: "ly",
    Lithuania: "lt",
    Luxembourg: "lu",
    Macau: "mo",
    Macedonia: "mk",
    Madagascar: "mg",
    Malawi: "mw",
    Malaysia: "my",
    Maldives: "mv",
    Mali: "ml",
    Malta: "mt",
    Mauritania: "mr",
    Mexico: "mx",
    Moldova: "md",
    Mongolia: "mn",
    Montenegro: "me",
    Morocco: "ma",
    Mozambique: "mz",
    Myanmar: "mm",
    Namibia: "na",
    Nepal: "np",
    Netherlands: "nl",
    "New Zealand": "nz",
    Niger: "ne",
    Nigeria: "ng",
    "North Korea": "kp",
    Norway: "no",
    Oman: "om",
    Pakistan: "pk",
    Panama: "pa",
    Paraguay: "py",
    Peru: "pe",
    Philippines: "ph",
    Poland: "pl",
    Portugal: "pt",
    "Puerto Rico": "pr",
    Romania: "ro",
    Russia: "ru",
    Rwanda: "rw",
    Samoa: "ws",
    "San Marino": "sm",
    "Saudi Arabia": "sa",
    Senegal: "sn",
    Serbia: "rs",
    Singapore: "sg",
    Slovakia: "sk",
    Slovenia: "si",
    "Solomon Islands": "sb",
    Somalia: "so",
    "South Africa": "za",
    "South Korea": "kr",
    Spain: "es",
    "Sri Lanka": "lk",
    Sudan: "sd",
    Sweden: "se",
    Switzerland: "ch",
    Syria: "sy",
    Taiwan: "tw",
    Tajikistan: "tj",
    Tanzania: "tz",
    Thailand: "th",
    Tonga: "to",
    Tunisia: "tn",
    Turkey: "tr",
    Turkmenistan: "tm",
    Uganda: "ug",
    Ukraine: "ua",
    "United Arab Emirates": "ae",
    "United Kingdom": "gb",
    "United States": "us",
    Uruguay: "uy",
    Uzbekistan: "uz",
    Venezuela: "ve",
    Vietnam: "vi",
    Yemen: "ye",
    Zambia: "zm",
    Zimbabwe: "zw",
};

app.get("/breaking-news", (request, response) => {
    var options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/latest_headlines',
        params: {lang: 'en'},
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

app.post("/country-news", (request, response) => {
    console.log(request.body.countryName);
    var options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {q: '*', lang: 'en', countries: countryCodes[request.body.countryName]},
        headers: {
            'x-api-key': process.env.NEWSCATCHER_API_KEY
        }
    };

    axios.request(options).then(function (apiResponse) {
        //console.log(apiResponse.data.articles);
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
