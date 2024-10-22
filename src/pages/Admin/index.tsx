import { Context } from "../../contexts/contextLogin";
import React, { useContext } from "react";
import image from "../../assets/login.svg";
import { useForm } from "react-hook-form";
import { Background, Formulario } from "./Login/style";

export const Admin = () => {
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
        <p onClick={functionVoltar}>Voltar</p>
      </div>
      <h1 className="title">
        SEJA BEM <span>VINDO!</span>
      </h1>
      <div className="container">
        <img src={image} alt="" />
    <Formulario>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onUserLoginSubmit)}>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Insira seu username..."
          {...register("username")}
        ></input>
        <label>Senha:</label>
        <input
          type="password"
          placeholder="Insira sua senha..."
          {...register("password")}
        ></input>
        <button type="submit">Enter</button>
      </form>
    </Formulario>
      </div>
    </Background>
  );
};
