import { useCallback, useEffect, useRef, useState } from "react";
import IconImage from "../../assets/Done PNG-02 (1) 1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const intervalRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("accessToken") !== null ||
      localStorage.getItem("accessToken") !== null
  );
  const refreshToken = localStorage.getItem("refresh_token");
  const [clientId, setClientId] = useState(
    "xDtdNsu7yFQ6QKuRyToKsMgbjZkxo2Xn8qLX1LMF"
  );
  const [clientSecret, setClientSecret] = useState(
    "pGBkfeGYuF7W4Z2C73FH8dRyFnPuIowdJptruKV6VpBH79oaVRrGdIWXEWWmbyMGFB5mWHnTpIzrDhZSgJq2obrc1GVKuRZE6WOregecNXlUR6xLOsD1ejFSw6HVWOPV"
  );



  const refreshTokenAPI = useCallback(() => {
    if (!clientId || !clientSecret || !refreshToken) {
      console.log("Missing required values. Cannot refresh token.");
      return;
    }

    console.log("Token has expired, doing the refresh");
    const date = new Date();
    console.log("date inside refresh::", date);

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

    fetch("/auth/token/", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Token refresh failed");
        }
      })
      .then((result) => {
        localStorage.setItem("bearer_token", result.access_token);
        const newExpiryTime = result.expires_in;

        localStorage.setItem("expiry_time", newExpiryTime);
        intervalRef.current = newExpiryTime;

        console.log("accessToken", result.access_token);
      })
    .catch((error) => console.log("error", error));

  }, [clientId, clientSecret, refreshToken]);


  useEffect(() => {

    if (isLoggedIn) {

      console.log("user logged in");
      intervalRef.current = localStorage.getItem("expiry_time");
      console.log("current interval on login ", intervalRef.current);
  
      const newInterval = intervalRef.current * 1000;
      
      console.log("new interval", newInterval);
      const date = new Date();//get current date time after 5 minutes
      console.log("date after login::", date);
  
      let refreshInterval = setInterval(refreshTokenAPI, newInterval); 
  
      // Do not clear the interval immediately
      // clearInterval(refreshInterval);
    } else {
      console.log("user is logged out");
    }
  }, [isLoggedIn, refreshTokenAPI]);
  

  //navigate to login if no accessToken is seen

  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("bearer_token");
    localStorage.removeItem("account_id");
    localStorage.removeItem("fblst_665769488359790");
    localStorage.clear();

    navigate("/");
    toast.success("User logged out!");
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="nav-div">
      <nav className="navbar navbar-expand-lg mt-3">
        <div className="container-fluid navbar-top">
          <div className="d-flex align-items-center">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img
                src={IconImage}
                alt="zuck-love-icon"
                style={{ height: "50px", width: "50px" }}
              />
              <p
                className={`mb-0 ms-2 ${
                  window.innerWidth <= 768 ? "hidden-text" : ""
                }`}
              >
                Zuck Love
              </p>
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              isMenuOpen ? "show" : ""
            } div-drop`}
            id="navbarNav"
          >
            <div className="nav-wrap">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    activeClassName="active-link"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "black" : "grey",
                      margin: "0.5rem",
                      textDecoration: "none",
                    })}
                    to="/product"
                  >
                    Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active-link"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "black" : "grey",
                      margin: "0.5rem",
                      textDecoration: "none",
                    })}
                    to="/copy"
                  >
                    Copy
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active-link"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "black" : "grey",
                      margin: "0.5rem",
                      textDecoration: "none",
                    })}
                    to="/headlines"
                  >
                    Headlines
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active-link"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? "bold" : "normal",
                      color: isActive ? "black" : "grey",
                      margin: "0.5rem",
                      textDecoration: "none",
                    })}
                    to="/images"
                  >
                    Images
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center justify-content-center m-3">
              <form className="d-flex" role="search">
                <button
                  className="btn btn-primary"
                  onClick={isLoggedIn ? handleLogOut : handleLogin}
                >
                  {isLoggedIn ? "Log Out" : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
