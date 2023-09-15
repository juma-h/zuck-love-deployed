import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./navtabs.css";

const ImageNavTabs = ({
  tabs,
  handleTabClick,
  activeTab,
  isLoading,
  tabContents,
  fetchId,
  now,
}) => {
  return (
    <div className="nav-tabs-container">
      <ul className="nav nav-pills nav-justified tab-buttons">
        {tabs.map((tab, index) => (
          <li className="nav-item variation-tab" key={index}>
            <button
              className={`nav-link ${
                activeTab === index ? "active" : "inactive"
              }`}
              onClick={(e) => {
                if (fetchId === "") {
                  e.preventDefault(); // Prevent the click event if fetchId is empty
                } else {
                  handleTabClick(index);
                }
              }}
              href
              disabled={fetchId === ""}
            >
              <span>{tab}</span>
              <i className="fa-regular fa-circle-xmark fa-2xs close-icon"></i>
            </button>
          </li>
        ))}
      </ul>

      {/* Display the content based on the active tab */}
      <div className="tab-content-container">
        {isLoading ? (
          <div className="loading-container">
            <ProgressBar
              style={{ width: "100%" }}
              animated
              variant="info"
              now={now}
              label={`${now}%`}
            />
          </div>
        ) : (
          <div className="tab-content">
            {typeof tabContents === "string" ? (
              tabContents.endsWith(".png") ||
              tabContents.endsWith(".jpg") ||
              tabContents.endsWith(".jpeg") ||
              tabContents.endsWith(".gif") ||
              tabContents.endsWith(".svg") ? (
                <div className="tab-content">
                  <img
                    src={tabContents}
                    alt=""
                    style={{
                      width: "90%",
                      height: "90%",
                      maxWidth: "100%",
                      padding: "1em",
                    }}
                  />
                </div>
              ) : (
                "Nothing to show"
              )
            ) : (
             "Click to fetch variations after getting image id"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageNavTabs;
