import React from "react";
import IconImage from "../../assets/Done PNG-02 (1) 1.png";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg mt-3">
      <div className="container-fluid ">
        <div className="d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={IconImage}
              alt="zuck-love-icon"
              style={{ height: "50px", width: "50px" }}
            />
            <p className="mb-0 ms-2">Zuck Love</p>
          </a>
        </div>
        <div className="navbar-collapse d-flex justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Copy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Headlines
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Images
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <form className="d-flex" role="search">
            <button className="btn btn-primary btn-lg" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
