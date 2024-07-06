import React from "react";
import Report from "./Report";
import Cards from "./Cards";
import "./dashboard.css";
import RecentSales from "./RecentSales";
import TopSelling from "./TopSelling";
import RecenyActivity from "./RecenyActivity";
import BudgetReport from "./BudgetReport";
import WebTraffic from "./WebTraffic";
import News from "./News";

function Dashboard() {
  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <Cards />
            <div className="col-12">
              <Report />
            </div>
            <div className="col-12">
              <RecentSales />
            </div>
            <div className="col-12">
              <TopSelling />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <News />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
