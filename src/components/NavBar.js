import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                  {/* if you dont use === above then this wont work */}
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form action="" className="d-flex">
                <Link to="/login" className="btn btn-primary mx-1">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary mx-1">
                  Signup
                </Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary mx-1">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
