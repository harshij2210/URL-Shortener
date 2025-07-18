import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

const shortDomain = (process.env.REACT_APP_SHORT_DOMAIN || "http://localhost:5000").replace(/\/$/, '');

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  // auth guard + initial load
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    loadUrls();
  }, [navigate]);

  const loadUrls = async () => {
    try {
      const { data } = await API.get("/url/my-urls");
      setUrls(data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    try {
      const { data } = await API.post("/url/shorten", { originalUrl });
      setUrls(prev => [data, ...prev]); // prepend new
      setOriginalUrl("");
    } catch (err) {
      console.error(err);
      alert("Error creating short URL");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: "1046px" }}>
        <h2 className="mb-4">Shorten a URL</h2>
        <form className="d-flex mb-4" onSubmit={handleShorten}>
          <input
            type="url"
            className="form-control me-2"
            placeholder="Enter a long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button className="btn btn-success">Shorten</button>
        </form>

        <h4>Your Shortened URLs</h4>
        {urls.length === 0 ? (
          <p>No shortened URLs yet.</p>
        ) : (
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Original</th>
                <th>Short</th>
                <th>Clicks</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((u) => {
                const full = `${shortDomain}/${u.shortUrl}`;
                const display = full.replace(/^https?:\/\//, "");
                return (
                  <tr key={u._id}>
                    <td
                      className="text-truncate"
                      style={{ maxWidth: "280px" }}
                      title={u.originalUrl}
                    >
                      {u.originalUrl}
                    </td>
                    <td>
                      <a href={full} target="_blank" rel="noreferrer">
                        {display}
                      </a>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => navigator.clipboard.writeText(full)}
                      >
                        Copy
                      </button>
                    </td>
                    <td>
                      <span className="badge bg-info">{u.clickCount ?? 0}</span>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
