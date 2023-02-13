import RoomIcon from "@mui/icons-material/Room";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useRef, useState } from "react";
import "./Login.css";

export default function Login({ setShowLogin, setCurrentUser,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/login", user);
      setCurrentUser(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="login-logo">
        <RoomIcon className="logoIcon" />
        <span>Travel App</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CloseIcon className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}