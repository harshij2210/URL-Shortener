import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, LinkIcon, AlertCircle, ArrowLeft} from "lucide-react"
import API from "../services/api"
import "./Login.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const errors = {}

    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email"
    }

    if (!password.trim()) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    try {
      setLoading(true)
      const { data } = await API.post("/auth/login", { email, password})
      localStorage.setItem("token", data.token)
      localStorage.setItem("userEmail", data.user.email)
      localStorage.setItem("username", data.user.name); 
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ background: "linear-gradient(135deg, #f3fffdff 0%, #a9dff4ff 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
             {/* Back to Home Button */}
            <div className="mb-3">
              <Link
                to="/"
                className="btn btn-light btn-sm d-inline-flex align-items-center text-decoration-none text-dark shadow-sm"
              >
                <ArrowLeft size={16} className="me-2" />
                Back to Home
              </Link>
            </div>
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                      <LinkIcon size={32} className="text-primary" />
                    </div>
                  </div>
                  <h2 className="h4 fw-bold text-dark mb-2">Welcome Back</h2>
                  <p className="text-muted mb-0">Sign in to your LinkShort account</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <AlertCircle size={16} className="me-2" />
                    <small>{error}</small>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} noValidate>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Mail size={16} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        className={`form-control border-start-0 ps-0 ${fieldErrors.email ? "is-invalid" : ""}`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => ({ ...prev, email: "" }))
                          }
                        }}
                        disabled={loading}
                        autoComplete="email"
                        required
                      />
                      {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Lock size={16} className="text-muted" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`form-control border-start-0 border-end-0 ps-0 ${fieldErrors.password ? "is-invalid" : ""}`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (fieldErrors.password) {
                            setFieldErrors((prev) => ({ ...prev, password: "" }))
                          }
                        }}
                        disabled={loading}
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={togglePasswordVisibility}
                        disabled={loading}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  
                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={loading || !email.trim() || !password.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Register Link */}
                  <div className="text-center">
                    <span className="text-muted small">Don't have an account? </span>
                    <Link to="/register" className="text-decoration-none fw-medium">
                      Create one here
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-black-50 small mb-0">© 2024 LinkShort. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
