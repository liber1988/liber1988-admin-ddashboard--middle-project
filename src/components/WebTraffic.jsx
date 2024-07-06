import React, { useState, useEffect } from "react";
import WebTrafficChart from "./WebTrafficChart";
import CardFilter from "./CardFilter";
function WebTraffic() {
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body pb-0">
        <h5 className="card-title">
          Website Traffic <span>| {filter}</span>
        </h5>
        <WebTrafficChart />
      </div>
    </div>
  );
}
export default WebTraffic;
