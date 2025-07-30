import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="mb-4">
        <span style={{ fontSize: 80 }} role="img" aria-label="confused">😕</span>
      </div>
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="lead mb-4">Page Not Found</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}

export default NotFound;
