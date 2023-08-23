import React, { useState } from "react";
import "./navtabs.css";

const NavTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = ["Variation 1 ", "Variation 2", "Variation 3", "Variation 4"];

  const tabContents = [
    `🚀Transform Your Health Journey Overseas with Ease! 🌍\n
  Are you tired of the daunting task of finding the right overseas doctor? Say goodbye to the struggle with Turkey's leading gastric sleeve surgery agency! We're more than just an agency; we're your personalized healthcare architects, building you an all-inclusive, custom-tailored medical journey. 💖\n
  🎯 Here's why we are your top choice:\n
  ✈️ Enjoy hassle-free round-trip flights\n
  🏨 Rest and relax in luxury 4-5 star hotels\n
  👩‍⚕️ Benefit from thorough pre and post-op consultations, designed to empower you with confidence\n
  🩹 Experience a comprehensive aftercare plan, giving you peace of mind during recovery\n
  But don't just trust us! 🗣️ Let the testimonies of our numerous satisfied patients speak for our commitment and exceptional service. 🌟\n
  Ready to redefine your healthcare experience? Simply tap 'Learn More' to commence your seamless, stress-free gastric sleeve surgery journey in Turkey. Your ideal doctor is just one click away! 👆💙`,
    "This is the content for variation 2.",
    "This is the content for variation 3.",
    "This is the content for variation 4.",
  ];

  return (
    <div className="nav-tabs-container">
      <ul className="nav nav-pills nav-justified tab-buttons">
        {tabs.map((tab, index) => (
          <li className="nav-item variation-tab" key={index}>
            <a
              className={`nav-link ${
                activeTab === index ? "active" : "inactive"
              }`}
              onClick={() => handleTabClick(index)}
              href
            >
              <span>{tab}</span>
              <i class="fa-regular fa-circle-xmark fa-2xs close-icon"></i>
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content-container">
        <textarea className="tab-content" readOnly>
          {tabContents[activeTab]}
        </textarea>
      </div>
    </div>
  );
};

export default NavTabs;
