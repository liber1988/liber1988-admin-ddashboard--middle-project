import React from "react";
import { auth } from "../firebase/firebaseConfig";
import useFetchUserData from "../firebase/fetchingUserData";
import "./profile.css";
import profileImg from "../images/Userunknown.jpeg";

function Profile() {
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
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-container">
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo || profileImg}
              alt="Profile"
              className="rounded-circle"
            />
          </div>
          <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>User data not found</p>
      )}
    </div>
  );
}

export default Profile;
