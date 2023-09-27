import React, { useEffect, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("accessToken") !== null ||
      localStorage.getItem("accessToken") !== null
  );

  console.log(isLoggedIn);

  // const accessToken = sessionStorage.getItem('accessToken');
  // const localAccessToken = localStorage.getItem("accessToken")

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
