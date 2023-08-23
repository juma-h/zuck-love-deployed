import React from "react";
import "./variant.css";
import NavTabs from "../Navtabs/Navtabs";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const VariantDiv = () => {
  return (
    <div className="row variant-div">
      <h5>Select Headlines to Test</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur. Convallis a luctus ultrices
        ipsum. Feugiat pulvinar mi nisl sit suspendisse sed aliquet.
        Pellentesque vel massa et mi. Ut nunc odio ipsum id habitant tincidunt
        sit arcu curabitur.
      </p>
      <div className="variant-select-div row">
        <div className="col-md-7 mt-5">
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
        <div className="col-md-4 mt-5">
          <p className="select-label">Metric to optimize for:</p>
          <select class="form-select select-css" aria-label="Select 3">
            <option selected>Outbound CTR</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <small className="helper-text">
            <b>Tip:</b>Events that get fired the most will reach statistically
            significance faster.
          </small>
        </div>
        {/* <div className="input-label">
          <h5>When should we consider these results significant?</h5>
          <p style={{ display: "flex", alignItems: "center" }}>
            When you reach
            <TextField
              id="standard-end-adornment"
              sx={{ m: 1, width: "12ch" }}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              helperText="Tip: 95% is considered standard"
              variant="outlined"
              style={{ "--helper-text-width": "300px" }}
            />
            
            certainty, consider the results statistically significant.
          </p>
      
        </div> */}
        <div className="input-label">
          <h5>When should we consider these results significant?</h5>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>When you reach</span>
            <TextField
              id="standard-end-adornment"
              sx={{ m: 1, width: "12ch" }}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              variant="outlined"
            />
            <span>
              , certainty, consider the results statistically significant.
            </span>
          </div>
          <div style={{ marginLeft: "110px" }}>
            <small className="helper-text"> 
            <i class="fa-solid fa-circle-info"></i>
             <b>Tip:</b> 95% is considered standard
            </small>
          </div>
        </div>

        <hr className="horizontal-hr"></hr>

        <NavTabs />
        <div className="mt-5">
          <p style={{textAlign:"left", fontSize:"20px"}}>New Ad Name</p>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Type something here"
            />
          </div>
          <button className="btn btn-primary btn-bg launch-btn">Launch Test</button>
        </div>
      </div>
    </div>
  );
};

export default VariantDiv;
