import axios from "axios";
import React, {useEffect, useState} from "react";
import {headerStyle, AVArticleStyle, NCArticleStyle, imageStyle, textContainerStyle, titleStyle, summaryStyle} from "./styles.js";

function processAVArticle(article) {
    // Excluded because banner images take up too much space
    // or there are too many results from that source
    const excludedSources = ["Benzinga", "Motley Fool"];
    if (article.banner_image === null || (excludedSources.indexOf(article.source) !== -1)) {
        return;
    }
    return (
        <div style={AVArticleStyle}>
            <img src={article.banner_image} alt="Article" style={imageStyle} />
            <div style={textContainerStyle}>
                <a style={titleStyle} href={article.url}>{article.title}</a>
                <p style={summaryStyle}>
                    <div style={{ fontStyle: 'italic' }}>{article.authors[0]} | {article.source}</div>
                    {article.summary}
                </p>
            </div>
        </div>
    );
}

function processNCArticle(article) {
    const MAX_SUMMARY_LENGTH = 2000
    if (article.summary.length > MAX_SUMMARY_LENGTH) {
        return;
    }
    return (
        <div style={NCArticleStyle}>
            <a href={article.link} style={titleStyle}>{article.title}</a>
            <p style={{ fontStyle: 'italic' }}>{article.author} | {article.published_date}</p>
            <p style={summaryStyle}>{article.summary}</p>
        </div>
    );
}

export function DisplayFinanceNews() {
    const [newsData, setNewsData] = useState([]);
    const url = 'http://localhost:9600/financial-news';
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response);
                setNewsData(response.data);
            })
            .catch(error => {console.log(error);});
    }, []);

    return (
        <div>
            <h1 style={headerStyle}>Finance News</h1>
            {newsData.map(article => processAVArticle(article))}
        </div>
    )
}

export function DisplayTechnologyNews() {
    const [newsData, setNewsData] = useState([]);
    const url = 'http://localhost:9600/technology-news';
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response);
                setNewsData(response.data);
            })
            .catch(error => {console.log(error);});
    }, []);

    return (
        <div>
            <h1 style={headerStyle}>Technology News</h1>
            {newsData.map(article => processAVArticle(article))}
        </div>
    )
}

export function DisplaySportsNews() {
    const [newsData, setNewsData] = useState([]);
    const url = 'http://localhost:9600/sports-news';
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response);
                setNewsData(response.data);
            })
            .catch(error => {console.log(error);});
    }, []);

    return (
        <div>
            <h1 style={headerStyle}>Sports News</h1>
            {newsData.map(article => processNCArticle(article))}
        </div>
    )
}

export function DisplayPoliticsNews() {
    const [newsData, setNewsData] = useState([]);
    const url = 'http://localhost:9600/politics-news';
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response);
                setNewsData(response.data);
            })
            .catch(error => {console.log(error);});
    }, []);

    return (
        <div>
            <h1 style={headerStyle}>Politics News</h1>
            {newsData.map(article => processNCArticle(article))}
        </div>
    )
}
