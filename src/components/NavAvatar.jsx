import React from "react";
import profileImg from "../images/Userunknown.jpeg";
import { Link } from "react-router-dom";
import useFetchUserData from "../firebase/fetchingUserData";
import { auth } from "../firebase/firebaseConfig";
import "./profile.css";

function NavAvatar() {
  const { userDetails, loading, error } = useFetchUserData();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <li className="nav-item dropdown pe-3">
        <a
          className="nav-link nav-profile d-flex align-items-center pe-0"
          href="#"
          data-bs-toggle="dropdown"
        >
          <img src={profileImg} alt="Profile" className="rounded-circle" />{" "}
          <span className="d-none d-md-block dropdown-toggle ps-2"></span>{" "}
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li className="d-flex justify-content-center align-items-center">
            <button className="btn btn-primary" onClick={handleLogout}>
              Log In
            </button>
          </li>
        </ul>
      </li>
    );
  }

  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src={profileImg} alt="Profile" className="rounded-circle" />{" "}
        <span className="d-none d-md-block dropdown-toggle ps-2"></span>{" "}
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>{userDetails.firstName}</h6>
          <span>{userDetails.lastName}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link to="/Profile">
            <a
              className="dropdown-item d-flex align-items-center"
              href="users-profile.html"
            >
              <i className="bi bi-person"></i>
              <span>My Profile</span>
            </a>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
            <i className="bi bi-gear"></i> <span>Account Settings</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item d-flex align-items-center" href="F.A.Q">
            <i className="bi bi-question-circle"></i> <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleLogout}>
            Sign Out
          </button>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
