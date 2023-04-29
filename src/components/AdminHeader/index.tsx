import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Logout } from 'tabler-icons-react'

const AdminHeader = () => {
  const navigate = useNavigate()

  function logout () {
    localStorage.removeItem('@cinimaDb:Token')
    localStorage.removeItem('authuser')
    navigate('/admin/login')
  };

  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={'/'} className="navbar-brand">
            CinemaDB
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={'/admin/userListing'} className="nav-link">
                  User
                </Link>
              </li>
              <li id="professional" className="nav-item">
                 <Link to={'/admin/professionalListing'} className="nav-link">
                  Professional
                  </Link>
                  </li>
              <li id="professional" className="nav-item">
                 <Link to={'/admin/formlisitng'} className="nav-link">
                  Form Listing
                  </Link>
                  </li>
              <li className="text-right">
               <Logout
                  className=" position-absolute top-8 end-0 translate-middle pointer "
                  onClick={logout}
                  size={30}
                  strokeWidth={2}
                  color={'#FFFFFF'}
                 />;
               </li>
          </div>
        </nav>
      </div>

  )
}

export default AdminHeader
