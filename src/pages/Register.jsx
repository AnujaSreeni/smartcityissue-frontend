import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔐 FRONTEND VALIDATION
    if (!name || !email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      setMsg("Password must be at least 8 characters");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        name,
        email,
        password,
      });
      setMsg("Registration successful. Redirecting to login...");
       
      navigate("/login");
    
     } catch (err) {
      if (err.response && err.response.data.message) {
        setMsg(err.response.data.message);
      } else {
        setMsg("Registration failed");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Register</button>
      </form>

      {msg && <p className="auth-message">{msg}</p>}
    </div>
    </div>
  );
}

export default Register;

