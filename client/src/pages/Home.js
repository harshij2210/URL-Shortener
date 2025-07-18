import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-light vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-3 fw-bold">Shorten Your Links in Seconds</h1>
      <p className="lead mb-4">A fast and secure URL shortener built with MERN.</p>
      <Link to="/login" className="btn btn-primary btn-lg shadow">
        Get Started
      </Link>
    </div>
  );
}
