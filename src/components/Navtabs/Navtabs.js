import React from "react";
import { MutatingDots } from "react-loader-spinner";
import "./navtabs.css";

const NavTabs = ({
  tabs,
  handleTabClick,
  activeTab,
  isLoading,
  tabContents,
  fetchId,
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
              disabled={fetchId === null || fetchId === ""}
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
          <div className="loading-container">
            <MutatingDots
              height={100}
              width={100}
              color="#417ef2"
              secondaryColor="#4fa94d"
              radius={12.5}
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p>Please wait, fetching variation...</p>
          </div>
        ) : (
          <div className="tab-content">
            {tabContents && tabContents!== null && typeof tabContents === "string"? (
              <div className="tab-content" style={{ whiteSpace: "pre-line" }}>
                {activeTab !== null ? (
                  <>{tabContents}</>
                ) : (
                  "Content"
                )}
              </div>
            ) : (
              "Variation content here after fetching variations"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavTabs;
