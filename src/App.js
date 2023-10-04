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
import { useCallback, useEffect, useRef , useState} from "react";

function App() {

  // console.log("app js");
//   const intervalRef = useRef();



//   const getTime = localStorage.getItem("expiry_time");

//   console.log("time",getTime)
//   const refreshToken = localStorage.getItem("refresh_token");
//   const [clientId, setClientId] = useState(
//     "xDtdNsu7yFQ6QKuRyToKsMgbjZkxo2Xn8qLX1LMF"
//   );
//   const [clientSecret, setClientSecret] = useState(
//     "pGBkfeGYuF7W4Z2C73FH8dRyFnPuIowdJptruKV6VpBH79oaVRrGdIWXEWWmbyMGFB5mWHnTpIzrDhZSgJq2obrc1GVKuRZE6WOregecNXlUR6xLOsD1ejFSw6HVWOPV"
//   );


//   const refreshTokenAPI = useCallback(() => {

//     if (!clientId || !clientSecret || !refreshToken || !getTime) {
//       console.log("Missing required values or user is logged out. Cannot refresh token.");
//       return;
//     }
     

//     console.log("Token has expired, doing the refresh ");
//     alert("Time is up , refreshing token")
    
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
//     var urlencoded = new URLSearchParams();

//     urlencoded.append("grant_type", "refresh_token");
//     urlencoded.append("client_secret", clientSecret);
//     urlencoded.append("client_id", clientId);
//     urlencoded.append("refresh_token", refreshToken);
//     urlencoded.append("backend", "facebook");
    
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow'
//     };
    
//     fetch("/auth/token/", requestOptions)
//     .then((response) => {
//       const status = response.status;
//       return response.json().then((result) => {
//         return { status, result };
//       });
//     })
//       .then(({ result, status })=> {
//         if(status === 200){
//           localStorage.setItem("bearer_token", result.access_token);
//             localStorage.setItem("expiry_time", result.expires_in);
//             localStorage.setItem("refresh_token", result.refresh_token);
//         }
//         console.log("acessToken", result)
//         console.log("status", status)
//       })
//       .catch(error => console.log('error', error));

//   }, [clientSecret, clientId, refreshToken, getTime]);


//   useEffect(() => {
//     // Check if getTime has a valid value (not null or undefined)
//     if (getTime && getTime !== null && getTime !== "") {
//       const interval = setInterval(() => refreshTokenAPI(), getTime * 60000);
//       intervalRef.current = interval;
  
//       return () => clearInterval(interval);
//     }

//     return () => {};
//   }, [refreshTokenAPI, getTime]);
  

//  clearInterval(intervalRef.current);

  return (
    <div className="App">
      {/* <TokenRefreshTimer getTime={getTime} refreshTokenAPI={refreshTokenAPI} /> */}

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
