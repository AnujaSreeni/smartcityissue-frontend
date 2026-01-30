import { useNavigate } from "react-router-dom";
import "./AuthRequiredModal.css";

function AuthRequiredModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Registration Required</h3>
        <p>Please register first to report an issue.</p>

        <div className="modal-actions">
          <button
            className="btn primary"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button className="btn link" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthRequiredModal;
