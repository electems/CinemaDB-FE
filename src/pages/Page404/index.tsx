import { ContainerError } from './style'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigate = useNavigate()
  return (
    <>
      <ContainerError>
        <img src="" alt="Logo" />
        <button onClick={() => navigate('/', { replace: true })}>
          Página inicial
        </button>
      </ContainerError>
    </>
  )
}

export default Page404
