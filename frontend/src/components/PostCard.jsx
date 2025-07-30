import { Link } from 'react-router-dom';
import '../styles/PostCard.css';

function PostCard({ post, isAdmin, onDelete }) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden post-card transition-transform" style={{ transition: 'transform 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <img src={post.imageURL} className="card-img-top img-fluid" alt={post.title} style={{ objectFit: 'cover', height: '200px' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{post.title}</h5>
        <p className="card-subtitle text-muted mb-2 small">{post.category} | {post.author}</p>
        <p className="card-text flex-grow-1">{post.content.slice(0, 100)}...</p>
        <div className="d-flex gap-2 mt-2">
          <Link to={`/post/${post._id}`} className="btn btn-outline-primary btn-sm">
            Read More
          </Link>
          {isAdmin && (
            <>
              <Link to={`/edit/${post._id}`} className="btn btn-outline-secondary btn-sm">Edit</Link>
              <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete && onDelete(post._id)}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
