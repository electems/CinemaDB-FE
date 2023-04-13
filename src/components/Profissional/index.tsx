import "react-toastify/dist/ReactToastify.css";
import { DropDownMenu } from "../DropDownMenu";
import { Link } from "react-router-dom";
import { Div } from "./style";
import { api } from "../../services/api";
import { toast } from "react-toastify"

interface IProfissional {
  name?: string;
  CPF: string;
  areaDeAtuacao?: string;
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
  userId?: string
}

interface ProfissionalProps {
  profissional: IProfissional;
  description: string | undefined;
}
function Profissional({ profissional, description }: ProfissionalProps) {
  
  function selecionarProfissional(id: number){
    const token = localStorage.getItem("@HorasDeVida:Token");
    const userId = localStorage.getItem("@HorasDeVida:Id")

    api
      .post(
        `/medics`,
        {
          ...profissional,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Médico Selecionado!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((res) => {
        toast.error("Médico Já selecionado", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(res)
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
        <Div>
          {profissional.disponivel === "true" ? (
            <h4 className="disponivel">Disponível</h4>
          ) : (
            <h4 className="indisponivel">Indisponível</h4>
          )}

          <DropDownMenu description={description}></DropDownMenu>
        </Div>
      </div>
      <button onClick={() => selecionarProfissional(profissional.id)}>SELECIONAR</button>
    </>
  );
}

export default Profissional;
