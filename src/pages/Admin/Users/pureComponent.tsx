/* eslint-disable react/display-name */
/* eslint-disable no-redeclare */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';

interface Item {
  id: number;
  content: string;
}

const Item: React.FC<{ id: number; content: string }> = React.memo(({ id, content }) => {
  console.log(`Rendering Item ${id}`);
  return <li>{content}</li>;
});

const TestingApp: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addItem = useCallback(() => {
    if (inputValue.trim() !== '') {
      setItems((prevItems) => [...prevItems, { id: Date.now(), content: inputValue }]);
      setInputValue('');
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <Item key={item.id} id={item.id} content={item.content} />
        ))}
      </ul>
    </div>
  );
};

export default TestingApp;
