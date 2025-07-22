import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, LinkIcon, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import API from "../services/api"
import "./Register.css"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const errors = {}

    if (!name.trim()) {
      errors.name = "Name is required"
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email"
    }

    if (!password.trim()) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) return

    try {
      setLoading(true)
      await API.post("/auth/register", { name, email, password })
      setSuccess("Registration successful! Redirecting to login...")
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (password.length >= 6) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Very Weak", color: "danger" },
      { strength: 2, label: "Weak", color: "warning" },
      { strength: 3, label: "Fair", color: "info" },
      { strength: 4, label: "Good", color: "success" },
      { strength: 5, label: "Strong", color: "success" },
    ]

    return levels[strength]
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ background: "linear-gradient(135deg, #dee8e4ff 0%, #b3f4cdff 100%)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
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
                  <h2 className="h4 fw-bold text-dark mb-2">Create Account</h2>
                  <p className="text-muted mb-0">Join LinkShort and start shortening URLs</p>
                </div>

                {/* Success Alert */}
                {success && (
                  <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <CheckCircle size={16} className="me-2" />
                    <small>{success}</small>
                  </div>
                )}

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <AlertCircle size={16} className="me-2" />
                    <small>{error}</small>
                  </div>
                )}

                {/* Register Form */}
                <form onSubmit={handleRegister} noValidate>
                  {/* Name Field */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium">
                      Full Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <User size={16} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        id="name"
                        className={`form-control border-start-0 ps-0 ${fieldErrors.name ? "is-invalid" : ""}`}
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => ({ ...prev, name: "" }))
                          }
                        }}
                        disabled={loading}
                        autoComplete="name"
                        required
                      />
                      {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
                    </div>
                  </div>

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
                  <div className="mb-3">
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
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (fieldErrors.password) {
                            setFieldErrors((prev) => ({ ...prev, password: "" }))
                          }
                        }}
                        disabled={loading}
                        autoComplete="new-password"
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
                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Password strength:</small>
                          <small className={`text-${passwordStrength.color}`}>{passwordStrength.label}</small>
                        </div>
                        <div className="progress" style={{ height: "4px" }}>
                          <div
                            className={`progress-bar bg-${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-medium">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Lock size={16} className="text-muted" />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className={`form-control border-start-0 border-end-0 ps-0 ${fieldErrors.confirmPassword ? "is-invalid" : ""}`}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          if (fieldErrors.confirmPassword) {
                            setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }))
                          }
                        }}
                        disabled={loading}
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={toggleConfirmPasswordVisibility}
                        disabled={loading}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      {fieldErrors.confirmPassword && (
                        <div className="invalid-feedback">{fieldErrors.confirmPassword}</div>
                      )}
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={loading || !name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <span className="text-muted small">Already have an account? </span>
                    <Link to="/login" className="text-decoration-none fw-medium">
                      Sign in here
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
