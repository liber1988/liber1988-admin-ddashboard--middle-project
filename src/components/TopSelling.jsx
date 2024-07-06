import React, { useState, useEffect } from "react";
import "./topselling.css";
import CardFilter from "./CardFilter";
import TopSellingItem from "./TopSellingItem";
import { StrategyCompareData } from "../firebase/fetchingTradeData";

function TopSelling() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Today");
  const [showAll, setShowAll] = useState(false);

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setShowAll(false);
  };

  const fetchData = async () => {
    try {
      const processedData = await StrategyCompareData();
      const flattenedItems = processedData
        .flatMap((strategyGroup) => strategyGroup.data)
        .filter((trade) => {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          return new Date(trade.entryDate) >= oneYearAgo;
        });

      flattenedItems.sort(
        (a, b) => new Date(b.entryDate) - new Date(a.entryDate)
      );

      // Sort by profit descending and take the top results
      const sortedByProfit = flattenedItems.sort((a, b) => b.result - a.result);

      setItems(sortedByProfit);
    } catch (error) {
      console.error("Error fetching and processing trades data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const itemsToDisplay = showAll ? items : items.slice(0, 10);

  return (
    <div className="card top-selling overflow-auto">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body pb-0">
        <h5 className="card-title">
          Top trades <span>| {filter}</span>
        </h5>
        <table className="table table-borderless">
          <thead className="table-light">
            <tr>
              <th scope="col">Strategy</th>
              <th scope="col">Stock</th>
              <th scope="col">Buy</th>
              <th scope="col">Sold</th>
              <th scope="col">Profit</th>
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay &&
              itemsToDisplay.length > 0 &&
              itemsToDisplay.map((item) => (
                <TopSellingItem key={item.id} item={item} />
              ))}
          </tbody>
        </table>
        <div className="text-center mt-3">
          {items.length > 10 && (
            <button
              className="btn btn-primary"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "See Less" : "See More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopSelling;
