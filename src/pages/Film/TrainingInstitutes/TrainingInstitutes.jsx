// import Header from './Header';
// import Footer from './Footer';
// import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import TrainingInstitutesList from './TrainingInstituteList';
import Header from '../../../components/MainScreenHeader/mainscreenheader';
import { api } from '../../../services/api';
import Footer from '../../../components/Footer/footer';
import './Styles/TrainingInstitutes.css'

const TrainingInstitutes = () => {
  const [institutesData, setInstitutesData] = useState([]);
  const fetchInstitutes = async () => {
    try {
      const response = await api.get('fileupload/get/filmInstitutes/1')
      console.log(response.data)
      const items = []
      response.data.map((institute) => { return items.push(institute) })
      setInstitutesData(items)
    } catch (error) {
      console.error('Error fetching institutes data:', error)
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  return (
        <div className="training-institutes">
            {/* <SearchBar /> */}
          <Header className="bg-gray_800 flex md:flex-col flex-row md:gap-5 items-center justify-center md:px-5 w-full" />
            <main>
                <h1 style={{ color: 'yellow' }}>Film Training Institutes</h1>
                <TrainingInstitutesList institutes={institutesData} />
            </main>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center mt-[97px] md:px-5 w-full" />
        </div>
  );
};

export default TrainingInstitutes;
