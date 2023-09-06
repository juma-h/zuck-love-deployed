import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { useState, useEffect } from "react";

function App() {
  const fbAccessToken = localStorage.getItem("accessToken");
  console.log("accessToken", fbAccessToken);

  const [clientId, setClientId] = useState(
    "xDtdNsu7yFQ6QKuRyToKsMgbjZkxo2Xn8qLX1LMF"
  );
  const [clientSecret, setClientSecret] = useState(
    "pGBkfeGYuF7W4Z2C73FH8dRyFnPuIowdJptruKV6VpBH79oaVRrGdIWXEWWmbyMGFB5mWHnTpIzrDhZSgJq2obrc1GVKuRZE6WOregecNXlUR6xLOsD1ejFSw6HVWOPV"
  );

  useEffect(() => {
    if (
      fbAccessToken &&
      fbAccessToken !== null &&
      fbAccessToken !== undefined
    ) {
      let myHeaders = new Headers();

      console.log("getting the token");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "convert_token");
      urlencoded.append("client_secret", clientSecret);
      urlencoded.append("client_id", clientId);
      urlencoded.append("token", fbAccessToken);
      urlencoded.append("backend", "facebook");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      console.log("getting the token after");
      console.log("raw body", urlencoded);

      fetch("/auth/convert-token/", requestOptions)
      .then((response) => {
        const status = response.status;
        return response.json().then((result) => {
          return { status, result };
        });
      })
        .then(({result, status}) => {
          console.log("result", result)
          console.log("status", status)
          if(status === 200){
            localStorage.setItem("bearer_token", result.access_token);
            // console.log("accessToken for zuck", result.access_token)
          }else {
            localStorage.setItem("bearer_token", null);
          }
        })
        .catch((error) => {console.log("error", error)});
    }
  }, [fbAccessToken]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ZuckLove />}>
            <Route index element={<Copy />} />
            <Route path="/headlines" element={<Headlines />} />
            <Route path="/product" element={<Product />} />
            <Route path="/images" element={<ImageTest />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
