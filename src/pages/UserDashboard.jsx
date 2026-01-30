import Navbar from "../components/Navbar";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ DEFINE FIRST
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);
    } catch {
      console.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []); // 👈 refetch when route changes

  // JSX return below...

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>User Dashboard</h2>
        <p className="dashboard-subtitle">
          Report city issues and track their resolution status
        </p>

        {/* ACTION CARD */}
        <div className="action-card">
          <h3>🚨 Report a New Issue</h3>
          <p>
            Upload a photo of potholes, garbage, or streetlight problems and
            submit it for quick action.
          </p>
          <button onClick={() => navigate("/complaint")}>
            Report Issue
          </button>
        </div>

        <div className="complaints-section">
  <h3>📋 My Complaints</h3>

  {loading && <p>Loading complaints...</p>}

  {!loading && complaints.length === 0 && (
    <div className="empty-state">
      <p>No complaints submitted yet.</p>
    </div>
  )}

  {complaints.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "6px",
            }}
          >
            <p><b>Description:</b> {c.description}</p>
            <p><b>Location:</b> {c.location.address}</p>
            <p><b>Status:</b> Pending</p>

            <img
              src={`http://localhost:4000${c.imageUrl}`}
              alt="complaint"
              width="200"
            />
          </div>
        ))}
</div>
</div>
    </>
  );
}

export default UserDashboard;







