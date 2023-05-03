/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'
import Input from '../../../components/Input'
interface InputData {
  labelPath
}
const ConnectProfessionAndMaster: React.FC = () => {
  const [masterTemplateDirectoryList, setMasterTemplateDirectoryList] = React.useState([])
  const [selectedMasters, setSelectedMasters] = React.useState([''])
  const inputData = useLocation().state as InputData
  const navigate = useNavigate()
  React.useEffect(() => {
    retriveDirectories(environment.masterFormPath)
    retriveUserSubCategories()
    console.log(inputData.labelPath)
  }, [])

  const retriveDirectories = async (path: string) => {
    const res = await api.get(`form/${path}`)
    console.log(res)
    setMasterTemplateDirectoryList(await res.data)
  }
  const retriveUserSubCategories = async () => {
    const res = await api.get(`form/${environment.formLayoutPath}/${inputData.labelPath}/${environment.professionalData}`)
    console.log(res)
    setSelectedMasters(await res.data)
  }
  return (
    <>
      <AdminHeader />
      <h1 className="title">Form Listing</h1>

      <div className="relative overflow-x-auto px-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Main</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {masterTemplateDirectoryList.map((item) => {
              return (
                <tr key={item}className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td>{item}</td>
                  <td>
                     <Input type={'number'} id={'1'}></Input>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ConnectProfessionAndMaster
