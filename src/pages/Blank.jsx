import "./blank.css";
import React from "react";

const BlankSection = () => {
  return (
    <div className="blank-section">
      <h2 className="section-title">Market Overview</h2>
      <div className="market-news">
        <h3>Latest Market News</h3>
        <ul>
          <li>Stock XYZ hits new high amid strong earnings report</li>
          <li>Global markets rally as economic indicators improve</li>
          <li>Federal Reserve signals potential interest rate changes</li>
        </ul>
      </div>
      <div className="economic-indicators">
        <h3>Key Economic Indicators</h3>
        <ul>
          <li>GDP Growth: 3.2%</li>
          <li>Inflation Rate: 2.1%</li>
          <li>Unemployment Rate: 4.5%</li>
        </ul>
      </div>
      <div className="portfolio-overview">
        <h3>Portfolio Overview</h3>
        <p>Total Value: $150,000</p>
        <p>Today's Gain: +$2,500 (1.7%)</p>
        <p>Top Performer: Stock ABC +5.2%</p>
      </div>
    </div>
  );
};

export default BlankSection;
