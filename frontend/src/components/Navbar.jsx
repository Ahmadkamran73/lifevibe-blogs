import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext } from '../App.jsx';
import '../styles/Navbar.css';

function Navbar() {
  const { isAdmin, logout } = useContext(AdminContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 px-4">
      <Link className="navbar-brand fw-bold fs-3" to="/">LifeVibe</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/">All Posts</Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add Post</Link>
            </li>
          )}
          {!isAdmin ? (
            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">Admin Login</Link>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm ms-2" onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
