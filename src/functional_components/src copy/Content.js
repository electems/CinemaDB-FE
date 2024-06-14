import { useState } from 'react';
const Content = () => {
  const handleNameChange = () => {
    const names = ['Bob', 'Kevin', 'Dave'];
    const int = Math.floor(Math.random() * 3);
    name = names[int];
  }

  var name = useState('initial')

  return (
        <main>
            <h1>Login</h1>
            <p>
                Hello {name}!
            </p>
            {handleNameChange()}
        </main>
  )
}

export default Content
