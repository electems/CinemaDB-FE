/* eslint-disable no-undef */
import { Link, NavLink, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Logout } from 'tabler-icons-react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const AdminHeader = () => {
  const getUserRole = JSON.parse(localStorage.getItem('authuser') || '{}')
  const navigate = useNavigate()
  function logout () {
    localStorage.removeItem('@cinimaDb:Token')
    localStorage.removeItem('authuser')
    localStorage.removeItem('selectedLabel')
    localStorage.removeItem('masterFormslabel')
    localStorage.removeItem('filmFestivalFormLabel')
    navigate('/admin/login')
  };

  const onsubmit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div >
            <h1>Are you sure?</h1>
            <p>You want to logout?</p>
            <div className="row">
            <div className= "col-md-6">
            <button className="btn btn-success" onClick={onClose}>No</button>
            </div>
            <div className= "col-md-6">
            <button className="btn btn-danger"
             onClick={() => {
               logout();
               onClose();
             }} >
              Yes
            </button>
            </div>
            </div>
          </div>
        );
      }
    });
  }
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={'/'} className="navbar-brand">
            CinemaDB
          </Link>
          {getUserRole.role === 'ADMIN'
            ? <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink to={'/admin/userlisting'} className={({ isActive }) =>
                  (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                  User
                </NavLink >
              </li>
              <li id="professional" className="nav-item">
                 <NavLink to={'/admin/professionallisting'} className={({ isActive }) =>
                   (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                  Professional
                  </NavLink>
                  </li>
              <li id="professional" className="nav-item">
                 <NavLink to={'/admin/professionforms'} className={({ isActive }) =>
                   (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                   Profession Forms
                  </NavLink>
              </li>
              <li id="professional" >
                 <NavLink to={'/admin/masterforms'} className={({ isActive }) =>
                   (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                   Master Forms
                  </NavLink>
              </li>
              <li className="text-right">
               <Logout
                  className=" position-absolute top-8 end-0 translate-middle pointer "
                  onClick={onsubmit}
                  size={30}
                  strokeWidth={2}
                  color={'#FFFFFF'}
                 />;
               </li>
          </div>
            : <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink to={'/admin/userlisting'} className={({ isActive }) =>
                  (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                  User
                </NavLink >
            </li>
            <li id="professional" className="nav-item">
                 <NavLink to={'/admin/filmfestivalforms'} className={({ isActive }) =>
                   (isActive ? 'nav-link active menu-border-bottom' : 'nav-link')}>
                   Film Festival Forms
                  </NavLink>
                  </li>
            <li className="text-right">
               <Logout
                  className=" position-absolute top-8 end-0 translate-middle pointer "
                  onClick={onsubmit}
                  size={30}
                  strokeWidth={2}
                  color={'#FFFFFF'}
                 />;
               </li>
          </div>}
        </nav>
      </div>

  )
}

export default AdminHeader
