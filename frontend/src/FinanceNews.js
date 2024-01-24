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
        return (
            <div>
                <h5>
                    <a href={article.url}>{article.title}</a>
                </h5>
                {article.summary}
            </div>
        )
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
