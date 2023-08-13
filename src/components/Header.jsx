import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/Dashboard"><h5 style={{ color: 'white' }}>Dashboard</h5></Link>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;