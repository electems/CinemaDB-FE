import React from 'react';

const ComponentA: React.FC = () => {
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong')
  }
  return (
    <>
      <h1>ComponentA </h1>
      <p>This is ComponentA A.</p>
    </>
  );
};

export default ComponentA;
