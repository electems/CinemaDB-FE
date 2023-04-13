/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';

import LoginService from '@/Service/login.service';
import './index.css';
const data: any[] = [];
export const App: React.FC = () => {
  const [FilmForm, setFilmForm] = React.useState([]);
  const [SelectedCheckBox, setSelectedCheckBox] = React.useState([]);
  const [saveUser, setSaveUser] = React.useState();

  useEffect(() => {
    retrieveFilmForm('EN', 'registration');
  }, []);
  const retrieveFilmForm = (language: string, formLayout: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    LoginService.getRegistrationForm(language, formLayout)
      .then((response) => {
        setFilmForm(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onChange = (selectedNodes: any) => {
    console.log(selectedNodes);
    data.push(selectedNodes);
  };
  const saveTutorial = () => {
    const datas = {
      industrySelection: data,
      step: data[0].label,
      email: 'adarash@cool.org',
      firstName: 'Alice',
      lastName: 'Hartmann',
      filmIndustry: 'sandalhood',
      status: 'ACTIVE',
      role: 'USER',
    };

    LoginService.createUser(datas)
      .then((response) => {
        setSaveUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h1>Film Person Register</h1>
      <DropdownTreeSelect data={FilmForm} className="bootstrap-demo" onChange={onChange} />
      <button onClick={() => saveTutorial()} type="submit">
        save
      </button>
    </>
  );
};
