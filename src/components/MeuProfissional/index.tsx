import "react-toastify/dist/ReactToastify.css";
import { DropDownMenu } from "../DropDownMenu";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";

interface IProfissional {
  name?: string;
  CPF: string;
  areaDeAtuacao: string;
  contato: string;
  email: string;
  id: number;
  img: string;
  isOng: boolean;
  localidade?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  password: string;
  registroProfissional: string;
  description?: string;
  disposicao: string;
  disponivel?: string;
  userId?: string;
}

interface ProfissionalProps {
  profissional: IProfissional;
  description: string | undefined;
}

function MeuProfissional({ profissional, description }: ProfissionalProps) {
  function removerProfissional(id: number) {
    const token = localStorage.getItem("@HorasDeVida:Token");

    api
      .delete(`https://horasvitais.herokuapp.com/medics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Médico removido com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Ops , algo deu errado!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  return (
    <>
      <div className="profissionalImgContainer">
        <img
          className="profissionalImg"
          src={profissional.img}
          alt={profissional.name}
        />
      </div>
      <div className="informacoesDoProfissional">
        <Link to={`/visualizarPerfil/${profissional.id}`}>
          <h3 className="nomeDoProfissional">{profissional.name}</h3>
        </Link>

        <span>{profissional.areaDeAtuacao}</span>
      </div>
      <DropDownMenu description={description}></DropDownMenu>
      <br></br>
      <button onClick={() => removerProfissional(profissional.id)}>
        REMOVER
      </button>
    </>
  );
}

export default MeuProfissional;
