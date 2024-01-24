import axios from "axios";
import {useEffect, useState} from "react";

function FinanceNews() {
    const [newsData, setNewsData] = useState("");
    useEffect(() => {
        axios.get('http://localhost:8000/financial-news')
            .then(response => {
                setNewsData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function processArticle(article) {
        return (
            <div>
                <h1 ref={article.url}>{article.title}</h1>
                {article.summary}
            </div>
        )
    }


    return (
        <div>
            Finance News
            {newsData}
            {newsData.feed.map((article) => processArticle(article))}
        </div>
    )
}

export default FinanceNews;
