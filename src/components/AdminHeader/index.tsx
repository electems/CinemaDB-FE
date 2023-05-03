/* eslint-disable no-undef */
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
                <NavLink to={'/admin/userListing'} className={({ isActive }) =>
                  (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                  User
                </NavLink >
              </li>
              <li id="professional" className="nav-item">
                 <NavLink to={'/admin/professionalListing'} className={({ isActive }) =>
                   (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                  Professional
                  </NavLink>
                  </li>
                  <li id="professional" >
                 <NavLink to={'/admin/masterforms'} className={({ isActive }) =>
                   (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                   Master Forms
                  </NavLink>
                  </li>
              <li id="professional" className="nav-item">
                 <NavLink to={'/admin/professionforms'} className={({ isActive }) =>
                   (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                   Profession Forms
                  </NavLink>
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
