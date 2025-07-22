import { Link } from "react-router-dom"
import { ArrowRight, Shield, Zap, BarChart3, Globe, LinkIcon } from "lucide-react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Home.css"

export default function Home() {
  return (
    <div
      className="min-vh-100"
      style={{ background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)" }}
    >
      {/* Navigation */}
      <nav className="container py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <LinkIcon className="me-2" size={32} color="#2563eb" />
            <span className="h3 mb-0 fw-bold text-dark">LinkShort</span>
          </div>
          <div className="d-none d-md-flex align-items-center">
            <Link to="/login" className="text-decoration-none text-secondary me-4 hover-text-dark">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-5">
        <div className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          <div
            className="d-inline-flex align-items-center px-3 py-2 mb-4 rounded-pill"
            style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
          >
            <Zap className="me-2" size={16} />
            <small className="fw-medium">Fast, Secure, and Reliable</small>
          </div>

          <h1 className="display-1 fw-bold text-dark mb-4 lh-1">
            Shorten Your Links in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Seconds
            </span>
          </h1>

          <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Transform long, complex URLs into short, shareable links. Track clicks, analyze performance, and manage all
            your links in one place.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Get Started Free
              <ArrowRight className="ms-2" size={20} />
            </Link>
          </div>

          {/* URL Shortener Preview */}
          <div className="bg-white rounded-4 shadow-lg p-4 mx-auto border" style={{ maxWidth: "600px" }}>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <div className="flex-grow-1">
                <input type="url" placeholder="Enter your long URL here..." className="form-control form-control-lg" />
              </div>
              <button className="btn btn-primary btn-lg px-4">Shorten URL</button>
            </div>
            <div className="mt-3 p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
              <small className="text-muted d-block mb-1">Shortened URL:</small>
              <code className="text-primary">linkshort.io/abc123</code>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-dark mb-3">Why Choose LinkShort?</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Powerful features to help you manage and track your shortened links effectively.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <Card className="h-100 border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div
                  className="d-flex justify-content-center align-items-center mx-auto mb-4 rounded-circle"
                  style={{ width: "80px", height: "80px", backgroundColor: "#dbeafe" }}
                >
                  <Zap size={32} color="#2563eb" />
                </div>
                <h3 className="h4 fw-bold text-dark mb-3">Lightning Fast</h3>
                <p className="text-secondary">
                  Generate shortened URLs instantly with our optimized infrastructure. No waiting, no delays.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="h-100 border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div
                  className="d-flex justify-content-center align-items-center mx-auto mb-4 rounded-circle"
                  style={{ width: "80px", height: "80px", backgroundColor: "#dcfce7" }}
                >
                  <Shield size={32} color="#16a34a" />
                </div>
                <h3 className="h4 fw-bold text-dark mb-3">Secure & Safe</h3>
                <p className="text-secondary">
                  Advanced security measures protect your links from malicious attacks and ensure safe redirects.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="h-100 border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div
                  className="d-flex justify-content-center align-items-center mx-auto mb-4 rounded-circle"
                  style={{ width: "80px", height: "80px", backgroundColor: "#f3e8ff" }}
                >
                  <BarChart3 size={32} color="#9333ea" />
                </div>
                <h3 className="h4 fw-bold text-dark mb-3">Detailed Analytics</h3>
                <p className="text-secondary">
                  Track clicks, analyze traffic sources, and get insights into your link performance with detailed
                  analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-5">
        <div
          className="rounded-4 p-5 text-center text-white"
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
        >
          <Globe className="mx-auto mb-4" size={64} style={{ opacity: 0.8 }} />
          <h2 className="display-4 fw-bold mb-3">Ready to Start Shortening?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "600px", opacity: 0.9 }}>
            Join thousands of users who trust LinkShort for their URL shortening needs. Get started today with our free
            plan.
          </p>
          <Link to="/register" className="btn btn-light btn-lg px-4">
            Create Free Account
            <ArrowRight className="ms-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
