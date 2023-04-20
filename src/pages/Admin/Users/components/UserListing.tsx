import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { api } from "../../../../services/api";
import UserHeader from "../../../../components/UserHeader";
import { Button } from "../../../../components/Elements";
import { Edit,Trash } from 'tabler-icons-react';
import { toast } from "react-toastify";


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
  const [usersData, setUserData] = useState([]);
  const [searchTitles, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers =  async() => {
    let res = await api.get(`/users`);
    setUserData(res.data);
  };

  function addUserForm(){
    navigate("/admin/form")
  }
  function editUser(id:number){
    navigate("/admin/user/"+id)
  }
  

  const deleteUser = async (id:number) =>{
    if (window.confirm("Are you sure you want to delete?")) {
     await api.delete(`/users/delete/${id}`);
    }  
     window.location.reload()
   }

const onChangeSearchTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
  const searchTitle = e.target.value;
  setSearchTitle(searchTitle);
};

const findByTitle = async () => {
  let res = await api.get(`/users/search/${searchTitles}`);
  setUserData(res.data);
}

  return (
  <>
    <UserHeader/>
    <h1 className="title">User List</h1>
     <div className="row ">
      <div className="col">
        <div className="input-group w-50">
         <input
           type="text"
           id="searchBar"
           className="form-control w-25"
           placeholder="Search by title"
           value={searchTitles}
           onChange={onChangeSearchTitle}
         />
            <div className="input-group-append">
                <button
                 className="btn btn-outline-secondary mr-8"
                 id="searchButton"
                 type="button"
                  onClick={() => findByTitle()}
                    >
                     Search
                </button>
             </div>
             <div className="float-right">
                 <Button id="addUser" className="float-right" onClick={addUserForm} > ADD USER</Button>
               </div>
        </div>
      </div>
     </div>
   <br></br>
    <div className="relative overflow-x-auto" id="usaeListing">
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
              <td className="px-6 py-4">{item.firstName}</td>
              <td className="px-6 py-4">{item.lastName}</td>
              <td className="px-6 py-4">{item.filmIndustry}</td>
               <td className="px-6 py-4">{item.email}</td>
               <td className="px-6 py-4">{item.role}</td>
               <td className="px-6 py-4">{item.status}</td>
               <td  className="px-6 py-4">
               <div id="action" className="row">
                <div id="editUser" className="col-md-6 contactIcon pointer ">
                <Edit size={25}
                      id="editUser"
                      strokeWidth={1.5}
                     
                      onClick={() =>editUser(item.id)}
                      color={'#4048bf'}
                  />

                </div>
                <div   className="col-md-6 contactIcon pointer ">
                <Trash
                       size={25}
                     
                       onClick={() =>deleteUser(item.id)}
                       strokeWidth={1.5}
                       color={'#bf4064'}
                    />
                </div>
                 
                    </div>
                </td>  
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
