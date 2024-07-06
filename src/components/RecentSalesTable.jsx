import React from "react";

function RecentSalesTable({ items }) {
  const handleStatus = (status) => {
    switch (status) {
      case "Closed P":
        return "success";
      case "In process":
        return "warning";
      case "Closed L":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <table className="table table-borderless datatable">
      {console.log(items)}
      <thead className="table-light">
        <tr>
          <th scope="col">Company</th>
          <th scope="col">Ticker</th>
          <th scope="col">Strategy</th>
          <th scope="col">Trade Status</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <tr key={item.id}>
              <td>{item.company}</td>
              <td>{item.ticker}</td>
              <td>{item.strategy}</td>
              <td>
                <span className={`badge bg-${handleStatus(item.TradeStatus)}`}>
                  {item.TradeStatus}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default RecentSalesTable;
