/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'

const ProfessionForms: React.FC = () => {
  const [directoryList, setDirectoryList] = React.useState([])
  const navigate = useNavigate()
  React.useEffect(() => {
    retriveDirectories(environment.formLayoutPath)
  }, [])

  const retriveDirectories = async (path: string) => {
    const res = await api.get(`form/${path}`)
    console.log(res)
    setDirectoryList(res.data)
  }
  const editFormListing = (label: string) => {
    localStorage.setItem('formlabelname', label)
    navigate('/admin/formbuilders')
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
            {directoryList.map((item) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td>{item}</td>
                  <td>
                    <button
                      className="bg-blue-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => editFormListing(item)}
                    >
                      Edit
                    </button>
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

export default ProfessionForms
