import { Link, useNavigate } from "react-router-dom"
import { User,LinkIcon } from "lucide-react"

export default function Navbar() {
  const navigate = useNavigate()
  // This would typically come from your auth context or state
  const username = localStorage.getItem("username") || "User";


  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
       <LinkIcon className="me-2 text-white" size={28} />
        
        <Link className="navbar-brand" to="/dashboard">
       
          LinkShort
        </Link>

        {/* Middle: Welcome message */}
        <div className="mx-auto d-none d-md-block">
          <h5 className="text-light mb-0">Welcome to LinkShort world</h5>
        </div>

        {/* Right: Profile and Logout */}
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-3">
            <User className="text-light me-2" size={20} />
            <span className="text-light">{username}</span>
          </div>
          <button className="btn btn-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
