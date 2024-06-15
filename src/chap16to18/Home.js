import React from 'react';
import PropTypes from 'prop-types';
import Feed from './Feed';

const Home = ({ posts }) => {
  return (
    <main className="Home">
      {posts.length
        ? (
          <Feed posts={posts} />
          )
        : (
          <p style={{ marginTop: '2rem' }}>
            No posts to display.
          </p>
          )}
    </main>
  );
}

Home.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
      // Add other required properties of 'post' as needed
    })
  ).isRequired
};

export default Home;
