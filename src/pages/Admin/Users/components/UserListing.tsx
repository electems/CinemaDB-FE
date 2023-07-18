/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../../../services/api'
import AdminHeader from '../../../../components/AdminHeader'
import { BookUpload, Edit, Trash } from 'tabler-icons-react'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

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

const UserListing: React.FC = () => {
  const navigate = useNavigate()
  const [usersData, setUserData] = useState([])
  const userObj = JSON.parse(localStorage.getItem('authuser')!)
  const [searchTitles, setSearchTitle] = useState('');

  useEffect(() => {
    retrieveUsers()
  }, [])

  const retrieveUsers = async () => {
    const res = await api.get('/users')
    setUserData(res.data)
  }

  function addUserForm () {
    navigate('/admin/addform', { state: { folderName: 'useradminform' } })
  }
  function editUser (id: number) {
    navigate('/admin/editform/' + id, { state: { folderName: 'useradminform' } })
  }

  const deleteUser = async (id: number) => {
    await api.delete(`/users/delete/${id}`)
    window.location.reload()
  }

  const closepage = async () => {
    navigate('/admin/userlisting')
  }

  const onsubmit = (id:number) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div >
            <h1>Are you sure?</h1>
            <p>You want to delete?</p>
            <div className="row">
            <div className= "col-md-6">
            <button className="btn btn-success" onClick={onClose}>No</button>
            </div>
            <div className= "col-md-6">
            <button className="btn btn-danger"
            onClick={() => {
              deleteUser(id);
              onClose();
            }}>
              Yes
            </button>
            </div>
            </div>
          </div>
        );
      }
    });
  }

  const subject = new Subject();
  subject
    .asObservable()
    .pipe(debounceTime(100))
    .subscribe(data => {
      findByTitle(data)
    })
  const onKeyUp = event => {
    subject.next(event.target.value)
  }

  const findByTitle = async (val :any) => {
    const searchTitle = val
    setSearchTitle(searchTitle)
    if (searchTitles.length > 0) {
      const res = await api.get(`/users/search/${searchTitles}`)
      setUserData(res.data)
    }
    if (searchTitles.length === 0) {
      retrieveUsers()
    }
  }

  const navigateWithId = async (id: number) => {
    const res = await api.get(`/users/${id}`)
    const userList = await res.data
    const selectedUser = userList[0]
    selectedUser.userSubCategory = selectedUser.usersubcategory

    navigate('/film/register/subcategoryuserform', { state: { user: selectedUser, role: userObj.role } })
  }

  return (
    <>
      <AdminHeader />
      <h3 className="title text-center pt-3">Users Listing</h3>
      <div className="row ">
        <div className="col">

          <div className="input-group w-50 pt-3 userlisting-searchbar ">
            <input
              type="text"
              id="searchBar"
              className="form-control w-25 px-10"
              placeholder="Search by title"
              onKeyUp={onKeyUp}
              />

            {userObj.role === 'ADMIN'
              ? <div className="float-right">
                <button
                  type='button'
                  id="addUser"
                  className="float-right btn btn-primary ml-2"
                  onClick={addUserForm}
                >
                  {' '}
                  ADD USER
                </button>
              </div>
              : ''}

          </div>

        </div>
      </div>
      <br></br>
      <div className="relative  px-10" id="userListing">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Film Industry</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((item: users) => {
              return (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                   <td className="px-6 ">{item.firstName}</td>
                  <td className="px-6 py-3">{item.lastName}</td>
                  <td className="px-6 py-3">{item.filmIndustry}</td>
                  <td className="px-6 py-3">{item.email}</td>
                  <td className="px-6 py-3">{item.role}</td>
                  <td className="px-6 py-3">{item.status}</td>
                  <td className="px-6 py-3">
                    {userObj.role === 'ADMIN'
                      ? <div id="action" className="row">
                        <div
                          id="editUser"
                          className="col-md-2 mr-4"
                        >
                          <Edit
                            size={25}
                            id="editUser"
                            className="contactIcon pointer"
                            strokeWidth={1.5}
                            onClick={() => editUser(item.id)}
                            color={'#4048bf'}
                          />

                        </div>
                        <div className="col-md-2  pointer">
                          <Trash
                            className="contactIcon pointer"
                            size={25}
                            onClick={() => onsubmit(item.id)}
                            strokeWidth={1.5}
                            color={'#bf4064'}
                          />
                        </div>
                      </div>
                      : <BookUpload
                        className="contactIcon pointer "
                        size={25}
                        onClick={() => navigateWithId(item.id)}
                        strokeWidth={1.5}
                         color={'#4048bf'}
                    />

                     }
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

export default UserListing
