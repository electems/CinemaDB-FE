import { useEffect, useState } from 'react';
import TrainingInstitutesList from './TrainingInstituteList';
import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { api } from '../../../services/api';
import Footer from '../../../components/Footer/footer';
import './Styles/TrainingInstitutes.css';

const TrainingInstitutes = () => {
  const [institutesData, setInstitutesData] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(0);

  function paginate (array, parts) {
    const result = [];
    const chunkSize = Math.ceil(array.length / parts);
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  const fetchInstitutes = async () => {
    try {
      const response = await api.get('fileupload/get/filmInstitutes/1');
      const items = [];
      response.data.map((institute) => items.push(institute));
      const paginated = paginate(items, 5);
      setInstitutesData(paginated);
    } catch (error) {
      console.error('Error fetching institutes data:', error);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  return (
    <main className="training-institutes">
      <Header className="bg-gray_800 flex md:flex-col flex-row md:gap-5 items-center justify-center md:px-5 w-full" />
      <center>
        <main>
          <h1 style={{ color: 'yellow' }}>Film Training Institutes</h1>
          <TrainingInstitutesList institutes={institutesData[currentPage]} />
        </main>
        <div style={{ margin: '10% 40%', display: 'flex' }}>
          {[0, 1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={page === currentPage}
              style={{ backgroundColor: 'white', padding: '10px', marginLeft: '10px' }}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </center>
      <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[97px] md:px-5 w-full" />
    </main>
  );
};

export default TrainingInstitutes;
