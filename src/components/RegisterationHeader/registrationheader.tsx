/* eslint-disable no-undef */
import { useNavigate } from 'react-router-dom'
import { MathLower, Logout } from 'tabler-icons-react'
import { Text } from '../Elements'
const RegistrationHeader = () => {
  const navigate = useNavigate()

  function logout () {
    localStorage.removeItem('@cinimaDb:Token')
    localStorage.removeItem('LoggedUser')
    navigate('/film/login/loginregister')
  };

  const back = () => {
    if (window.location.pathname.includes('selectedindustry')) {
      navigate('/film/register/filmpersonregister')
    }
    if (window.location.pathname.includes('filmpersonregister')) {
      navigate('/film/login/loginregister')
    }
    if (window.location.pathname.includes('loginregister')) {
      navigate('/film/login/selectpreference')
    }
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
                  onClick={logout}
                  size={30}
                  strokeWidth={2}
                  color={'#000000'}
                 />;
      </>

  )
}

export default RegistrationHeader
