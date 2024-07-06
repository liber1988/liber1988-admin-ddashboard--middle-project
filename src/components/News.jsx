import React, { useState, useEffect } from "react";
import "./news.css";
import CardFilter from "./CardFilter";
import NewsPostItem from "./NewsPostItem";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("Today");
  const [showAll, setShowAll] = useState(false);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const api_key = "a0cd95ddbac041c:d6jzm35vwxdwda0";
        const response = await axios.get(
          `https://api.tradingeconomics.com/news?c=${api_key}&f=json&limit=100&start=250`
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

  const displayedNews = showAll ? news : news.slice(0, 5);

  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body pb-0">
        <h5 className="card-title">
          News &amp; Updates <span>| {filter}</span>
        </h5>
        <div className="news">
          {news &&
            news.length > 0 &&
            displayedNews.map((item) => (
              <NewsPostItem key={item.id} item={item} />
            ))}
        </div>
        {news.length > 5 && (
          <div className="show-more" onClick={handleShowMore}>
            {showAll ? "Show Less" : "Show More"}
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
