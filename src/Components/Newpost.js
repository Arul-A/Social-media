import React, { useContext } from 'react';
import DataContext from '../context/DataContext';

const Newpost = () => {
  const { newTitle, setNewTitle, newBody, setNewBody, handleSubmit} = useContext(DataContext)
  return (
    <form className="new-post-form" onSubmit={handleSubmit}>
      <h2>New Post</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        required
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <label htmlFor="body">Body</label>
      <textarea
        id="body"
        required
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Newpost;
