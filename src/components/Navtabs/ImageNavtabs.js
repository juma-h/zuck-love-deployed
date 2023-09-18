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
          // Loading state
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
          // Content display when not loading
          <div className="tab-content">
            {console.log("Tab contents after is loading false")}
            {console.log(tabContents)}
            {tabContents && tabContents.length > 0 ? (
              // Check if tabContents has data
              typeof tabContents[activeTab]?.content === "string" ? (
                // Check if tabContents is a string
                tabContents[activeTab].content.endsWith(".png") ||
                tabContents[activeTab].content.endsWith(".jpg") ||
                tabContents[activeTab].content.endsWith(".jpeg") ||
                tabContents[activeTab].content.endsWith(".gif") ||
                tabContents[activeTab].content.endsWith(".svg") ? (
                  // If it's an image URL, display the image
                  <>
                  {console.log("Render an image tag")}
                  <img
                    src={tabContents[activeTab].content}
                    alt=""
                    style={{
                      width: "600px",
                      height: "500px",
                      maxWidth: "100%",
                      padding: "1em",
                    }}
                    onLoad={() => {console.log("Loaded img tag for tab " + activeTab)}}
                  />
                  </>
                ) : (
                  // If it's not an image URL, display "Nothing to show"
                  "Nothing to show"
                )
              ) : (
                // If tabContents is not a string, display this message
                "Click to fetch variations after getting image id"
              )
            ) : (
              // If tabContents is empty, display a message
              "No data available"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageNavTabs;
