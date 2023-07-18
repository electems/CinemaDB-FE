/* eslint-disable no-undef */
import axios from 'axios'
import { toast } from 'react-toastify'
import { environment } from '../config/environment'

export const api = axios.create({
  baseURL: environment.baseUrl,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('@cinimaDb:Token')}`,
    'Content-type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('@cinimaDb:Token')}`;
  toast('Loading...', {
    toastId: 'APP_LOADING',
    isLoading: true,
    position: 'top-right',
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: false,
    pauseOnHover: true
  })

  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use(
  (response) => {
    toast.dismiss()
    return response
  },
  (error) => {
    if (error.response.status === 500) {
      toast.error('Internal Server Error', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0
      })
    }
    if (error.response.status === 401) {
      window.location.href = environment.redirectUrl
    }
  }
)
