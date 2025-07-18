import React from "react";
import "./URLList.css";

const API_BASE = "http://localhost:5000"; // adjust for prod

const URLList = ({ urls }) => {
  if (!urls || urls.length === 0) return <p>No shortened URLs yet.</p>;

  return (
    <div className="url-list">
      <h3>Your Shortened URLs</h3>
      <table>
        <thead>
          <tr>
            <th>Original</th>
            <th>Short</th>
            <th>Clicks</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr key={u._id}>
              <td className="truncate-cell" title={u.originalUrl}>{u.originalUrl}</td>
              <td>
                <a href={`${API_BASE}/${u.shortUrl}`} target="_blank" rel="noreferrer">
                  {`${API_BASE}/${u.shortUrl}`}
                </a>
              </td>
              <td>{u.clickCount ?? 0}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLList;
