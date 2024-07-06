import React from "react";
import "./newsTableItem.css";

const NewsTableItem = ({ item }) => {
  const trading = "https://tradingeconomics.com/";

  const getImportanceLabel = (importance) => {
    switch (importance) {
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <li className={`news-item importance-${item.importance}`}>
      <div className="news-header">
        <h2>{item.title}</h2>
        <span className="importance-label">
          {getImportanceLabel(item.importance)}
        </span>
      </div>
      <p className="date">{new Date(item.date).toLocaleString()}</p>
      <p className="description">{item.description}</p>
      <a
        href={trading + item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="read-more"
      >
        Read more
      </a>
    </li>
  );
};

export default NewsTableItem;
