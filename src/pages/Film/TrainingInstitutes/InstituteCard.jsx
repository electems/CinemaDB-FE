import PropTypes from 'prop-types'; // Correct import for PropTypes

const InstituteCard = ({ image, title }) => (
    <div className="institute-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
    </div>
);

InstituteCard.propTypes = {
  image: PropTypes.string.isRequired, // Correct usage of PropTypes
  title: PropTypes.string.isRequired // Correct usage of PropTypes
};

export default InstituteCard;
