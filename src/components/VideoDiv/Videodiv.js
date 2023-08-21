import React from "react";
import "./videodiv.css";

const VideoDiv = () => {
  return (
    <div className="video-container">
      <h3 className="video-h">Need Help? </h3>
      <p className="video-p">
        You can read through our documentation here or watch our quick videos to
        get started
      </p>
      <p className="video-p2">
        Get started with copy testing in 2 minutes also <b>Support is available
        through what’sapp</b> 
      </p>
      <div className="video-buttons m-3">
        <button className="btn btn-primary btn-lg">Get Started</button>
        <button> +1-438-365-1738</button>
      </div>
      < div className="mt-5 video-iframe">
      <iframe
        src="https://www.youtube.com/embed/uXWycyeTeCs"
        width={1000}
        height={500}
        
        title="A youtube video on React hooks"
      ></iframe>
      </div>

    </div>
  );
};

export default VideoDiv;
