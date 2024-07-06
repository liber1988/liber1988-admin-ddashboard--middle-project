import React from "react";
import Flag from "react-world-flags";

import countryCodeMapping from "../data/countryCodeMapping";

function NewsPostItem({ item }) {
  const truncateDescription = (description) => {
    return description.length > 50
      ? description.substring(0, 50) + "..."
      : description;
  };

  const countryCode =
    countryCodeMapping[item.country.replace(/\s/g, "_")] || "Unknown";

  return (
    <div className="post-item clearfix">
      {countryCode !== "Unknown" && (
        <Flag code={countryCode} className="country-flag" alt={item.country} />
      )}
      <h4>
        <a href="#">{item.title} </a>
      </h4>
      <p>{truncateDescription(item.description)}</p>
    </div>
  );
}

export default NewsPostItem;
