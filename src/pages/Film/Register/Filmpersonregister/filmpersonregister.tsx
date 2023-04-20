/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import DropdownTreeSelect, { TreeNode } from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css';
// import CheckboxTree from 'react-checkbox-tree'
import "./style.css";
import { Text, Button } from "../../../../components/Elements";
import { useNavigate } from "react-router-dom";
let selectedNodes: any[] = [];
export const FilmPersonRegister: React.FC = () => {
  const [FilmForm, setFilmForm] = React.useState([]);
  const [saveUser, setSaveUser] = React.useState();
  const navigate = useNavigate();
  const emailPhone = localStorage.getItem("emailphone");
  const token = localStorage.getItem("@cinimaDb:Token");
  useEffect(() => {
    retrieveFilmForm("mainprofessional", "professionaldata");
  }, []);
  const retrieveFilmForm = async (language: string, formLayout: string) => {
    await api
      .get(`form/${language}/${formLayout}`)
      .then((response) => {
        let respnseStr = JSON.stringify(response.data);
        var newresponse = respnseStr.replaceAll("title", "label");
        setFilmForm(JSON.parse(newresponse));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  const onChange = (currentNode: TreeNode, selectedNodes: TreeNode[]) => {
    const temp = selectedNodes
    selectedNodes = [];
    selectedNodes = temp;
  }


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
  // function Widget() {
  //   const [checked, setChecked] = useState([]);
  //   const [expanded, setExpanded] = useState([]);
  // }
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
          <div>
            <DropdownTreeSelect
              data={FilmForm}
              onChange={onChange}
              className="mdl-demo"
              mode={"radioSelect"}
            />    

              {/* <CheckboxTree
                       nodes={nodes}
                       checked={checked}
                       expanded={expanded}
                       onCheck={(checked) => setChecked(checked)}
                       onExpand={(expanded) => setExpanded(expanded)}
                    />         */}
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
