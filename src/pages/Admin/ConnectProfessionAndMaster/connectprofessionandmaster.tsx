/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'
import { toastify } from '../../../services/filmservices'
interface InputData {
  label
}
const ConnectProfessionAndMaster: React.FC = () => {
  const [masterTemplateDirectoryList, setMasterTemplateDirectoryList] = React.useState([])
  const [selectedMasters, setSelectedMasters] = React.useState([''])
  const [changedOrderMasters, setChangedOrderMasters] = React.useState([''])
  const inputData = useLocation().state as InputData
  const navigate = useNavigate()
  let index: any
  React.useEffect(() => {
    retriveDirectories(environment.masterFormPath)
    retriveFormlayout()
  }, [])

  const retriveDirectories = async (path: string) => {
    const res = await api.get(`form/${path}`)
    const responseData = await res.data
    for (let i = 0; i < responseData.length; i++) {
      responseData[i] = responseData[i].replaceAll('_', ' ');
    }
    setMasterTemplateDirectoryList(responseData)
  }
  const retriveFormlayout = async () => {
    const labelPath = inputData.label.replaceAll(' ', '_')
    const res = await api.get(`form/readfile/${environment.formLayoutPath}/${labelPath}/${environment.professionalData}`)
    const retriveUserSubcategory = await res.data
    if (retriveUserSubcategory !== 'FILE_NOT_FOUND') {
      setSelectedMasters(retriveUserSubcategory)
    } else {
      setSelectedMasters([])
    }
  }

  const onChange = (event, title) => {
    if (event.target.value === "") {
      event.preventDefault();
    }
    const removeIndex = selectedMasters.indexOf(title)
    if (removeIndex !== -1) {
      selectedMasters.splice(removeIndex, 1)
    }
    if (event.target.value != "") {
      selectedMasters.splice(Number(event.target.value), 0, title)
    }
    setChangedOrderMasters(selectedMasters)
  };

  const onValue = (items) => {
    const checkItemContains = selectedMasters.includes(items)
    if (checkItemContains === true) {
      index = selectedMasters.indexOf(items)
    } else {
      index = ""
    }
    return index
  }

  const saveUserSubCategoryType = async () => {
    const labelPath = inputData.label.replaceAll(' ', '_')
    await api.post(`form/writefile/${environment.formLayoutPath}/${labelPath}/${environment.professionalData}`, changedOrderMasters)
    await toastify("User Subcategory Type Saved Successfully")
  }

  function onClickCancel () {
    navigate('/admin/professionforms')
  }
  return (
    <>
      <AdminHeader />
      <h3 className="title text-center pt-3">Connect Profession And Master Form - {inputData.label}</h3>

      <div className="relative overflow-x-auto px-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Main</th>
              <th className="px-6 py-3">Index Position</th>
            </tr>
          </thead>
          <tbody>
            {masterTemplateDirectoryList.length && selectedMasters.length > 0
              ? masterTemplateDirectoryList.map((item) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-3">{item}</td>
                    <td className="px-6 py-3">
                      <input type="text" id="nome" className='w-10 gap-4 bg-gray-50 border text-gray-900 text-sm rounded-md' onChange={event => onChange(event, item)} defaultValue={onValue(item)} />
                    </td>
                  </tr>
                )
              })
              : "Data is not available"}
          </tbody>
        </table>
        <div className="profession-master-button text-center">
          <button onClick={saveUserSubCategoryType} type="button" className="btn btn-success">Save</button>
          <button onClick={onClickCancel} type="button" className="btn btn-danger ml-3">Cancel</button>
        </div>
      </div>
    </>
  )
}

export default ConnectProfessionAndMaster
