import React from "react";
import { Navbar, VideoDiv, VariantDiv } from "../components";
import "./zucklove.css";

function ZuckLove() {
  return (
<div className="container">
  <div className="curved-background"></div> 
  <Navbar />
  <VideoDiv />
  <VariantDiv />
</div>

  );
}

export default ZuckLove;
