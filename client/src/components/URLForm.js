import React, { useState } from "react";
import API from "../services/api";
import "./URLForm.css";

const URLForm = ({ onShorten }) => {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    try {
      const res = await API.post("/url/shorten", { originalUrl });
      onShorten(res.data); // new URL doc
      setOriginalUrl("");
    } catch (err) {
      console.error(err);
      alert("Shorten failed");
    }
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a long URL..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>
  );
};

export default URLForm;
