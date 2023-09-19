import React, {useState, useEffect} from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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

  const [initialRender, setInitialRender] = useState(true);

  // useEffect(() => {
  //   // When isLoading becomes false, set initialRender to false
  //   if (!isLoading) {
  //     setInitialRender(false);
  //   }
  // }, [isLoading]);
  return (
    <div className="nav-tabs-container">
      <ul className="nav nav-pills nav-justified tab-buttons">
        {tabs.map((tab, index) => (
          <li className="nav-item variation-tab" key={index}>
            <button
              className={`nav-link ${
                activeTab === index ? "active" : "inactive"
              }`}
              onClick={() => handleTabClick(index)}
              disabled={fetchId === null}
            >
              <span
                style={{
                  fontWeight: 500,
                  // color: "#417ef2",
                  fontSize: "14px",
                }}
              >
                {tab}
              </span>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#417ef2",
                  animationDuration: "10000ms",
                }}
                size={80}
                thickness={3}
              />
              <p
                style={{
                  fontWeight: "bold",
                  color: "#417ef280",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
              >
                {`${now === null ? 0 : now}%`}...
              </p>
            </Box>
          </div>
        ) : (
          // Content display when not loading
          <div className="tab-content">
            {console.log("Tab contents after is loading false")}
            {console.log(tabContents)}
            {tabContents && tabContents.length > 0 && tabContents[activeTab] ? (
              
              // Check if tabContents has data
              typeof tabContents[activeTab].content === "string" ? (
                // Check if tabContents is a string
                tabContents[activeTab].content.endsWith(".png") ||
                tabContents[activeTab].content.endsWith(".jpg") ||
                tabContents[activeTab].content.endsWith(".jpeg") ||
                tabContents[activeTab].content.endsWith(".gif") ||
                tabContents[activeTab].content.endsWith(".svg") ? (
                  // If it's an image URL, display the image
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "1em",
                    }}
                  >
                    {console.log("Render an image tag")}
                    <img
                      src={tabContents[activeTab].content}
                      alt=""
                      style={{
                        width: "700px",
                        height: "500px",
                        maxWidth: "100%",
                      }}
                      onLoad={() => {
                        console.log("Loaded img tag for tab " + activeTab);
                      }}
                    />
                  </div>
                ) : (
                  // If it's not an image URL, display "Nothing to show"
                  "Nothing to show"
                )
              ) : (
                // If tabContents is not a string, display this message
                "Click to fetch variations after getting image id"
              )
            ) : (
              initialRender
                ? "Images will be shown here after fetching variations"
                : <p> Images are ready!🤩Click the buttons to load image variations</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageNavTabs;
