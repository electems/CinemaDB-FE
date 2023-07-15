/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'
import { api } from '../../../services/api'
import { environment } from '../../../config/environment'
import { Edit } from 'tabler-icons-react'
const MasterForms: React.FC = () => {
  const [directoryList, setDirectoryList] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    retriveDirectories(environment.masterFormPath)
  }, [])

  const retriveDirectories = async (path: string) => {
    const getDirectories = await api.get(`form/${path}`)
    const response = await getDirectories.data
    setDirectoryList(response)
  }
  const editMasterFormListing = (label: string) => {
    // using local storage because form builder is js file
    localStorage.setItem('masterFormslabel', label)
    if (label.includes('Movie')) {
      navigate('/admin/customform')
    } else {
      navigate('/admin/formbuilders')
    }
  }
  return (
    <>
      <AdminHeader />
      <h3 className="title text-center pt-3">Master Form Listing</h3>

      <div className="relative px-10">
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
                  <td className="px-6 py-3">{item}</td>
                  <td>
                    <Edit
                      size={25}
                      onClick={() => editMasterFormListing(item)}
                      strokeWidth={1.5}
                      color={'#4048bf'}
                      className='admin-edit-icon contactIcon pointer'
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
         <h5>Note : To add new MasterForm please contact Admin</h5>
      </div>
    </>
  )
}

export default MasterForms
