import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/data';
import DataContext from '../context/DataContext';

const EditPost = () => {
  const {posts,setPosts} = useContext(DataContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts ? posts.find(post => post.id === id):null;


  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
    setLoading(false);
  }, [post]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!post) {
      setError('Post not found.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const datetime = format(new Date(), 'MMMM dd, yyyy p');
      const updatedPost = { ...post, title: editTitle, body: editBody, datetime };
      const response = await api.put(`/posts/${post.id}`, updatedPost);
      const updatedPosts = posts.map(p => (p.id === post.id ? response.data : p));
      setPosts(updatedPosts);
      navigate(`/post/${post.id}`);
    } catch (err) {
      setError('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  if (!post) {
    return <h1 style={{textAlign:'center',color:'red',marginTop:'10%' }}>Post not found.</h1>;
  }

  if (loading) {
    return <h1 style={{textAlign:'center',marginTop:'10%'}}>Loading...</h1>;
  }

 

  return (
    <main className="new-post-form">
      
      <h2>Edit Post</h2>
      <form onSubmit={handleEdit}>
        <label htmlFor="editTitle">Title:</label>
        <input
          id="editTitle"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor="editBody">Body:</label>
        <textarea
          id="editBody"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      {error && <h3 style={{color:'red',textAlign:'center',marginTop:'20px'}} className="error">{error}</h3>}
    </main>
  );
};

export default EditPost;
