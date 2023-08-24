import React from "react";
import { Navbar, VideoDiv } from "../components";
import "./Copy/copy.css";
import { Outlet } from "react-router-dom";

function Copy() {
  return (
    <div className="container">
      <div className="curved-background"></div>
      <Navbar />
      <VideoDiv />
      <Outlet />
    </div>
  );
}

export default Copy;
