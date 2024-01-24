import axios from "axios";
import {useEffect, useState} from "react";

function FinanceNews() {
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
    console.log(newsData);

    function processArticle(article) {

        const articleStyle = {
            display: 'flex',
            alignItems: 'center',
            width: '90%',
            margin: '0 auto',
            borderBottom: '1px solid grey',
            padding: '10px',
            fontFamily: 'Times New Roman',
        };
        const imageStyle = {
            width: '10%',
            marginRight: '10px',
        };

        const textContainerStyle = {
            width: '80%',
        };

        const titleStyle = {
            color: 'black',         // Set the desired color
            fontSize: '1.2em',
            marginBottom: '5px',
            textDecoration: 'none', // Remove underline
            display: 'inline-block', // Prevent the underline gap
        };

        const summaryStyle = {
            color: 'grey',
        };

        if (article.banner_image === null) {
            return;
        }
        return (
            <div key={article.url} style={articleStyle}>
                    <img src={article.banner_image} alt="Article" style={imageStyle} />
                <div style={textContainerStyle}>
                    <h1 style={titleStyle}>
                        <a href={article.url}>
                            {article.title}
                        </a>
                    </h1>
                    <p style={summaryStyle}>{article.summary}</p>
                </div>
            </div>
        );

    }

//    {typeof newsData !== 'undefined' ? newsData.feed.map((article) => processArticle(article)): ""}

    return (
        <div>
            Finance News
            {newsData.map(article => processArticle(article))}
        </div>
    )
}

export default FinanceNews;
