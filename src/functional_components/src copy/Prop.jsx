import PropTypes from 'prop-types';

function Prop ({ name }) {
  return (
        <div>
            <h1>Show animal: {name}</h1>
        </div>
  );
}

Prop.propTypes = {
  name: PropTypes.string.isRequired
};

export default Prop;
