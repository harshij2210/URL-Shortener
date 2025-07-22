"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Copy, ExternalLink, BarChart3, Trash2, Eye, Calendar, LinkIcon } from "lucide-react"
import Navbar from "../components/Navbar"
import API from "../services/api"
import './Dashboard.css'

const shortDomain = (process.env.REACT_APP_SHORT_DOMAIN || "http://localhost:5000").replace(/\/$/, "")

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState("")
  const [stats, setStats] = useState({ totalUrls: 0, totalClicks: 0 })
  const navigate = useNavigate()

  // auth guard + initial load
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
      return
    }
    loadUrls()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  const loadUrls = async () => {
    try {
      setLoading(true)
      const { data } = await API.get("/url/my-urls")
      setUrls(data)

      // Calculate stats
      const totalClicks = data.reduce((sum, url) => sum + (url.clickCount || 0), 0)
      setStats({ totalUrls: data.length, totalClicks })
    } catch (err) {
      console.error(err)
      if (err.response?.status === 401) navigate("/login")
    } finally {
      setLoading(false)
    }
  }

  const handleShorten = async (e) => {
    e.preventDefault()
    if (!originalUrl.trim()) return

    try {
      setLoading(true)
      const { data } = await API.post("/url/shorten", { originalUrl })
      setUrls((prev) => [data, ...prev])
      setOriginalUrl("")
      setStats((prev) => ({ ...prev, totalUrls: prev.totalUrls + 1 }))
    } catch (err) {
      console.error(err)
      alert("Error creating short URL")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopySuccess(url)
      setTimeout(() => setCopySuccess(""), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return

    try {
      await API.delete(`/url/${id}`)
      setUrls((prev) => prev.filter((url) => url._id !== id))
      setStats((prev) => ({ ...prev, totalUrls: prev.totalUrls - 1 }))
    } catch (err) {
      console.error(err)
      alert("Error deleting URL")
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-light min-vh-100">
        <div className="container py-4" style={{ maxWidth: "1200px" }}>
          {/* Header Section */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex align-items-center mb-3">
               
                <h1 className="h3 mb-0 fw-bold">Dashboard</h1>
              </div>
              <p className="text-muted">Manage and track your shortened URLs</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                    <LinkIcon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="card-title mb-1 fw-bold">{stats.totalUrls}</h5>
                    <p className="card-text text-muted mb-0">Total URLs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                    <BarChart3 className="text-success" size={24} />
                  </div>
                  <div>
                    <h5 className="card-title mb-1 fw-bold">{stats.totalClicks}</h5>
                    <p className="card-text text-muted mb-0">Total Clicks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* URL Shortener Form */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="card-title mb-0 fw-bold">Create Short URL</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleShorten}>
                <div className="row g-3">
                  <div className="col-md-9">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <LinkIcon size={16} className="text-muted" />
                      </span>
                      <input
                        type="url"
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter a long URL to shorten..."
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-primary w-100" type="submit" disabled={loading || !originalUrl.trim()}>
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Shortening...
                        </>
                      ) : (
                        "Shorten URL"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* URLs Table */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="card-title mb-0 fw-bold">Your Shortened URLs</h5>
            </div>
            <div className="card-body p-0">
              {loading && urls.length === 0 ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading your URLs...</p>
                </div>
              ) : urls.length === 0 ? (
                <div className="text-center py-5">
                  <LinkIcon size={48} className="text-muted mb-3" />
                  <h6 className="text-muted">No shortened URLs yet</h6>
                  <p className="text-muted mb-0">Create your first short URL using the form above</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 fw-semibold">Original URL</th>
                        <th className="border-0 fw-semibold">Short URL</th>
                        <th className="border-0 fw-semibold text-center">Clicks</th>
                        <th className="border-0 fw-semibold">Created</th>
                        <th className="border-0 fw-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {urls.map((u) => {
                        const full = `${shortDomain}/${u.shortUrl}`
                        const display = full.replace(/^https?:\/\//, "")
                        const isCopied = copySuccess === full

                        return (
                          <tr key={u._id}>
                            <td>
                              <div className="text-truncate" style={{ maxWidth: "300px" }} title={u.originalUrl}>
                                <small className="text-muted">{u.originalUrl}</small>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <a href={full} target="_blank" rel="noreferrer" className="text-decoration-none me-2">
                                  <code className="text-primary">{display}</code>
                                </a>
                                <ExternalLink size={14} className="text-muted" />
                              </div>
                            </td>
                            <td className="text-center">
                              <span className="badge bg-info rounded-pill">
                                <Eye size={12} className="me-1" />
                                {u.clickCount ?? 0}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center text-muted">
                                <Calendar size={14} className="me-1" />
                                <small>{new Date(u.createdAt).toLocaleDateString()}</small>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center gap-1">
                                <button
                                  type="button"
                                  className={`btn btn-sm ${isCopied ? "btn-success" : "btn-outline-primary"}`}
                                  onClick={() => handleCopy(full)}
                                  title="Copy to clipboard"
                                >
                                  <Copy size={14} />
                                  {isCopied && <span className="ms-1">✓</span>}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(u._id)}
                                  title="Delete URL"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
