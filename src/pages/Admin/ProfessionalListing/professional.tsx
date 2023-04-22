/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import { api } from "../../../services/api";
import { environment } from "../../../config/environment";
import { DataNode } from "antd/es/tree";

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

      <div className="relative overflow-x-auto px-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Main</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {industrySelectionList.map((item, i) =>(               
                <tr
                  id="tableTitle"
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td>{item.title}</td>
                  <td>
                    <button
                      id="editIndustry"
                      className="bg-blue-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => editSelectedIndustry(item.title)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>              
            ))}
             <td>{showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Select Type</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="flex ...">
                          <div className="contents">
                            {type.map((item) => {
                              return (
                                <div
                                  id="popupButton"
                                  onClick={() =>
                                    navigateToChoiceOrForms()
                                  }
                                  className="flex-1 ..."
                                >
                                  {item.type}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          id="close"
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null} </td>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfessionalListing;
