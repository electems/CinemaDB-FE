import React from 'react';
import PropTypes from 'prop-types';

const NewPost = ({
  handleSubmit, postTitle, setPostTitle, postBody, setPostBody
}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

NewPost.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postTitle: PropTypes.string.isRequired,
  setPostTitle: PropTypes.func.isRequired,
  postBody: PropTypes.string.isRequired,
  setPostBody: PropTypes.func.isRequired
};

export default NewPost;
