import Navbar from "../components/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="hero-section">
          <h1>Smart City Issue Reporting Platform</h1>
          <p>
            Report potholes, garbage, and streetlight issues using AI-powered
            image classification. Help make your city smarter and cleaner.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/login")}>Get Started</button>
            <button className="secondary" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>📸 Report Issues</h3>
            <p>Upload photos of city issues directly from your device.</p>
          </div>

          <div className="info-card">
            <h3>🤖 AI Classification</h3>
            <p>Our system automatically identifies the type of issue.</p>
          </div>

          <div className="info-card">
            <h3>🏛️ Department Assignment</h3>
            <p>Complaints are routed to the correct department instantly.</p>
          </div>
        </div>

        <footer className="footer">
          <p>Smart City Issue Management System</p>
          <p>Email: smartcity.project@gmail.com</p>
        </footer>
      </div>
    </>
  );
}

export default Home;
