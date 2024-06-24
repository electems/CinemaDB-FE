import InstituteCard from './InstituteCard';
import PropTypes from 'prop-types';

const TrainingInstitutesList = ({ institutes }) => (
    <div className="institutes-list">
        {institutes.map((institute, index) => (
            <InstituteCard key={index} image={institute.linkedinUrl} title={institute.nameOfTheFilmInstitute} />
        ))}
    </div>
);

TrainingInstitutesList.propTypes = {
  institutes: PropTypes.array.isRequired
};

export default TrainingInstitutesList;
