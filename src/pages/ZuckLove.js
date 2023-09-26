import React from "react";
import { Navbar, VideoDiv } from "../components";
import "./zucklove.css";
import { Outlet } from "react-router-dom";

function ZuckLove() {
  return (
    <div className="container">
      <div className="curved-background"></div>
      <Navbar />
      <VideoDiv />
      <Outlet />
    </div>
  );
}

export default ZuckLove;
