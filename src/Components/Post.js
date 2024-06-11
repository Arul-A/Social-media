import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post}) => {
  return (
    <li className="post">
      <Link to={`post/${post.id}`} style={{textDecoration:'none'}}>
        <h2>{post.title}</h2>
        <p>{post.datetime}</p>
        <p>{post.body}</p>
      </Link>
    </li>
  );
}

export default Post;
