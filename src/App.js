import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("no token")
      navigate("/login");
    }else {
      console.log("token found")
      navigate("/")
    }
  }, []);

  //const fbAccessToken = localStorage.getItem("accessToken");
  // console.log("accessToken", fbAccessToken);

  // const [clientId, setClientId] = useState(
  //   "xDtdNsu7yFQ6QKuRyToKsMgbjZkxo2Xn8qLX1LMF"
  // );
  // const [clientSecret, setClientSecret] = useState(
  //   "pGBkfeGYuF7W4Z2C73FH8dRyFnPuIowdJptruKV6VpBH79oaVRrGdIWXEWWmbyMGFB5mWHnTpIzrDhZSgJq2obrc1GVKuRZE6WOregecNXlUR6xLOsD1ejFSw6HVWOPV"
  // );

  //get the auth token
  // useEffect(() => {
  //   if (
  //     fbAccessToken &&
  //     fbAccessToken !== null &&
  //     fbAccessToken !== undefined
  //   ) {
  //     let myHeaders = new Headers();

  //     // console.log("getting the token");
  //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //     let urlencoded = new URLSearchParams();
  //     urlencoded.append("grant_type", "convert_token");
  //     urlencoded.append("client_secret", clientSecret);
  //     urlencoded.append("client_id", clientId);
  //     urlencoded.append("token", fbAccessToken);
  //     urlencoded.append("backend", "facebook");

  //     let requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: urlencoded,
  //       redirect: "follow",
  //     };

  //     // console.log("getting the token after");
  //     // console.log("raw body", urlencoded);

  //     fetch("/auth/convert-token/", requestOptions)
  //     .then((response) => {
  //       const status = response.status;
  //       return response.json().then((result) => {
  //         return { status, result };
  //       });
  //     })
  //       .then(({result, status}) => {
  //         // console.log("result", result)
  //         // console.log("status", status)
  //         if(status === 200){
  //           localStorage.setItem("bearer_token", result.access_token);
  //           localStorage.setItem("account_id", "896631874812550")
  //           // console.log("accessToken for zuck", result.access_token)
  //         }else {
  //           localStorage.setItem("bearer_token", null);
  //         }
  //       })
  //       .catch((error) => {console.log("error", error)});
  //   }
  // }, [fbAccessToken, clientId, clientSecret]);

  return (
    // <Router>
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
    // </Router>
  );
}

export default App;
