import React from "react";
import "../VariantDiv/variant.css";
import NavTabs from "../Navtabs/Navtabs";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CircleInfo from "../../assets/circle-info.svg";

const HeadlinesVariant = () => {

  const tabs = ["Variation 1 ", "Variation 2", "Variation 3", "Variation 4"];
  const tabContents = [
    `🚀Transform Your Health Journey Overseas with Ease! 🌍`,
    "This is the content for variation 2.",
    "This is the content for variation 3.",
    "This is the content for variation 4.",
  ];
  return (
    <div className="row variant-div">
      <h5>Select Headline to Test</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur. Convallis a luctus ultrices
        ipsum. Feugiat pulvinar mi nisl sit suspendisse sed aliquet.
        Pellentesque vel massa et mi. Ut nunc odio ipsum id habitant tincidunt
        sit arcu curabitur.
      </p>
      {/* select div below */}
      <div className="variant-select-div row">
        <div className="col-md-6 mt-5">
          <p className="select-label">Select the following details below:</p>
          <div className="row ">
            <div className="col-md-4">
              <select class="form-select  select-css" aria-label="Select 1">
                <option selected>Campaign</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-md-4">
              <select class="form-select select-css" aria-label="Select 2">
                <option selected>Adset</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-md-4">
              <select class="form-select select-css" aria-label="Select 3">
                <option selected>Ad</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-1">
          <hr className="vertical-hr" />
        </div>
        <div className="col-md-5 mt-5">
          <p className="select-label">Metric to optimize for:</p>
          <select class="form-select select-css" aria-label="Select 3">
            <option selected>Outbound CTR</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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

        <NavTabs tabs={tabs} tabContents={tabContents}/>

        {/* launch test div */}
        <div className="mt-5">
          <p style={{ textAlign: "left", fontSize: "20px" }}>New Ad Name</p>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Type something here"
            />
          </div>
          <button className="btn btn-primary btn-bg launch-btn">
            Launch Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadlinesVariant;
