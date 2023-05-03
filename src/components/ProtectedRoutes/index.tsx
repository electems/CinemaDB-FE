/* eslint-disable no-undef */
import { CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from '../../contexts/contextLogin'
import { LoadingContainer } from './styles'

const user = ''
const ProtectedRoutes = () => {
  const { loading } = useContext(Context)

  if (loading) {
    console.log('here')
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
