import InstituteCard from './InstituteCard';
import PropTypes from 'prop-types'; // Correct import for PropTypes

const TrainingInstitutesList = ({ institutes }) => (
    <div className="institutes-list">
        {institutes.map((institute, index) => (
            <InstituteCard key={index} image={institute.linkedinUrl} title={institute.nameOfTheFilmInstitute} />
        ))}
    </div>
);

TrainingInstitutesList.propTypes = {
  institutes: PropTypes.array.isRequired // Correctly using PropTypes
};

export default TrainingInstitutesList;
