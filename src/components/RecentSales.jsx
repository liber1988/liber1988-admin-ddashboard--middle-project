import React, { useState, useEffect } from "react";
import "./recentsales.css";
import RecentSalesTable from "./RecentSalesTable";
import CardFilter from "./CardFilter";
import { StrategyCompareData } from "../firebase/fetchingTradeData";

function RecentSales() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Today");
  const [showAll, setShowAll] = useState(false);

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setShowAll(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedData = await StrategyCompareData();

        const flattenedItems = processedData.flatMap(
          (strategyGroup) => strategyGroup.data
        );
        flattenedItems.sort(
          (a, b) => new Date(b.entryDate) - new Date(a.entryDate)
        );
        setItems(flattenedItems);
      } catch (error) {
        console.error("Error fetching and processing trades data:", error);
      }
    };

    fetchData();
  }, [filter]);

  const itemsToDisplay = showAll ? items : items.slice(0, 10);

  return (
    <div className="card recent-sales overflow-auto">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Recent Trades <span>| {filter}</span>
        </h5>
        <RecentSalesTable items={itemsToDisplay} />
        {items.length > 10 && (
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSales;
