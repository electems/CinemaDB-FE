/* eslint-disable no-undef */
import { useNavigate } from 'react-router-dom'
import { MathLower, Logout } from 'tabler-icons-react'
import { Text } from '../Elements'
import { Modal, Button } from 'react-bootstrap'
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const RegistrationHeader = () => {
  const navigate = useNavigate()
  const [isShow, invokeModal] = React.useState(false)

  function logout () {
    localStorage.removeItem('@cinimaDb:Token')
    localStorage.removeItem('LoggedUser')
    navigate('/film/login/loginregister')
  };

  const back = () => {
    if (window.location.pathname.includes('selectedindustry')) {
      navigate('/film/register/filmpersonregister')
    } else if (window.location.pathname.includes('filmpersonregister')) {
      onsubmit()
    }
  }

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
    <>
      <div className="flex items-center justify-start md:ml-[0] ml-[70px] md:px-5 w-[9%] md:w-full">
        <div className="flex flex-row gap-7 items-center justify-start w-full">
          <MathLower
            size={50}
            strokeWidth={2}
            color={'black'}
          />
          <Text
            className="font-medium text-black_900"
            variant="body11"
            onClick={back}
          >
            Back
          </Text>
        </div>
      </div>
      <Logout
        className=" position-absolute top-8 end-0 translate-middle pointer "
        onClick={onsubmit}
        size={30}
        strokeWidth={2}
        color={'#000000'}
      />
      </>

  )
}

export default RegistrationHeader
