/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-dupe-keys */
import * as React from "react";

import { api } from "../../../services/api";
import { environment } from "../../../config/environment";
import { Context } from "../../../contexts/contextLogin";
import { useEffect, useState } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import SortableTree, {
  ExtendedNodeData,
  addNodeUnderParent,
  changeNodeAtPath,
  removeNodeAtPath,
  getNodeAtPath,
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
import UserHeader from "../../../components/UserHeader";
import { useNavigate } from "react-router-dom";


const Jsoneditor = () => {
  const { professionalDataJSONToEditorFormat } = React.useContext(Context);
  const [lablePath, setLablePath] = useState("");
  const [lable, setLable] = useState("");
  const navigate = useNavigate();
  let [industrySelectionList, setIndustrySelectionList] = React.useState<any>(
    []
  );
  const ref = React.useRef<HTMLInputElement>(null);

  const getNodeKey = ({ treeIndex }: { treeIndex: any }) => treeIndex;

  useEffect(() => {
    retrieveProfessionalList();
  }, []);

  const retrieveProfessionalList = async() => {
    let mainLabel = localStorage.getItem("selectedLabel") || "";
    setLable(mainLabel)
    const newLabelPath = mainLabel.replace(/\s+/g, "").toLowerCase();
    const mainLablePath =newLabelPath.replace("/" ,"").toLocaleLowerCase()
    setLablePath(mainLablePath);

    let res =await api
      .get(
        `form/${mainLablePath}/${environment.professionalData}`
      )
      console.log(res.data.error)
      if(res.data.error != 'file not found'){
       
        setIndustrySelectionList(res.data);
      }else{
        setIndustrySelectionList([{}]);
      }
    
  };

  const saveMainProfessional = async (path: string, formLayout: string) => {
    path = lablePath;
    await api.post(`form/${path}/${formLayout}`, industrySelectionList);
    navigate("/admin/professional");
  };

  async function addNodeChild(rowInfo: { path: any }) {
    let { path } = rowInfo;

    const value = ref.current?.value;
    // const value = inputEls.current[treeIndex].current.value;

    if (value === "") {
      ref.current?.focus;
      // inputEls.current[treeIndex].current.focus();
      return;
    }
    if (lable !== "Main Professional"){
    let newTree = addNodeUnderParent({
      treeData: industrySelectionList,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey,
      newNode: {
        title: value,
      },
     
    });
    setIndustrySelectionList(newTree.treeData);
    await api.post(`form/${lablePath}/${value}`, newTree.treeData);
  }
    // inputEls.current[treeIndex].current.value = "";
  }

  function removeNode(rowInfo: ExtendedNodeData<unknown>) {
    const { path } = rowInfo;
    setIndustrySelectionList(
      removeNodeAtPath({
        treeData: industrySelectionList,
        path,
        getNodeKey
      })
    );
  }
  function createNode() {
    const value = ref.current?.value;

    if (value === "") {
      ref.current?.focus();
      return;
    }
    let newTree = addNodeUnderParent({
     treeData: industrySelectionList,
      parentKey:'',
      expandParent: true,
      getNodeKey,
      newNode: {
        id: "123",
        title: value
      }
    });

    setIndustrySelectionList(newTree.treeData);

  }
  function onClickcancle(){
    navigate("/admin/professional");
  }


  return (
    <>
    <UserHeader/>
    <h1 className="title">{lable}</h1>
    <br/>
    <div className="row ">
      <div className="col">
      <div className="input-group w-25">
      <input
        ref={ref}
        type="text"
        id="userinput"
        className="form-control mr-8 "
        placeholder="Username"
        aria-describedby="basic-addon1"
      />  
       <br />
        <button  className="btn btn-primary" onClick={createNode}>Create Node</button>
        <br />
        </div>
        </div>
        </div>
      <div style={{ height: 400 }}>
        <SortableTree
          generateNodeProps={(rowInfo) => ({
            // title: rowInfo.node.label,
            // subtitle: rowInfo.node.subTitle,
            buttons: [
              <div>
                <button
                id="addChild"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2"
                  placeholder="Add Child"
                  onClick={(event) => addNodeChild(rowInfo)}
                >
                  Add Child
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2" placeholder="Delete" onClick={(event) => removeNode(rowInfo)}>
                  Remove
                </button>
              </div>,
              
            ],
            style: {
              height: "50px",
            },
          })}
          treeData={industrySelectionList}
          onChange={(data) => setIndustrySelectionList(data)}
        />
        <button
          className="btn btn-success mr-4"
          onClick={() =>
            saveMainProfessional(lablePath, environment.professionalData)
          }
          type="submit"
        >
          Save
        </button>
        <button
        id="profcancle"
          className="btn btn-danger"
          type="submit"
          onClick={() =>
            onClickcancle()
          }
        >
          Cancle
        </button>
      </div>
    </>
  );
};
export default Jsoneditor;
