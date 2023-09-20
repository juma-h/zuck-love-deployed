import React, { useEffect, useState } from "react";
import "./login.css";
import Laptop from "../../assets/laptop png 1.png";
import ZuckLove from "../../assets/Done PNG-02 (1) 1.png";
import facebook from "../../assets/image 7.png";
import { toast } from "react-toastify";
import google from "../../assets/icons8-google-48.png";
import quote from "../../assets/Vector (1).png";
import { useNavigate } from "react-router-dom";
 import FacebookLogin from "react-facebook-login";
//import FacebookLogin from "@greatsumini/react-facebook-login";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [clientId, setClientId] = useState(
    "xDtdNsu7yFQ6QKuRyToKsMgbjZkxo2Xn8qLX1LMF"
  );
  const [clientSecret, setClientSecret] = useState(
    "pGBkfeGYuF7W4Z2C73FH8dRyFnPuIowdJptruKV6VpBH79oaVRrGdIWXEWWmbyMGFB5mWHnTpIzrDhZSgJq2obrc1GVKuRZE6WOregecNXlUR6xLOsD1ejFSw6HVWOPV"
  );

  const navigate = useNavigate();

  const signUp = () => {
    navigate("/sign-up");
  };

  const responseFacebook = (response) => {
    console.log("response", response);

    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      toast.error("Login failed!");
      setLogin(false);
      return false;
    }

    setData(response);
    // setPicture(response.picture.data.url);

    if (response.accessToken && response.accessToken !== null) {

      console.log("yes");

      setAccessToken(response.accessToken);
      // sessionStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("accessToken", response.accessToken);

      const fbAccessToken = response.accessToken;
      const useToken =
        "EAAJdg4nbIW4BO5ZBiyhONL18Sf4tCB5f7kZBteUooQAa7sAgFgoEp9FmgIyxYZCZBv0fYwDkfr3x3dFKHxbhoVCBDCPbIufasIuQtg1RjqeAN9zizopNv0UmhcZAGOJIa02601ykV35X0AdafmOVjb2b7gTocAJ0fvalCraGizU0tOlPCTxzZALBX0";

      // Prepare the request data
      const formData = new FormData();
      formData.append("grant_type", "convert_token");
      formData.append("client_id", clientId);
      formData.append("client_secret", clientSecret);
      formData.append("backend", "facebook");
      formData.append("token", useToken);

      // Make the POST request
      fetch("/auth/convert-token/", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Authentication failed");
          }
        })
        .then((data) => {
          if (
            data.access_token &&
            data.access_token !== null &&
            data.access_token !== ""
          ) {
            // Assuming the response contains an access_token
            const accessToken = data.access_token;
            // sessionStorage.setItem("bearer_token", accessToken);
            // sessionStorage.setItem("account_id", "896631874812550");
            // -------------
            localStorage.setItem("bearer_token", accessToken);
            localStorage.setItem("account_id", "896631874812550");

            console.log("login");
            navigate("/");
            toast.success("Login successful!");
            setLogin(true);
          }
        })
        .catch((error) => {
          console.error("Authentication error", error);
          // sessionStorage.setItem("bearer_token", null);
          localStorage.setItem("bearer_token", null);
        });
    } else {
      setLogin(false);
    }
  };

  return (
    <>
      <div className="container-fluid login-page">
        <div className="row landingPage">
          <div className="col-5 left">
            <div className="d-flex flex-row justify-content-between  align-items-center top">
              <div className="logo-left">
                <img src={ZuckLove} alt="" />
                <span>Zuck Love</span>
              </div>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="vector-image middle">
              <img src={Laptop} alt="" />
            </div>

            <div className="bottom row">
              <div className="col-md-6 d-flex justify-content-start">
                <img src={quote} alt="" className="alt-quote" />
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <button className="arrow-btn">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button className="arrow-btn">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div className="col-12 text-quote">
                <p>Lorem ipsum dolor sit amet consectetur. Duis suspendisse.</p>
              </div>
            </div>
          </div>

          {/* login inputs */}

          <div className="col-7 right">
            <div className="right_inner-cont d-flex flex-column  m-5 p-5">
              <h5>Sign In</h5>
              <div className="sign-in-btns">
                <button className="btn btn-light ">
                  <img src={google} alt="Google Icon" className="log-icon" />
                  Google
                </button>
                <FacebookLogin
                   //appId="2227338407463775"
                  appId="665769488359790"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile"
                  cssClass="my-facebook-button-class"
                  callback={responseFacebook}
                  icon={<img src={facebook} alt="fb-Icon" className="log-icon" /> }
                  textButton="Facebook"
                />



                {/* <FacebookLogin
                  appId="665769488359790"
                  onSuccess={responseFacebook}
                  textButton="Facebook"
                  scope="public_profile"
                  style={{
                    backgroundColor: "none",
                    padding: "1em",
                    borderRadius: "12px",
                    fontWeight: 500,
                    color: "black",
                    border: "solid 0.5px lightgrey",
                    margin: "5px"
                  }}
                  
                  // cssClass="my-facebook-button-class"
                  icon={
                    <img
                      src={facebook}
                      alt="Google Icon"
                      className="log-icon"
                    />
                  }
                /> */}
              </div>

              <h6 className="signin-h2">
                <span>OR SIGN IN WITH</span>
              </h6>
              <div className="col-12">
                <div className="m-3 ">
                  <label
                    for="exampleInputEmail1"
                    className="form-label label-signin"
                  >
                    Username
                  </label>
                  <input
                    type="email"
                    className="form-control input-signin"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="zucklove@username.com"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="m-3 password-input">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label label-signin"
                  >
                    Password
                  </label>
                  <div className="input-with-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control input-signin"
                      id="exampleInputPassword1"
                      placeholder="********"
                    />
                    <span
                      className="password-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="far fa-eye-slash"></i>
                      ) : (
                        <i className="far fa-eye"></i>
                      )}
                    </span>
                  </div>
                </div>
                <a className="forgot-password" href>
                  Forgot password?
                </a>
              </div>
              <div className="col-12">
                <button className="login-btn">Login</button>
              </div>
              <h6 className="signin-h2">
                <span>DON'T HAVE AN ACCOUNT? </span>
              </h6>
              <div className="col-12">
                <button className="create-btn" onClick={signUp}>
                  Create Account Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
