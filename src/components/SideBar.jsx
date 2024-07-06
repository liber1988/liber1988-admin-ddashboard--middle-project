import React from "react";
import { Link } from "react-router-dom";
import "./sideBar.css";
import navList from "../data/navitem";
function SideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="side-nav">
        <li className="nav-item"> ...</li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-menu-button-wide"></i>{" "}
            <span>Macro Economics</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="./Macrotable">
                <i className="bi bi-circle"></i>{" "}
                <span>Bussiness Cycles Table</span>
              </Link>
            </li>

            <li>
              <Link to="./IndustryTable">
                <i className="bi bi-circle"></i>{" "}
                <span>Industry performance</span>
              </Link>
            </li>
            <li>
              <a
                href="https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-circle"></i>{" "}
                <span>FED rates expectations</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Tables</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/mainpage">
                <a href="#">
                  <i className="bi bi-circle"></i> <span>Trading Diary</span>
                </a>
              </Link>
            </li>
          </ul>
        </li>
        {/* <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#charts-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-bar-chart"></i>
            <span>Charts</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="charts-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Charts.js</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>ApexCharts</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Trades Diary</span>
              </a>
            </li>
          </ul>
        </li> */}

        <li className="nav-heading">Pages</li>
        {navList.map((nav) => (
          <Link to={`/${nav.name}`}>
            <li className="nav-item" key={nav.id}>
              <a className="nav-link collapsed" href="#">
                <i className={nav.icon}></i>
                <span>{nav.name}</span>
              </a>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
