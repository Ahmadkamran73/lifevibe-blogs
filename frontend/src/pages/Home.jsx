import PostList from '../components/PostList';
import { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../App.jsx';

function Home() {
  const { isAdmin } = useContext(AdminContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-light min-vh-100">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light min-vh-100">
        <div className="container py-5 text-center">
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="mb-4 fw-bold text-center">Latest Posts</h1>
        {isAdmin && (
          <div className="text-end mb-3">
            <a href="/add" className="btn btn-success">Add New Post</a>
          </div>
        )}
        <PostList posts={posts} isAdmin={isAdmin} />
      </div>
    </div>
  );
}

export default Home;
