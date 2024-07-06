import React from "react";
import profileImg from "../images/Userunknown.jpeg";

function NavMessageItem({ message }) {
  return (
    <li className="message-item">
      <a href="#">
        <img src={profileImg} alt="" className="rounded-circle" />
        <div>
          <h4>{message.fromUserName}</h4>
          <p>{message.message}</p>
          <p>{new Date(message.timestamp.seconds * 1000).toLocaleString()}</p>
        </div>
      </a>
    </li>
  );
}

export default NavMessageItem;
