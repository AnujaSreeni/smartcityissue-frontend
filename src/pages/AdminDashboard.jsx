import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/complaints/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to load complaints", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h2>Admin Dashboard – All Complaints</h2>

        {loading && <p>Loading...</p>}

        {!loading && complaints.length === 0 && (
          <p>No complaints found</p>
        )}

        {complaints.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "6px",
            }}
          >
            <p><b>User ID:</b> {c.userId}</p>
            <p><b>Description:</b> {c.description}</p>
            <p><b>Location:</b> {c.location.address}</p>
            <p><b>Status:</b> {c.status || "Pending"}</p>

            <img
              src={`http://localhost:4000${c.imageUrl}`}
              alt="issue"
              width="200"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
