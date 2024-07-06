import React, { useState, useEffect } from "react";
import { fetchMessages } from "../firebase/fetchMessages";
import NavMessageItem from "./NavMessageItem";

function NavMessage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-chat-left-text"></i>
        <span className="badge bg-success badge-number">{messages.length}</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li className="dropdown-header">
          You have {messages.length} new{" "}
          {messages.length === 1 ? "message" : "messages"}
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {messages.length > 0 ? (
          messages.map((message) => (
            <React.Fragment key={message.id}>
              <NavMessageItem message={message} />
              <li>
                <hr className="dropdown-divider" />
              </li>
            </React.Fragment>
          ))
        ) : (
          <li className="dropdown-item">No new messages</li>
        )}
      </ul>
    </li>
  );
}

export default NavMessage;
