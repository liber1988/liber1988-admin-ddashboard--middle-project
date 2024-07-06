import { useState, useEffect } from "react";
import "./news.css";
import axios from "axios";
import NewsTable from "../components/NewsTable";

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const api_key = "a0cd95ddbac041c:d6jzm35vwxdwda0";
        const response = await axios.get(
          `https://api.tradingeconomics.com/news?c=${api_key}&f=json`
        );
        const sortedNews = response.data.sort(
          (a, b) => b.importance - a.importance
        );
        setNews(sortedNews);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container-news">
      <h1>Trading Economics News</h1>
      <NewsTable news={news} />
    </div>
  );
};
export default NewsPage;
