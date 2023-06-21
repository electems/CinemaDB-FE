/* eslint-disable react/prop-types */
import React from 'react';
import './app.css'
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers: any = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className=''>
            <a onClick={() => paginate(number)} className='bg-gray_900'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
