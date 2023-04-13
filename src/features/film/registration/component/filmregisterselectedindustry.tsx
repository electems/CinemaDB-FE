import React, { useEffect } from 'react';

import './index.css';
import LoginService from '@/Service/login.service';

export default function Header() {
  useEffect(() => {
    retrieveFilmForm('EN', 'registration');
  }, []);
  const [FilmForm, setFilmForm] = React.useState([]);
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
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="logo"></div>
          <div className="nav-elements">
            <ul>
              {FilmForm.map(function (item, i) {
                return <li key={i}>{item.label}</li>;
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
