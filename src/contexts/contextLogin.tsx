/* eslint-disable no-undef */
import { createContext, ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { FieldValues } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface ProviderChildren {
  children: ReactNode;
}

interface ContextProviderData {
  onUserLoginSubmit: (data: FieldValues) => void;
  loading: boolean;
  functionBack: () => void;
}

export const Context = createContext({} as ContextProviderData)

export const ContextProvider = ({ children }: ProviderChildren) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const path = window.location.pathname
    if (path.includes('admin')) {
      if (localStorage.getItem('@cinimaDb:Token') === null) {
        navigate('/admin/login')
      }
    }
  }, [])

  const functionBack = () => {
  }

  const logout = () => {
    localStorage.removeItem('token-info')
  }

  const onUserLoginSubmit = (data: FieldValues) => {
    axios
      .post('http://localhost:3001/auth/login', data)
      .then((res) => {
        localStorage.setItem('@cinimaDb:Token', res.data.token)
        localStorage.setItem('authuser', JSON.stringify(res.data))
        toast.success('Login in sucessfull!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        const userResponse = res.data
        if (userResponse) {
          navigate('/admin/userlisting')
        } else {
          navigate('/admin/login', { replace: true })
        }
      })
      .catch(() =>
        toast.error('Ops! Login Failed Check Your Username Or Password.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      )
  }

  return (
    <Context.Provider
      value={{
        onUserLoginSubmit,
        functionBack,
        loading
      }}
    >
      {children}
    </Context.Provider>
  )
}
