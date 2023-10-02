import { Route, Routes, useNavigate } from "react-router-dom";
import {
  ZuckLove,
  Copy,
  Headlines,
  ImageTest,
  Product,
  Login,
  SignUp,
} from "./pages";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  console.log("app js");

  const getTime = localStorage.getItem("expiry_time");
  const refreshToken = localStorage.getItem("refresh_token");
  const [clientId, setClientId] = useState(
    "xDtdNsu7yFQ6QKuRyToKsMgbjZkxo2Xn8qLX1LMF"
  );
  const [clientSecret, setClientSecret] = useState(
    "pGBkfeGYuF7W4Z2C73FH8dRyFnPuIowdJptruKV6VpBH79oaVRrGdIWXEWWmbyMGFB5mWHnTpIzrDhZSgJq2obrc1GVKuRZE6WOregecNXlUR6xLOsD1ejFSw6HVWOPV"
  );

  const refreshTokenAPI = () => {
    
    console.log("Token has expired");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("client_secret", clientSecret);
    urlencoded.append("client_id", clientId);
    urlencoded.append("refresh_token", refreshToken);
    urlencoded.append("backend", "facebook");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://167.71.92.101/auth/token/", requestOptions)
      .then((response) => {
        const status = response.status;
        return response.json().then((result) => {
          return { status, result };
        });
      })
      .then(({ result, status }) => {
        console.log(result);
        console.log("refresh statys", status);
      })

      .catch((error) => {
        console.log("error", error);
      });
  };

  function TokenRefreshTimer({ getTime, refreshTokenAPI }) {
    useEffect(() => {
      let timerId;

      const refresh = () => {
        refreshTokenAPI();
        clearTimeout(timerId); // Clear the previous timer
      };

      // Calculate the initial time remaining
      const currentTime = new Date().getTime();
      const timeRemaining = getTime - currentTime;

      // Set a timer to refresh the token when it's about to expire
      if (timeRemaining > 0) {
        timerId = setTimeout(refresh, timeRemaining);
      }

      return () => {
        // Clear the timer when the component unmounts
        clearTimeout(timerId);
      };
    }, [refreshTokenAPI, getTime]);

    return null;
  }

  return (
    <div className="App">
      <TokenRefreshTimer getTime={getTime} refreshTokenAPI={refreshTokenAPI} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/" element={<ZuckLove />}>
          <Route path="/copy" element={<Copy />} />
          <Route path="/headlines" element={<Headlines />} />
          <Route path="/product" element={<Product />} />
          <Route path="/images" element={<ImageTest />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
