import React, { useState } from "react";
import "./contact.css";
import { addMessageToUser } from "../firebase/contactOperations"; // Ensure the correct import path
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMessageToUser(formData);
      setSuccessMessage("Message sent successfully");
      setTimeout(() => {
        navigate("/"); // Redirect to main page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Contact Us</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-formGroup">
            <label htmlFor="name" className="contact-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>
          <div className="contact-formGroup">
            <label htmlFor="email" className="contact-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>
          <div className="contact-formGroup">
            <label htmlFor="message" className="contact-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="contact-textarea"
            />
          </div>
          <button type="submit" className="contact-button">
            Submit
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;
