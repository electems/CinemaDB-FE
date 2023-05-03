/* eslint-disable quotes */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import AdminHeader from '../../../components/AdminHeader'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'
import { toastify } from '../../../services/filmservices'
import { Button } from '../../../components/Elements'
interface InputData {
  label
}
const ConnectProfessionAndMaster: React.FC = () => {
  const [masterTemplateDirectoryList, setMasterTemplateDirectoryList] = React.useState([])
  const [selectedMasters, setSelectedMasters] = React.useState([''])
  const [changedOrderMasters, setChangedOrderMasters] = React.useState([''])
  const inputData = useLocation().state as InputData
  let index: any
  React.useEffect(() => {
    retriveDirectories(environment.masterFormPath)
    retriveFormlayout()
  }, [])

  const retriveDirectories = async (path: string) => {
    const res = await api.get(`form/${path}`)
    const responseData = JSON.stringify(await res.data)
    const replaceUnderscoreToSpace = responseData.replaceAll('_', " ")
    const parseToJson = JSON.parse(replaceUnderscoreToSpace)
    setMasterTemplateDirectoryList(parseToJson)
  }
  const retriveFormlayout = async () => {
    const res = await api.get(`form/readfile/${environment.formLayoutPath}/${inputData.label}/${environment.professionalData}`)
    const retriveUserSubcategory = await res.data
    if (retriveUserSubcategory !== 'FILE_NOT_FOUND') {
      setSelectedMasters(retriveUserSubcategory)
    } else {
      setSelectedMasters([])
    }
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>, title: string) => {
    const removeIndex = selectedMasters.indexOf(title)
    if (removeIndex !== -1) {
      selectedMasters.splice(removeIndex, 1)
    }
    selectedMasters.splice(Number(event.target.value), 0, title)
    setChangedOrderMasters(selectedMasters)
  }
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
    await api.post(`form/writefile/${environment.formLayoutPath}/${inputData.label}/${environment.professionalData}`, changedOrderMasters)
    toastify("User Subcategory Type Saved Successfully")
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
            {masterTemplateDirectoryList.map((item) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td>{item}</td>
                  <td>
                    <input type="text" id="nome"className='w-10 gap-4 bg-gray-50 border text-gray-900 text-sm rounded-md' onChange={(e) => onChange(e, item)} defaultValue={onValue(item)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Button
          className="common-pointer bg-blue_A700 cursor-pointer font-roboto font-semibold leading-[normal] min-w-[1260px] md:min-w-full mt-[34px] py-[29px] rounded-[17px] sm:text-3xl md:text-[32px] text-center text-white_A700 w-auto"
        onClick={saveUserSubCategoryType}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default ConnectProfessionAndMaster
