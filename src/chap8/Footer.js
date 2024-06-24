import PropTypes from 'prop-types';

const Footer = ({ length }) => {
  return (
    <footer>
      <p>
        {length} List {length === 1 ? 'item' : 'items'}
      </p>
    </footer>
  );
};

Footer.propTypes = {
  length: PropTypes.number.isRequired
};

export default Footer;
