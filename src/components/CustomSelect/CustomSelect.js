import React from "react";
import CircleInfo from "../../assets/circle-info.svg";

function CustomSelect({ label, defaultValue, onChange, options }) {
  return (
    <>
      <div className="variant-select-div row">
        <div className="col-md-6 mt-5">
          <p className="select-label">Select the following details below:</p>
          <div className="row ">

            <div className="col-md-4">
              <select
                className="form-select select-css"
                aria-label={label}
                defaultValue={defaultValue}
                onChange={onChange}
              >
                {options}
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
      </div>
    </>
  );
}

export default CustomSelect;
