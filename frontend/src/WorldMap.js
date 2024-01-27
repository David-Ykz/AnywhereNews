import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const WorldMap = () => {
    const mapRef = useRef(null);
    const [showNewsCard, setShowNewsCard] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const url = 'http://localhost:9600/country-news';

    const headerStyle = {
        textAlign: 'center',
        color: 'black',
        fontSize: '2em',
    };
    const articleStyle = {
        fontFamily: 'Times New Roman'
    };
    const titleStyle = {
        color: 'black',
        fontSize: '0.8em',
        textDecoration: 'none'
    };



    function getCountryFromLatLng(latlng) {
        let country = 'error';
        const api_key = process.env.REACT_APP_API_KEY;
        const geocodeUrl = `https://geocode.maps.co/reverse?lat=${latlng.lat}&lon=${latlng.lng}&api_key=${api_key}`;

        fetch(geocodeUrl)
            .then((response) => response.json())
            .then((data) => {
                if ('error' in data) {
                    console.log('Encountered error fetching country:');
                    console.log(data);
                } else {
                    console.log(data.address.country);
                    country = data.address.country;
                    getNewsForCountry(country);
                }
            });

        return country;
    }

    function getNewsForCountry(country) {
        axios
            .post(url, { countryName: country.toString() })
            .then((response) => {
                console.log(response.data);
                setNewsData(response.data);
                setShowNewsCard(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        // Create a Leaflet map
        mapRef.current = L.map('map').setView([0, 0], 2);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png', {
            attribution: '&copy;',
        }).addTo(mapRef.current);

        mapRef.current.on('click', function (e) {
            const latlng = e.latlng;
            console.log('Clicked at:', latlng.lat, latlng.lng);
            getCountryFromLatLng(latlng);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []); // useEffect runs only once on mount

    const handleCloseNewsCard = () => {
        setShowNewsCard(false);
    };

    function processArticle(article) {
        return (
            <div style={articleStyle}>
                <h3>
                    <a href={article.link} style={titleStyle}>
                        {article.title}
                    </a>
                </h3>
                <p style={{ fontStyle: 'italic' }}>{article.author} | {article.published_date}</p>
                <hr />
            </div>
        );
    }

    return (
        <div>
            {/* eslint-disable-next-line no-restricted-globals */}
            <div id="map" style={{ height: screen.height }}></div>

            <div style={showNewsCard ? cardStyle : { display: 'none' }}>
                <Button variant="outline-dark" style={closeButtonStyle} onClick={handleCloseNewsCard}>
                    X
                </Button>
                <Container style={{ paddingTop: '50px' }}>
                    <h2 className="mt-3">Country News</h2>
                    {newsData.map((article) => processArticle(article))}
                </Container>
            </div>
        </div>
    );
};

const cardStyle = {
    position: 'fixed',
    top: '56px', // Adjust this value based on your header height
    right: 0,
    height: 'calc(100% - 56px)', // Adjust the height accordingly
    width: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Slightly transparent white background
    zIndex: 1000,
    overflowY: 'auto',
    padding: '20px',
};


const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
};

export default WorldMap;
