"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    if (field === "name") {
      setName(e.target.value);
      setNameError(false);
    }
    if (field === "email") {
      setEmail(e.target.value);
      setEmailError(false);
    }
    if (field === "message") {
      setMessage(e.target.value);
      setMessageError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setNameError(true);
      toast.error("please enter you name");
    }
    if (!email) {
      setEmailError(true);
      toast.error("please provide an email address");
    }
    if (!message) {
      setMessageError(true);
      toast.error("please include a message");
    }
    if (message.length > 250) {
      setMessageError(true);
      toast.error("message longer than 250 char.");
    }
    if (name && email && message && message.length <= 250) {
      setLoading(true);
      setTimeout(() => {
        toast.success("Message Sent!");
        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <>
      <h2>Lets talk about your project</h2>
      <h3>I will contact as soon as I can</h3>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="input-wrapper">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="John"
            value={name}
            onChange={(e) => handleChange(e, "name")}
            className={nameError ? "input-error" : ""}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="johnsmith@example.com"
            value={email}
            onChange={(e) => handleChange(e, "email")}
            className={emailError ? "input-error" : ""}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            name="message"
            placeholder="message..."
            value={message}
            onChange={(e) => handleChange(e, "message")}
            className={messageError ? "input-error" : ""}
          />
        </div>
        <span className={message.length >= 251 ? "message-length error" : "message-length"}>
          {250 - message.length}{" "}
          {message.length < 249 || message.length > 251 ? "charcters" : "charcter"} remaning
        </span>

        <button type="submit" className="btn-form" disabled={loading}>
          {loading ? "sending...." : "submit"}
        </button>
      </form>
    </>
  );
}
