import axios from "axios";
import {useEffect, useState} from "react";

function FinanceNews() {
    const headerStyle = {
        textAlign: 'center',
        color: 'black',
        fontSize: '2em',
    }
    const articleStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        margin: '0 auto',
        borderBottom: '1px solid grey',
        fontFamily: 'Times New Roman',
    };
    const imageStyle = {
        width: '20%',
        marginRight: '10px',
        alignItems: 'flex-start',
        padding: '10px'
    };

    const textContainerStyle = {
        width: '110%',
    };

    const titleStyle = {
        color: 'black',
        fontSize: '1.1em',
        textDecoration: 'none'
    };

    const summaryStyle = {
        color: 'grey',
    };




    const [newsData, setNewsData] = useState([]);
    const url = 'http://localhost:9600/financial-news';
    console.log("finance news");
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
