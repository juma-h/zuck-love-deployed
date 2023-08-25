import React, { useState } from "react";
import "./login.css";
import Laptop from "../../assets/laptop png 1.png";
import ZuckLove from "../../assets/Done PNG-02 (1) 1.png";
import facebook from "../../assets/image 7.png";
import google from "../../assets/icons8-google-48.png";
import quote from "../../assets/Vector (1).png";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
                <img src={quote} alt="" className="alt-quote"/>
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
                <button className="btn btn-light">
                  <img src={facebook} alt="Google Icon" className="log-icon" />
                  Facebook
                </button>
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
                <button className="create-btn">Create Account Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
