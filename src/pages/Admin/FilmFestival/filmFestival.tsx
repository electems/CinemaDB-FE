/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'
import { api } from '../../../services/api'
import { Edit } from 'tabler-icons-react'
import { Tooltip } from 'antd'
const FilmFestivalForms: React.FC = () => {
  const [filmFestival, setFilmFestival] = React.useState([])
  const navigate = useNavigate()
  React.useEffect(() => {
    retriveFilmFestivalUsers()
  }, [])

  const retriveFilmFestivalUsers = async () => {
    const res = await api.get('/filmfestival')
    setFilmFestival(res.data)
  }
  const approveFilmFormRegistration = (id: string) => {
    navigate('/film/filmfestival/filmfestivalregistration', { state: { id } })
  }
  return (
    <>
      <AdminHeader />
      <h3 className="title text-center pt-3">Film Festival Form Users Listing</h3>

      <div className="relative px-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Film Festival Name</th>
              <th className="px-6 py-3">Movie Title</th>
              <th className="px-6 py-3">Genres</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filmFestival.map((item: any) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-3" >{item.filmFestivalName}</td>
                  <td className="px-6 py-3" >{item.movieTittle}</td>
                  <td className="px-6 py-3" >{item.genres}</td>
                  <td className="px-6 py-3">
                  <Tooltip title="edit User" >
                    <Edit
                      size={25}
                      onClick={() => approveFilmFormRegistration(item.id)}
                      strokeWidth={1.5}
                      color={'#4048bf'}
                      className='admin-edit-icon contactIcon pointer'
                    />
                   </Tooltip>
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

export default FilmFestivalForms
