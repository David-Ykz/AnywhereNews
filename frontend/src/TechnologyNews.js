import axios from "axios";
import {useEffect, useState} from "react";

export function TechnologyNews() {
    const [newsData, setNewsData] = useState([]);
    const url = 'http://localhost:9600/technology-news';
    console.log("technology news");
    console.log(newsData);
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response);
                console.log()
                setNewsData(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    function processArticle(article) {
        // Excluded because banner images take up too much space
        // or there are too many results from that source
        const excludedSources = ["Benzinga", "Motley Fool"];
        if (article.banner_image === null || (excludedSources.indexOf(article.source) !== -1)) {
            return;
        }
        return (
            <div style={articleStyle}>
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

//    {typeof newsData !== 'undefined' ? newsData.feed.map((article) => processArticle(article)): ""}

    return (
        <div>
            <h1 style={headerStyle}>Finance News</h1>
            {newsData.map(article => processArticle(article))}
        </div>
    )
}

export default FinanceNews;
