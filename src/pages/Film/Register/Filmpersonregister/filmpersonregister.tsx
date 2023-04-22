/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import "./style.css";
import { Text, Button } from "../../../../components/Elements";
import { useLocation, useNavigate } from "react-router-dom";
import { environment } from "../../../../config/environment";
import { Tree } from 'antd';

interface InputData {
  folderName: string
}

export const FilmPersonRegister: React.FC = () => {
  const [FilmForm, setFilmForm] = React.useState([]);
  const [FilmFormdata, setFilmFormdata] = React.useState([]);
  const navigate = useNavigate();
  const [selecteNode, setSelecteNode] = useState("");
  const selectedlable = localStorage.getItem("professionalLable");
  const [lablePath, setLablePath] = useState("");

  let [industrySelectionList, setIndustrySelectionList] = React.useState<any>(
    []
  );

  let location = useLocation().state as InputData;

  useEffect(() => {
    retrieveFilmForm(location.folderName, "professionaldata");
    retrieveProfessionalList();
  }, []);
  const retrieveFilmForm = async (path: string, fileName: string) => {
    let response = await api.get(`form/${path}/${fileName}`)
    let respnseStr = JSON.stringify(response.data);
    var newresponse = respnseStr.replaceAll("title", "label");
    setFilmForm(JSON.parse(newresponse));
  
  };



  const retrieveProfessionalList = async () => {
    let mainLabel = localStorage.getItem("professionalLable") || "";
    const newLabelPath = mainLabel.replace(/\s+/g, "").toLowerCase();
    const mainLablePath = newLabelPath.replace("/", "").toLocaleLowerCase();
    setLablePath(mainLablePath);

    let res = await api.get(
      `form/${mainLablePath}/${environment.professionalData}`
    );
    let respnseStr = JSON.stringify(res.data);
    var newresponse = respnseStr.replaceAll("title", "label");
    setFilmForm(JSON.parse(newresponse));
  };

  const saveUserIndustrySelect = async () => {
    if (selectedlable === "Main Professional") {
      localStorage.setItem("professionalLable", selecteNode);
      retrieveProfessionalList();
    } else {
      navigate("/admin/formbuilders");
    }
    window.location.reload();
  };

  return (
    <>
      <div className="bg-white_A700 flex items-center justify-start mx-auto pb-[76px] w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="bg-bluegray_101 flex font-montserrat items-start justify-end p-[22px] sm:px-5 shadow-bs3 w-full">
            <div className="flex items-center justify-start md:ml-[0] ml-[70px] md:px-5 w-[9%] md:w-full">
              <div className="flex flex-row gap-7 items-center justify-start w-full">
                <Text
                  className="text-left font-medium text-black_900 text-left w-auto"
                  variant="body11"
                >
                  Back
                </Text>
              </div>
            </div>
          </div>
          <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            treeData={FilmFormdata}
          />
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
