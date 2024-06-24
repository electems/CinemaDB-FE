import PropTypes from 'prop-types';
import PropDrill from './PropDrill';

function Prop ({ name }) {
  const [creature, propFunction] = name;
  return (
        <div>
            <h1>Show animal: {creature}</h1>
            <PropDrill getAnimal={propFunction}/>
        </div>
  );
}

Prop.propTypes = {
  name: PropTypes.array.isRequired
};

export default Prop;
