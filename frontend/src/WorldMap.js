import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import countriesData from 'world-geojson';

const WorldMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        // Create a Leaflet map
        mapRef.current = L.map('map').setView([0, 0], 2);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png', {
            attribution: '&copy;'
        }).addTo(mapRef.current);

        mapRef.current.on('click', function (e) {
            // Get the latitude and longitude and log them
            var latlng = e.latlng;
            console.log('Clicked at:', latlng.lat, latlng.lng);
            const api_key = "65aca52d443c4951628278kypb80dc0";
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
                    }
                });
        });

        return () => {
            // Cleanup on component unmount
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
