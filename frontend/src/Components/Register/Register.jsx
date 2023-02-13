import React, { useState, useRef } from "react";
import "./Register.css";
import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon /> Travel App
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerButton">Register</button>
        {success && <span className="success">Registration successful. Now you can login.</span>}
        {error && <span className="error">Something went wrong.</span>}
      </form>
      <CloseIcon
        className="closeButton"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/register", newUser);
      setError(false);
      setSuccess(true);
      setShowRegister(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
};

export default Register;
