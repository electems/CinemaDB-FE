import fundo from "../../assets/fundo.png";
import fotoPerfil from "../../assets/perfil.png";
import { Container, Review } from "./style";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "../../assets/backArrow.svg";
import { Button } from "./style";

interface PerfilUsuario {
  cpf: number;
  areaDeAtuacao: string;
  email: string;
  id: number;
  isOng: boolean;
  name: string;
  password: string;
  registroProfissional: string;
  img?: string;
  cidade?: string;
  contato?: string;
  disponivel: boolean;
  review: string;
}

export const PerfilDoProfissional = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<PerfilUsuario>();

  const [modalReview, setModalReview] = useState(false);
  const [inputReview, setInputReview] = useState("");

  const [reaload, setReload] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    api.get(`/users/${id}`).then((response) => setUsuario(response.data));
    console.log(usuario);
  }, [reaload]);

  function postarReview() {
    const token = localStorage.getItem("@HorasDeVida:Token");
    const idOng = localStorage.getItem("@HorasDeVida:id");
    api
      .post(
        `/reviews`,
        {
          review: `${inputReview}`,
          receiverId: `${id}`,
          userId: `${idOng}`,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Review postado!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setModalReview(!modalReview);
        setReload(!reaload);
      })
      .catch((res) => {
        toast.error("Ops , algo deu errado!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setModalReview(!modalReview);
      });
  }

  return (
    <>
      <Header />

      <Button onClick={() => navigate("/dashboard", { replace: true })}>
        <img src={backArrow} alt="Voltar" />
        Voltar
      </Button>

      <Container>
        <img className="imagemFundo" src={fundo} alt="fundo" />

        <div className="informacoesDoPerfil">
          <div className="ladoEsquerdo">
            <div className="imagemDePerfil">
              {usuario?.img ? (
                <>
                  <img src={usuario?.img} alt="Foto perfil" />
                </>
              ) : (
                <>
                  <img src={fotoPerfil} alt="Foto perfil" />
                </>
              )}
            </div>

            <h2>Dr. {usuario?.name}</h2>

            <p>FORMAÇÃO</p>
            <span>{usuario?.areaDeAtuacao}</span>
          </div>
          <div className="meio">
            {usuario?.cidade ? (
              <div>
                <h3>LOCALIZAÇÃO</h3>
                <p>{usuario.cidade}</p>
              </div>
            ) : (
              <div>
                <h3>LOCALIZAÇÃO</h3>
                <p>LOCALIZAÇÃO Cidade...</p>
              </div>
            )}
            <span>
              {usuario?.contato ? (
                <div>
                  <h2>CONTATO</h2>
                  <span>{usuario.contato}</span>
                </div>
              ) : (
                <div>
                  <h2>CONTATO</h2>
                  <span>(xx)xxxxx-xxxx</span>
                </div>
              )}
            </span>
            <h4 className="registro">
              REGISTRO PROFISSIONAL<p>{usuario?.registroProfissional}</p>
            </h4>
          </div>

          <div className="ladoDireito">
            <button
              className="review"
              onClick={() => setModalReview(!modalReview)}
            >
              {" "}
              DAR REVIEW{" "}
            </button>
            {modalReview ? (
              <Review>
                <div className="modal">
                  <div className="faixa">
                    <h2>Review do profissional</h2>
                    <button
                      className="botaox"
                      onClick={() => setModalReview(!modalReview)}
                    >
                      Sair
                    </button>
                  </div>

                  <textarea
                    placeholder="DESCREVA SUA EXPERIÊNCIA COM ESSE PROFISSIONAL"
                    onChange={(e) => setInputReview(e.target.value)}
                  />
                  <button className="salvar" onClick={postarReview}>
                    Enviar review
                  </button>
                </div>
              </Review>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};
