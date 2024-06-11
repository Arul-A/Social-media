import React from 'react';
import Post from './Post';

const Feed = ({ searchResults }) => {
  return (
    <div className="feed">
      <ol className="post-list">
        {searchResults.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ol>
    </div>
  );
}

export default Feed;
