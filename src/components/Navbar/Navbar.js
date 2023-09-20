import React, { useEffect, useState } from "react";
import IconImage from "../../assets/Done PNG-02 (1) 1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("accessToken") !== null ||
      localStorage.getItem("accessToken") !== null
  );

  console.log(isLoggedIn);

  // const accessToken = sessionStorage.getItem('accessToken');
  // const localAccessToken = localStorage.getItem("accessToken")

  //navigate to login if no accessToken is seen
  useEffect(() => {
    if (isLoggedIn) {
      console.log("access token found");
      navigate("/");
    } else {
      console.log("access token not found");
      navigate("/login");
    }
  }, [isLoggedIn]);

  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("bearer_token");
    localStorage.removeItem("account_id");
    localStorage.removeItem("fblst_665769488359790")
    localStorage.clear()
    

    navigate("/login");
    toast.success("User logged out!");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg mt-3">
      <div className="container-fluid navbar-top">
        <div className="d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href>
            <img
              src={IconImage}
              alt="zuck-love-icon"
              style={{ height: "50px", width: "50px" }}
            />
            <p className="mb-0 ms-2">Zuck Love</p>
          </a>
        </div>
        <div className="navbar-collapse navbar-links">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                activeClassName="active-link"
                to="/product"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "black" : "grey",
                  margin: "0.5rem",
                  textDecoration: "none",
                })}
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
                to="/"
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

        <div className="d-flex align-items-center m-3">
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
    </nav>
  );
};

export default NavBar;
