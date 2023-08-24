import React, { useState } from "react";
import "./navtabs.css";
import image from "../../assets/Fab_-_Keak_north_cool_inc 1.png";

const NavTabs = ({ tabs, tabContents }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

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
              href
            >
              <span>{tab}</span>
              <i className="fa-regular fa-circle-xmark fa-2xs close-icon"></i>
            </a>
          </li>
        ))}
      </ul>
      {/* change view according to type of */}

      <div className="tab-content-container">
        {typeof tabContents[activeTab] === "string" &&
        (tabContents[activeTab].endsWith(".png") ||
          tabContents[activeTab].endsWith(".jpg") ||
          tabContents[activeTab].endsWith(".jpeg") ||
          tabContents[activeTab].endsWith(".gif") ||
          tabContents[activeTab].endsWith(".svg")) ? (
          <div className="tab-content">
            <img src={tabContents[activeTab]} alt=""  style={{width: "90%", height:"90%", padding:"1em"}}/>
          </div>
        ) : (
          <div className="tab-content" style={{ whiteSpace: "pre-line" }}>
            {typeof tabContents[activeTab] === "string"
              ? tabContents[activeTab]
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavTabs;
