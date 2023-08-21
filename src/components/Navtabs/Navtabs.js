import React, { useState } from "react";
import "./navtabs.css";

const NavTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    "Variation 1 ",
    "Variation 2",
    "Variation 3",
    "Variation 4"
  ];

  const tabContents = [
    "This is the content for Variation 1.",
    "This is the content for variation 2.",
    "This is the content for variation 3.",
    "This is the content for variation 4."
  ];

  return (
    <div className="nav-tabs-container">
      <ul className="nav nav-pills nav-justified tab-buttons">
        {tabs.map((tab, index) => (
          <li className="nav-item variation-tab" key={index}>
            <button
              className={`nav-link ${activeTab === index ? "active" : "inactive"}`}
              onClick={() => handleTabClick(index)}
            >
              {tab} <i class="fa-regular fa-circle-xmark fa-2xs"></i>
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content-container">
        <div className="tab-content">
          <p>
            {tabContents[activeTab]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavTabs;
