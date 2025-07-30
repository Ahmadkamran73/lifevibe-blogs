import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/posts/${id}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="container py-5 text-center"><div className="spinner-border text-primary" /></div>;
  if (error) return (
    <div className="container py-5 text-center">
      <h2 className="text-danger mb-3">{error}</h2>
      <Link to="/" className="btn btn-outline-primary">Back to Home</Link>
    </div>
  );
  if (!post) return null;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            {post.imageURL && <img src={post.imageURL} className="card-img-top" alt={post.title} style={{ objectFit: 'cover', maxHeight: 350 }} />}
            <div className="card-body">
              <h2 className="card-title fw-bold mb-2">{post.title}</h2>
              <div className="mb-2 text-muted small">{post.category} | {post.author} | {new Date(post.createdAt).toLocaleString()}</div>
              <p className="card-text fs-5">{post.content}</p>
              <Link to="/" className="btn btn-outline-primary mt-3">Back to All Posts</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
