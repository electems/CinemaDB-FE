import { Context } from "../../../contexts/contextLogin";
import { useContext } from "react";
import { Background, Formulario } from "./style";
import { useForm } from "react-hook-form";

export const AdminLogin = () => {
  const { functionVoltar } = useContext(Context);
  const { register, handleSubmit } = useForm();
  const { onUserLoginSubmit } = useContext(Context);

  return (
    <Background>
      <div className="botao-voltar">
        <svg
          className="voltar"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8625 3.225L13.3791 1.75L5.13745 10L13.3875 18.25L14.8625 16.775L8.08745 10L14.8625 3.225Z"
            fill="#8692A6"
          />
        </svg>
        <p onClick={functionVoltar}>Back</p>
      </div>
      <h1 className="title">Admin Login</h1>
      <div className="container">
        <Formulario>
          <form onSubmit={handleSubmit(onUserLoginSubmit)}>
            <label>Username:</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username..."
              {...register("username")}
            ></input>
            <label>Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password..."
              {...register("password")}
            ></input>
            <button id="login" type="submit">
              Login
            </button>
          </form>
        </Formulario>
      </div>
    </Background>
  );
};
