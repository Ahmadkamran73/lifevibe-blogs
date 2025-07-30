import PostCard from './PostCard';
import { useState } from 'react';

function PostList({ posts, isAdmin }) {
  const [postList, setPostList] = useState(posts);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete post');
      setPostList(postList.filter(post => post._id !== id));
      alert('Post deleted successfully');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {postList.map(post => (
          <div className="col-12 col-sm-6 col-lg-4" key={post._id}>
            <PostCard post={post} isAdmin={isAdmin} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
