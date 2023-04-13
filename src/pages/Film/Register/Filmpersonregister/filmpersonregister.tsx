/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from "react";
import { api } from "../../../../services/api";
import { Film } from "./style";
import DropdownTreeSelect from "react-dropdown-tree-select";
import Header from "../../../../components/Header";
export const FilmPersonRegister: React.FC = () => {
  const [FilmForm, setFilmForm] = React.useState([]);

  useEffect(() => {
    retrieveFilmForm("EN", "registration");
  }, []);
  const retrieveFilmForm = (language: string, formLayout: string) => {
    api
      .get(`form/${language}/${formLayout}`)
      .then((response) => {
        setFilmForm(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Header />
      <h1>Film Person Register</h1>
      <Film>
        <DropdownTreeSelect data={FilmForm} className="bootstrap-demo" />
      </Film>
    </>
  );
};
