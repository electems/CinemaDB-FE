import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { api } from "../../../../services/api";
import UserHeader from "../../../../components/UserHeader";
import { Button } from "../../../../components/Elements";
import { constants } from "zlib";

interface users {
  id: number;
  firstName: string,
  lastName: string,
  password:string,
  email:string ,
  role: string,
  status:string,
  filmIndustry:string,
}

const UserListing : React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("@cinimaDb:Token");
  const [usersData, setAbout] = useState([]);
  const [searchTitles, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    api
      .get(`/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAbout(response.data);
      });
  };

  function addUserForm(){
    navigate("/form")
  }

  function deleteUser(){
    {usersData.map((item: users) => {
      let id =item.id;
    api
      .get(`delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })
  }
}

const onChangeSearchTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
  const searchTitle = e.target.value;
  setSearchTitle(searchTitle);
};

const findByTitle = async () => {
  let res = await api.get(`/users/search/${searchTitles}`);
  setAbout(res.data);
}

  return (
  <>
    <UserHeader/>
    <h1 className="title">User List</h1>
    <div className="col-md-8">
        <div className="input-group mb-3">
      
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitles}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => findByTitle()}
            >
              Search
            </button>
          </div>
        </div>
        <div>
        <Button  onClick={addUserForm} > ADD USER</Button>
        </div>
      </div>
    <br></br>
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-6 py-3">FirstName</th>
        <th className="px-6 py-3">LastName</th>
        <th className="px-6 py-3">FilmIndustry</th>
        <th className="px-6 py-3">Email</th>
        <th className="px-6 py-3">Role</th>
        <th className="px-6 py-3">Status</th>
     </tr>
        </thead>
        <tbody>
          {usersData.map((item: users) => {
             return (
             <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{item.firstName}</td>
              <td className="px-6 py-4">{item.lastName}</td>
              <td className="px-6 py-4">{item.filmIndustry}</td>
               <td className="px-6 py-4">{item.email}</td>
               <td className="px-6 py-4">{item.role}</td>
               <td className="px-6 py-4">{item.status}</td>
               <td className="px-6 py-4">
                      <Link
                        to={"/user/" + item.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </td>
                    <Button onClick={deleteUser}>Delete</Button>
                </tr>
              );
           })}
         </tbody>
      </table>
    </div>
  </>
 )
}

export default UserListing;
