import React from "react";
import "./spinner.css";
import { Puff } from "react-loader-spinner";

function Spinner(props) {
  return (
    <div className="spinner-container">
      <span class="loader">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </span>
      <p className="spinner-text">
        {" "}
        Please wait{props.msg !== undefined && ", " + props.msg}
      </p>
    </div>
  );
}

export default Spinner;