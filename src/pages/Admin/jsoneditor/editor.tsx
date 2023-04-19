/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-dupe-keys */
import * as React from "react";

import { api } from "../../../services/api";
import { environment } from "../../../config/environment";
import { Context } from "../../../contexts/contextLogin";
import { useEffect, useState } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import SortableTree, {
  addNodeUnderParent,
  getNodeAtPath,
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
let mainLabel = localStorage.getItem("selectedLabel") || "";
const mainLabelPath = mainLabel.replace(/\s+/g, "").toLowerCase();

const Jsoneditor = () => {
  const { professionalDataJSONToEditorFormat } = React.useContext(Context);

  let [industrySelectionList, setIndustrySelectionList] = React.useState<any>(
    []
  );
  const ref = React.useRef<HTMLInputElement>(null);

  const getNodeKey = ({ treeIndex }: { treeIndex: any }) => treeIndex;

  useEffect(() => {
    retrieveProfessionalList();
  }, []);

  const retrieveProfessionalList = () => {
    api
      .get(
        `form/${environment.mainProfessionalPath}/${environment.professionalData}`
      )
      .then((res) => {
        setIndustrySelectionList(res.data);
      });
  };

  const saveMainProfessional = async (path: string, formLayout: string) => {
    path = mainLabelPath;
    await api.post(`form/${path}/${formLayout}`, industrySelectionList);
    //setSavedMainProfession(res.data);
  };
  function addNodeChild(rowInfo: { path: any }) {
    let { path } = rowInfo;

    const value = ref.current?.value;
    // const value = inputEls.current[treeIndex].current.value;

    if (value === "") {
      ref.current?.focus;
      // inputEls.current[treeIndex].current.focus();
      return;
    }

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

    // inputEls.current[treeIndex].current.value = "";
  }
  return (
    <>
      <input
        ref={ref}
        type="text"
        className="form-control"
        placeholder="Username"
        aria-describedby="basic-addon1"
      />
      <div style={{ height: 400 }}>
        <SortableTree
          generateNodeProps={(rowInfo) => ({
            // title: rowInfo.node.label,
            // subtitle: rowInfo.node.subTitle,
            buttons: [
              <div>
                <button
                  placeholder="Add Child"
                  onClick={(event) => addNodeChild(rowInfo)}
                >
                  Add Child
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
          className="btn btn-primary"
          onClick={() =>
            saveMainProfessional(mainLabelPath, environment.professionalData)
          }
          type="submit"
        >
          Save
        </button>
      </div>
    </>
  );
};
export default Jsoneditor;
