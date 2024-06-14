import PropTypes from 'prop-types';

function PropDrill ({ getAnimal }) {
  return (
        <div>Show animal(prop drill implementation) : {getAnimal()}</div>
  );
}

PropDrill.propTypes = {
  getAnimal: PropTypes.func.isRequired
};

export default PropDrill;
