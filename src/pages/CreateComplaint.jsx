import Navbar from "../components/Navbar";
import "./CreateComplaint.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateComplaint() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (!image || !description || !location) {
      setMsg("Please fill all fields and upload an image");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);
      formData.append("location", location);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:4000/api/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("Complaint submitted successfully");

setTimeout(() => {
  navigate("/user");
}, 1000);
      setImage(null);
      setDescription("");
      setLocation("");
    } catch (err) {
      console.error(err);
      setMsg("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="complaint-container">
        <h2>Report City Issue</h2>
        <p className="complaint-subtitle">
          Upload an image and provide details about the issue
        </p>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <label>
            Upload Issue Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>

          <label>
            Issue Description
            <textarea
              placeholder="Describe the issue (e.g., pothole near bus stop)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Location
            <input
              type="text"
              placeholder="Enter location or landmark"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>

        {msg && <p className="complaint-msg">{msg}</p>}
      </div>
    </>
  );
}

export default CreateComplaint;
