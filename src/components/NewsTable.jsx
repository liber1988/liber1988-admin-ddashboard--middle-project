import React from "react";
import "./newsTable.css";
import NewsTableItem from "./NewsTableItem";

const NewsTable = ({ news }) => {
  return (
    <ul className="news-list">
      {news.map((item, index) => (
        <NewsTableItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default NewsTable;
