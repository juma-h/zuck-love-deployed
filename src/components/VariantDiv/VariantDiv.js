import React from "react";
import "./variant.css";
import NavTabs from "../Navtabs/Navtabs";

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
        <div className="col-md-7">
          Select the following details below:
          <div className="row">
            <div className="col-md-4">
              <select class="form-select" aria-label="Select 1">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-md-4">
              <select class="form-select" aria-label="Select 2">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-md-4">
              <select class="form-select" aria-label="Select 3">
                <option selected>Open this select menu</option>
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
        <div className="col-md-4">
          Metric to optimize for:
          <select class="form-select" aria-label="Select 3">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <p>
            <em>Tip:</em>Events that get fired the most will reach statistically
            significance faster.
          </p>
        </div>
        <div>
          <p>When should we consider this results signifcant?</p>
          <p>
            When you reach
            <input /> %,certainity, considerthe results statistically
            significant
          </p>
        </div>
        <hr></hr>

        <NavTabs />
      </div>
    </div>
  );
};

export default VariantDiv;
