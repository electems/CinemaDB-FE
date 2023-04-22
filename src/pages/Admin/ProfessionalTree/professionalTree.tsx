/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-dupe-keys */
import * as React from "react";
import { api } from "../../../services/api";
import { environment } from "../../../config/environment";
import { useEffect, useState } from "react";
import AdminHeader from "../../../components/AdminHeader";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { EditableAntdTree } from "editable-antd-tree"; 

import "editable-antd-tree/dist/esm/output.css";

const ProfessionalTree = () => {
  const [lablePath, setLablePath] = useState("");
  const [lable, setLable] = useState("");
  const navigate = useNavigate();
  let [industrySelectionList, setIndustrySelectionList] = React.useState<any>(
    []
  );


  useEffect(() => {
    retrieveProfessionalList();
  }, []);

  const retrieveProfessionalList = async () => {
    let mainLabel = localStorage.getItem("selectedLabel") || "";
    setLable(mainLabel);
    const newLabelPath = mainLabel.replace(/\s+/g, "").toLowerCase();
    const mainLablePath = newLabelPath.replace("/", "").toLocaleLowerCase();
    setLablePath(mainLablePath);

    let res = await api.get(
      `form/${mainLablePath}/${environment.professionalData}`
    );
    console.log(res.data.error);
    if (res.data.error != "FILE_NOT_FOUND") {
      setIndustrySelectionList(res.data);
    } else {
      setIndustrySelectionList([{}]);
    }
  };

  const saveProfessional = async () => {	
    await api.post(`form/${lablePath}/${environment.professionalData}`, industrySelectionList);	
    navigate("/admin/professional");	
  };


  function onClickcancle() {
    navigate("/admin/professionalListing");
  }

  return (
    <>
      <AdminHeader />
      <h1 className="title">{lable}</h1>
      <br />
      <div style={{ height: 400 }}>
        <EditableAntdTree treeData={industrySelectionList} />
        <button
          className="btn btn-success mr-4"
          onClick={() => saveProfessional()}
          type="submit"
        >
          Save
        </button>
        <button
          id="profcancle"
          className="btn btn-danger"
          type="submit"
          onClick={() => onClickcancle()}
        >
          Cancle
        </button>
      </div>
    </>
  );
}
export default ProfessionalTree;
