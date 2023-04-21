/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../../components/UserHeader";
import { api } from "../../../services/api";
import { environment } from "../../../config/environment";
import { Context } from "../../../contexts/contextLogin";

interface IndustrySelectionItem {
  title: string;
}

const type = [
  {
    type: "forms",
  },
  {
    type: "choice",
  },
];

const Professional: React.FC = () => {
  const { professionalDataJSONToEditorFormat } = useContext(Context);
  let [directoryList, setDirectoryList] = React.useState([]);

  let [industrySelectionList, setIndustrySelectionList] = React.useState<
    IndustrySelectionItem[]
  >([]);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    retrieveMainProfessional(
      environment.mainProfessionalPath,
      environment.professionalData
    );
    retriveDirectories("formlayout");
  }, []);

  const retrieveMainProfessional = async (path: string, fileName: string) => {
    let res = await api.get(`form/${path}/${fileName}`);
    setIndustrySelectionList(professionalDataJSONToEditorFormat(res));
  };



  const retriveDirectories = async (path: string) => {
    let res = await api.get(`form/${path}`);
    setDirectoryList(res.data);
  };

  const navigateToChoiceOrForms = (type: string) => {
    navigate(`/admin/${type}`);
  };

  const editSelectedIndustry = (label: string) => {
    localStorage.setItem("selectedLabel", label);
    if (label === "Main Professional") {
      setShowModal(false);
      navigate("/admin/editors");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <UserHeader />
      <h1 id="professionalList"className="title">Core Professional List</h1>

      <div className="relative overflow-x-auto px-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Main</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {industrySelectionList.map((item: IndustrySelectionItem) => {
              return (
                <tr id="tableTitle" className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
              );
            })}
            {showModal ? (
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
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Professional;
