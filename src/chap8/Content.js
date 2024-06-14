import PropTypes from 'prop-types';
import ItemList from './ItemList';

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length
        ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
          )
        : (
        <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
          )}
    </main>
  );
};

Content.propTypes = {
  items: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Content;
