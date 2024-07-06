import React from "react";

function TopSellingItem({ item }) {
  return (
    <tr>
      <td>
        <a href="#" className="text-primary fw-bold">
          {item.strategy}
        </a>
      </td>
      <td>{item.company}</td>
      <td>{item.entryPrice}</td>
      <td>{item.exitPrice}</td>
      <td>${item.result.toLocaleString("en-US")}</td>
    </tr>
  );
}

export default TopSellingItem;
