import React, {useEffect} from "react";
import IconImage from "../../assets/Done PNG-02 (1) 1.png";
import { NavLink , useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "./navbar.css";

const NavBar = () => {

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  //navigate to login if no accessToken is seen
  useEffect(()=>{
    if(accessToken && accessToken !== null){
      navigate("/");   
    }else {
      navigate("/login")
    }
  },[accessToken])


  const handleLogOut = ()=>{
    navigate("/login")
    localStorage.clear();
    toast.success("User logged out!")
  }

  const handleLogin =()=>{
    navigate("/login");
  }
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
                  textDecoration: 'none'
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
                  textDecoration: 'none'
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
                  textDecoration: 'none'
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
                  textDecoration: 'none'
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
            <button className="btn btn-primary" onClick={accessToken && accessToken !== null? handleLogOut : handleLogin}>
             {accessToken && accessToken !== null ? "Log Out" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
