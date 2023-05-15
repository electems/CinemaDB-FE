/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'

interface users {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  status: string;
  filmIndustry: string;
}

const result : users[] = [];
const UserListingOfPenman: React.FC = () => {
  const navigate = useNavigate()
  const [usersData, setUserData] = useState<users>(result)

  useEffect(() => {
    retrieveUsers()
  }, [])

  const retrieveUsers = async () => {
    const res = await api.get('/users')
    const response = await res.data
    const findByPerson = response.find(o => o.role === 'PERSON')
    setUserData(findByPerson)
  }
  const navigateWithId = async (id: number) => {
    console.log(id)
  }

  return (
    <>
      <h3 className="title text-center pt-3">Users Listing</h3>
      <br></br>
      <div className="relative  px-10" id="userListing">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr key={usersData.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td>{usersData.firstName}</td>
              <td>{usersData.lastName}</td>
              <td>{usersData.email}</td>
              <td>{usersData.role}</td>
              <td>{usersData.status}</td>
              <td>
                <div id="action" className="row">
                  <button onClick={() => navigateWithId(usersData.id)} className="btn btn-primary"> Update Content</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
export default UserListingOfPenman
