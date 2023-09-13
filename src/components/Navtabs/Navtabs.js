import React from "react";
import { MutatingDots } from "react-loader-spinner";
import "./navtabs.css";

const NavTabs = ({
  tabs,
  handleTabClick,
  activeTab,
  isLoading,
  tabContents,
}) => {
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
                    padding: "1em"         
                  }}
                />
              </div>
              
              ) : (
                <div className="tab-content">
                         {activeTab !== null ? (
                  <>{tabContents}</>
                ) : (
                  "Nothing to show yet"
                )}
                </div>
              )
            ) : (
              <div className="tab-content" style={{ whiteSpace: "pre-line" }}>
                {activeTab !== null ? (
                  <>{tabContents}</>
                ) : (
                  "Nothing to show yet"
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavTabs;
