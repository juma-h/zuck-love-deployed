import React from "react";
import ImageNavTabs from "../Navtabs/ImageNavtabs";
import NavTabs from "../Navtabs/Navtabs";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CircleInfo from "../../assets/circle-info.svg";
import "../VariantDiv/variant.css";

const ImageVariant = ({
  campaignOptions,
  campaignFn,
  adsetOptions,
  adsetFn,
  adOptions,
  adFn,
  metricFn,
  metricOptions,
  tabs,
  tabContents,
  handleTabClick,
  activeTab,
  isLoading,
  launchTestFn,
  adName,
  adNameFn,
  isClicked,
  selectedCampaign,
  selectedAdset,
  fetchId,
  selectedAd,
  selectedMetric,
  now
}) => {
  return (
    <div className="row variant-div">
      <h5>Select Image to Test</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur. Convallis a luctus ultrices
        ipsum. Feugiat pulvinar mi nisl sit suspendisse sed aliquet.
        Pellentesque vel massa et mi. Ut nunc odio ipsum id habitant tincidunt
        sit arcu curabitur.
      </p>
      {/* select div below */}
      <div className="variant-select-div row">
        <div className="col-md-7 mt-5">
          <p className="select-label">Select the following details below:</p>
          <div className="row ">
            <div className="col-md-4">
              <select
                className="form-select select-css"
                aria-label="Campaign"
                onChange={campaignFn}
                value={selectedCampaign}
              >
                <option value="" disabled selected>
                  Choose Campaign
                </option>
                {campaignOptions}
              </select>
            </div>
            <div className="col-md-4">
              <select
                class="form-select select-css"
                aria-label="Adset"
                onChange={adsetFn}
                value={selectedAdset}
              >
                <option value="" disabled selected>
                  {" "}
                  Choose Adset
                </option>
                {adsetOptions}
              </select>
            </div>
            <div className="col-md-4">
              <select
                class="form-select select-css"
                aria-label="Ad"
                onChange={adFn}
                value={selectedAd}
              >
                <option value="" disabled selected>
                  Choose Ad
                </option>
                {adOptions}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-1">
          <hr className="vertical-hr" />
        </div>
        <div className="col-md-4 mt-5">
          <p className="select-label">Metric to optimize for:</p>
          <select
            class="form-select select-css"
            aria-label="Metric"
            onChange={metricFn}
            value={selectedMetric}
          >
            <option disabled selected value="">
              Metric
            </option>
            {metricOptions}
          </select>
          <small className="helper-text">
            <img src={CircleInfo} alt="" className="info-alt" /> <b>Tip:</b>{" "}
            Prioritize events with higher frequency for faster statistical
            significance.
          </small>
        </div>

        {/* percentage div below */}
        <div className="input-label">
          <h5>When should we consider these results significant?</h5>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>When you reach</span>
            <TextField
              id="standard-end-adornment"
              sx={{
                m: 1,
                width: "12ch",
                color: "blue",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#417ef2",
                    borderRadius: "6px",
                  },
                },
              }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span className="adorn-input"> % </span>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <span>
              , certainty, consider the results statistically significant.
            </span>
          </div>
          <div style={{ marginLeft: "110px" }}>
            <small className="helper-text">
              <img src={CircleInfo} alt="" className="info-alt" />
              <b>Tip:</b> 95% is considered standard
            </small>
          </div>
        </div>

        <hr className="horizontal-hr"></hr>
        {/* navtabs , results */}

        <ImageNavTabs
          tabs={tabs}
          tabContents={tabContents}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          isLoading={isLoading}
          fetchId={fetchId}
          now={now}
        />

        <div className="mt-5">
          <p style={{ textAlign: "left", fontSize: "20px" }}>New Ad Name</p>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Type something here"
              value={adName}
              onChange={adNameFn}
            />
          </div>
          <button
            className="btn btn-primary btn-bg launch-btn"
            onClick={launchTestFn}
            disabled={adName === ""}
          >
            {isClicked ? "Launching test ..." : "Launch Test"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageVariant;
