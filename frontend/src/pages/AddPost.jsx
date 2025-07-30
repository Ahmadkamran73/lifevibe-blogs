import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../App.jsx';
import '../styles/PostForm.css';

function AddPost() {
  const { isAdmin, checkAdminStatus } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Travel',
    author: '',
    imageURL: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
    
    // Direct check of localStorage
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    setLoading(false);
  }, [checkAdminStatus, navigate]);

  if (loading) {
    return <div className="container py-5 text-center"><div className="spinner-border text-primary" /></div>;
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add post');
      setSuccess('Post added successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold text-center">Add New Post</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <input className="form-control mb-2" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
            <textarea className="form-control mb-2" name="content" rows="4" value={form.content} onChange={handleChange} placeholder="Content" required></textarea>
            <input className="form-control mb-2" name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
            <input className="form-control mb-2" name="imageURL" value={form.imageURL} onChange={handleChange} placeholder="Image URL" required />
            <select className="form-select mb-3" name="category" value={form.category} onChange={handleChange}>
              <option>Travel</option>
              <option>Food</option>
              <option>Wellness</option>
            </select>
            <button type="submit" className="btn btn-primary">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
