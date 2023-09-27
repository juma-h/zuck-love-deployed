import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import WhatsappIcon from "../../assets/whatsapp-icon.svg";
import "./videodiv.css";

const VideoDiv = () => {
  return (
    <div className="video-container">
      <h3 className="video-h">Need Help? </h3>
      <p className="video-p">
        You can read through our documentation here or watch our quick videos to get started
      </p>
      <p className="video-p2">
        Get started with copy testing in 2 minutes also <b>Support is available through WhatsApp</b>
      </p>

      <div className="video-buttons m-3">
        <button className="btn btn-primary btn-lg">Get Started</button>

        <TextField
          id="outlined-basic"
          variant="outlined"
          readOnly
          className="number-input"
          value="+1-438-365-1738"
          sx={{
            input: { color: '#417ef2', pointerEvents: "none",},
            borderRadius: 2,
            width: 300,
            color: "green",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#417ef2",
                borderRadius: "6px",
                borderWidth: "2px",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={WhatsappIcon}
                  alt="icon"
                  style={{ width: "100px", height: "100px" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="mt-5 video-iframe">
        <iframe
          src="https://www.youtube.com/embed/uXWycyeTeCs"
          width="100%" /* Use percentage width to make it responsive */
          height="600px" /* Set height to auto for responsive aspect ratio */
          title="A youtube video on React hooks"
        ></iframe>
      </div>
    </div>
  );
};


export default VideoDiv;
