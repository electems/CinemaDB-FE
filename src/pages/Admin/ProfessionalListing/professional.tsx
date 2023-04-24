/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import { api } from "../../../services/api";
import { environment } from "../../../config/environment";
import { DataNode } from "antd/es/tree";
import { EditableAntdTree } from "../../../components/editablantd/EditableAntdTree";

const type = [
  {
    type: "forms",
  },
  {
    type: "choice",
  },
];

const ProfessionalListing: React.FC = () => {

  const [industrySelectionList, setIndustrySelectionList] = React.useState<DataNode[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    retrieveMainProfessional();
    console.log(industrySelectionList);
  }, []);

  const retrieveMainProfessional = async () => {
    const response = await api.get(
      `form/${environment.mainProfessionalPath}/${environment.professionalData}`)

      const data =  await response.data
      const temp:DataNode[] = []
      temp.push(
        {"key":"0","title":"Main Professional","isLeaf":false,"children":[]}
      );

      for(let i = 0; i < 200 ; i++) {
        if(data[i] !== undefined) {
          temp.push(data[i])
        } else {
          break;
        }      
      }    
      setIndustrySelectionList(temp)
  };

  const navigateToChoiceOrForms = () => {
    navigate(`/admin/professionalTree`);
  };

  const editSelectedIndustry = (label: string) => {
    localStorage.setItem("selectedLabel", label);
    if (label === "Main Professional") {
      setShowModal(false);
      navigate("/admin/professionalTree");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <AdminHeader />
      <h1 id="professionalList" className="title">
        Core Professional List
      </h1>
      {industrySelectionList.length > 0 &&
        <div >
        <EditableAntdTree source="level1" size="md" treeData={industrySelectionList} 
          />
        </div>
      }
    </>
  );
};

export default ProfessionalListing;
