import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔐 FRONTEND VALIDATION
    if (!email || !password) {
      setMsg("Please enter all fields");
      return;
    }

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);


      const decoded = jwtDecode(res.data.token);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("name", email.split("@")[0]);

      // 🔥 ROLE BASED REDIRECT
      if (decoded.role === "citizen") navigate("/user");
      if (decoded.role === "admin") navigate("/admin");
      if (decoded.role === "department") navigate("/department");
    } catch {
      setMsg("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      {msg && <p className="auth-message">{msg}</p>}

      <p className="auth-link">
          New user? <Link to="/register">Register here</Link>
    </p>
     </div>
    </div>
  );
}

export default Login;
