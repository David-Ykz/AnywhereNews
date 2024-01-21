import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";

const WorldMap = () => {
    const mapRef = useRef(null);

    function getCountryFromLatLng(latlng) {
        var country = "error";
        const api_key = process.env.REACT_APP_API_KEY;
        const url = "https://geocode.maps.co/reverse?lat=" + latlng.lat + "&lon=" + latlng.lng + "&api_key=" + api_key;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Process data
                if ("error" in data) {
                    console.log("Encountered error fetching country:");
                    console.log(data);
                } else {
                    console.log(data.address.country);
                    country = data.address.country;
                }
            });
        return country;
    }

    function getNewsForCountry(country) {
        axios.get('http://localhost:8000/api/world/')
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.log("Encountered Error Fetching News: ")
                console.log(error);
            });
    }

    useEffect(() => {
        // Create a Leaflet map
        mapRef.current = L.map('map').setView([0, 0], 2);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png', {
            attribution: '&copy;'
        }).addTo(mapRef.current);

        mapRef.current.on('click', function (e) {
            const latlng = e.latlng;
            console.log('Clicked at:', latlng.lat, latlng.lng);
            const country = getCountryFromLatLng(latlng);
            getNewsForCountry(country);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };

    }, []); // useEffect runs only once on mount

    return (
        <div id="map" style={{ height: '500px' }}></div>
    );
};

export default WorldMap;
