import fundo from "../../assets/fundo.png";
import fotoPerfil from "../../assets/perfil.png";

import {
  Container,
  Review,
} from "./style";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import * as React from "react";
import { perfilProfissionalContext } from "../../Providers/contextPerfilProfissional";

interface PerfilUsuario {
  CPF: number;
  areaDeAtuacao: string;
  email: string;
  id: number;
  isOng: boolean;
  nome: string;
  password: string;
  registroProfissional: string;
  img?: string;
  cidade?: string;
  contato?: string;
  disponivel: boolean;
  description: string;
  userId?: string;
}


export const DashboardProfissionalSaude = () => {
  
  const { 
    usuario,
    modalDescription, 
    setModalDescription,
    setInputDescription,
    modalFotoPerfil,
    setModalFotoPerfil,
    setInputFotoPerfil,
    modalNomePerfil, 
    setModalNomePerfil,
    setInputNome,
    modalLocalidade, 
    setModalLocalidade,
    setInputLocalidade,
    modalContato, 
    setModalContato, 
    setInputContato,
    trocarFotoDePerfil,
    trocarNome,
    trocarLocalidade,
    trocarDescricao,
    trocarContato,
    editarPerfil,
    setEditarPerfil, } = React.useContext( perfilProfissionalContext )


  return (
    <>
      <Header />
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
            {editarPerfil ? (
              <button
                className="btn-alterar"
                onClick={() => setModalFotoPerfil(!modalFotoPerfil)}
              >
                Alterar Foto
              </button>
            ) : (
              <></>
            )}

            <h2>Dr. {usuario?.nome}</h2>
            {editarPerfil ? (
              <button
                className="btn-alterar"
                onClick={() => setModalNomePerfil(!modalNomePerfil)}
              >
                Alterar Nome
              </button>
            ) : (
              <></>
            )}

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
            {editarPerfil ? (
              <button
                className="btn-alterar"
                onClick={() => setModalLocalidade(!modalLocalidade)}
              >
                Alterar Cidade
              </button>
            ) : (
              <></>
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
            <button onClick={() => setModalContato(!modalContato)}>
              Alterar Telefone
            </button>
            <h4 className="registro">
              REGISTRO PROFISSIONAL<p>{usuario?.registroProfissional}</p>
            </h4>
          </div>

          <div className="ladoDireito">
            <button
              className="btn-alterar"
              onClick={() => setEditarPerfil(!editarPerfil)}
            >
              Editar Perfil
            </button>
            <div className="descricao">
              {usuario?.description ? (
                <p>{usuario?.description}</p>
              ) : (
                <p>Sem descrição</p>
              )}
            </div>
            <button
              className="review"
              onClick={() => setModalDescription(!modalDescription)}
            >
              Alterar Descrição
            </button>
            {modalDescription ? (
              <Review>
                <div className="modal">
                  <div className="faixa">
                    <h2>Alterar Descrição</h2>
                    <button
                      className="botaox"
                      onClick={() => setModalDescription(!modalDescription)}
                    >
                      Sair
                    </button>
                  </div>

                  <textarea
                    placeholder="DESCREVA SUA EXPERIÊNCIA COM ESSE PROFISSIONAL"
                    onChange={(e) => setInputDescription(e.target.value)}
                  />
                  <button className="salvar" onClick={trocarDescricao}>
                    Enviar
                  </button>
                </div>
              </Review>
            ) : (
              <></>
            )}
            {modalFotoPerfil ? (
              <Review>
                <div className="modal">
                  <div className="faixa">
                    <h2>Envie o caminho da foto :</h2>
                    <button
                      className="botaox"
                      onClick={() => setModalFotoPerfil(!modalFotoPerfil)}
                    >
                      Sair
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Envie o caminho da foto"
                    onChange={(e) => setInputFotoPerfil(e.target.value)}
                  />
                  <button className="salvar" onClick={trocarFotoDePerfil}>
                    Enviar
                  </button>
                </div>
              </Review>
            ) : (
              <></>
            )}
            {modalNomePerfil ? (
              <Review>
                <div className="modal">
                  <div className="faixa">
                    <h2>Alterar nome de perfil</h2>
                    <button
                      className="botaox"
                      onClick={() => setModalNomePerfil(!modalNomePerfil)}
                    >
                      X
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Nome de peril desejado"
                    onChange={(e) => setInputNome(e.target.value)}
                  />
                  <button className="salvar" onClick={trocarNome}>
                    Enviar
                  </button>
                </div>
              </Review>
            ) : (
              <></>
            )}
            {modalLocalidade ? (
              <Review>
                <div className="modal">
                  <div className="faixa">
                    <h2>Alterar Cidade</h2>
                    <button
                      className="botaox"
                      onClick={() => setModalLocalidade(!modalLocalidade)}
                    >
                      X
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Alterar Localidade"
                    onChange={(e) => setInputLocalidade(e.target.value)}
                  />
                  <button className="salvar" onClick={trocarLocalidade}>
                    Enviar
                  </button>
                </div>
              </Review>
            ) : (
              <></>
            )}
            {modalContato ? (
              <Review>
                <div className="modal">
                  <div className="faixa">
                    <h2>Alterar contato</h2>
                    <button
                      className="botaox"
                      onClick={() => setModalContato(!modalContato)}
                    >
                      X
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Alterar contato"
                    onChange={(e) => setInputContato(e.target.value)}
                  />

                  <button className="salvar" onClick={trocarContato}>
                    Enviar
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
  )};