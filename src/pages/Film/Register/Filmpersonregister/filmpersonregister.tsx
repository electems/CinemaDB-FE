/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from "react";
import { api } from "../../../../services/api";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "./style.css";
import { Text, Button } from "../../../../components/Elements";
import { useNavigate } from "react-router-dom";
const selectedNodes: any[] = [];
export const FilmPersonRegister: React.FC = () => {
  const [FilmForm, setFilmForm] = React.useState([]);
  const [saveUser, setSaveUser] = React.useState();
  const navigate = useNavigate();
  const emailPhone = localStorage.getItem("emailphone");
  const token = localStorage.getItem("@cinimaDb:Token");
  useEffect(() => {
    retrieveFilmForm("EN", "registration");
  }, []);
  const retrieveFilmForm = async (language: string, formLayout: string) => {
    await api
      .get(`form/${language}/${formLayout}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFilmForm(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onChange = (nodeSelected: any) => {
    selectedNodes.push(nodeSelected);
  };
  const saveUserIndustrySelect = async () => {
    const userObj = {
      id: 5,
      industrySelection: selectedNodes,
      step: selectedNodes[0].label,
      email: emailPhone,
      //These fileds are added because these are required filed in the backend
      password: "harsha",
      firstName: "Alice",
      lastName: "Hartmann",
      filmIndustry: "sandalhood",
      status: "ACTIVE",
      role: "USER",
    };
    await api
      .post(`users/createuser`, userObj)
      .then((response) => {
        setSaveUser(response.data);
        navigate("/film/register/selectedindustry");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="bg-white_A700 flex items-center justify-start mx-auto pb-[76px] w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="bg-bluegray_101 flex font-montserrat items-start justify-end p-[22px] sm:px-5 shadow-bs3 w-full">
            <div className="flex items-center justify-start md:ml-[0] ml-[70px] md:px-5 w-[9%] md:w-full">
              <div className="flex flex-row gap-7 items-center justify-start w-full">
                <Text
                  className="font-medium text-black_900 text-left w-auto"
                  variant="body11"
                >
                  Back
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-montserrat gap-5 items-start justify-start mt-10 md:px-5 w-[35%] md:w-full">
            <DropdownTreeSelect
              data={FilmForm}
              onChange={onChange}
              className="bootstrap-demo font-bold text-center text-gray_800 w-auto"
            />
            <div className="md:h-80 sm:h-[529px] h-[552px] relative w-full">
              <div className="absolute flex flex-col h-full inset-[0] items-start justify-center m-auto w-full">
                <div className="flex sm:flex-col flex-row gap-[22px] items-center justify-start w-[76%] md:w-full">
                  <div className="flex h-[60px] md:h-auto items-center justify-center p-[25.38px] sm:px-5 w-[325px]"></div>
                </div>
                <div className="h-[120px] sm:h-[153px] md:h-[82px] ml-0.5 md:ml-[0] mt-1.5 relative w-full"></div>
              </div>
            </div>
          </div>
          <Button
            className="bg-red_A700 cursor-pointer font-roboto font-semibold leading-[normal] min-w-[1363px] md:min-w-full mt-3.5 py-[29px] rounded-[17px] sm:text-3xl md:text-[32px] text-[34px] text-center text-white_A700 w-auto"
            onClick={() => saveUserIndustrySelect()}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};
