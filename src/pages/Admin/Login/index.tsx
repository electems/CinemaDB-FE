import { Context } from '../../../contexts/contextLogin'
import { useContext } from 'react'
import { Background, Formulario } from './style'
import { useForm } from 'react-hook-form'

export const AdminLogin = () => {
  const { functionBack } = useContext(Context)
  const { register, handleSubmit } = useForm()
  const { onUserLoginSubmit } = useContext(Context)

  return (
    <Background>
      <div className="botao-voltar">
      </div>
      <h1 className="title">Admin / Penman Login</h1>
      <div className="container">
        <Formulario>
          <form onSubmit={handleSubmit(onUserLoginSubmit)}>
            <label>Username:</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username..."
              {...register('username')}
            ></input>
            <label>Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password..."
              {...register('password')}
            ></input>
            <button id="login" type="submit">
              Login
            </button>
          </form>
        </Formulario>
      </div>
    </Background>
  )
}
