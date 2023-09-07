import React, { useState } from "react";
import "./navtabs.css";

const NavTabs = ({ tabs, tabContents, handleTabClick, activeTab }) => {
  return (
    <div className="nav-tabs-container">
      <ul className="nav nav-pills nav-justified tab-buttons">
        {tabs.map((tab, index) => (
          <li className="nav-item variation-tab" key={index}>
            <a
              className={`nav-link ${
                activeTab === index ? "active" : "inactive"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(index);
              }}
              href="#"
            >
              <span>{tab}</span>
              <i className="fa-regular fa-circle-xmark fa-2xs close-icon"></i>
            </a>
          </li>
        ))}
      </ul>

      {/* Display the content based on the active tab */}
      <div className="tab-content-container">
        <div className="tab-content" style={{ whiteSpace: "pre-line" }}>
        {typeof tabContents === "string" ? (
          <div className="tab-content" style={{ whiteSpace: "pre-line" }}>
            {activeTab !== null ? (
              <>{tabContents}</>
            
            ) : (
              "xyzzz"
            )}
          </div>
        ) : (
          "xyzzz"
        )}
        </div>
      </div>
    </div>
  );
};

export default NavTabs;
