import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../contexts/contextLogin";
import { Formulario } from "./style";

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const { onSubmitFunction } = useContext(Context);

  return (
    <Formulario>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Insira seu e-mail..."
          {...register("email")}
        ></input>
        <label>Senha:</label>
        <input
          type="password"
          placeholder="Insira sua senha..."
          {...register("password")}
        ></input>
        <button type="submit">Entrar</button>
      </form>
    </Formulario>
  );
}
export default LoginForm;
