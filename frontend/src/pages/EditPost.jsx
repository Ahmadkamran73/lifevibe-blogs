import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../App.jsx';

function EditPost() {
  const { isAdmin, checkAdminStatus } = useContext(AdminContext);
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    const fetchPost = async () => {
      try {
        const res = await fetch(`/posts/${id}`);
        const data = await res.json();
        setForm(data);
      } catch {
        setError('Failed to fetch post');
      }
    };
    fetchPost();
  }, [isAdmin, navigate, id]);

  if (!isAdmin) {
    return null;
  }

  if (!form) return <div className="container py-5 text-center">Loading...</div>;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update post');
      setSuccess('Post updated successfully!');
      setTimeout(() => navigate(`/post/${id}`), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold text-center">Edit Post</h1>
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
            <button type="submit" className="btn btn-success">Update Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
    