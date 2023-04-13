import styled from "styled-components";

export const Container = styled.div`
  width: 85%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  margin-left: 6%;
  border: solid 1px #16a085;
  border-radius: 20px;
  margin-top: 5rem;
  position: relative;

  .imagemFundo {
    width: 100%;
    height: 40%;
    border-radius: 20px 20px 0 0;
    object-fit: cover;
  }

  .informacoesDoPerfil {
    display: flex;
    max-height: 60%;
    min-height: 60%;
    max-width: 100%;
    min-width: 100%;
  }

  .ladoEsquerdo {
    width: 33.33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .imagemDePerfil {
    height: 130px;
    width: 140px;
    border: solid 4px var(--green);
    border-radius: 100%;
  }

  .imagemDePerfil img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }

  .ladoEsquerdo h2 {
    align-self: center;
    margin-top: 1.5rem;
  }

  .ladoEsquerdo p {
    align-self: center;
    margin-top: 1rem;
    font-weight: 600;
  }

  .ladoEsquerdo span {
    align-self: center;
    margin-top: 0.3rem;
    color: var(--green);
    font-weight: 500;
  }
  .meio {
    width: 33.33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .meio h3 {
    align-self: center;
    margin-top: 3rem;
  }

  .meio p {
    align-self: center;
    margin-top: 0.3rem;
    color: var(--green);
    font-weight: 500;
  }

  .meio h2 {
    align-self: center;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
  }

  .meio span {
    margin-top: 1.5rem;
    font-weight: 520;
  }

  .meio .registro {
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
  }

  .meio .registro p {
    color: red;
    margin-left: 30%;
    margin-top: 0.5rem;
  }
  .ladoDireito {
    width: 33.33%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .ladoDireito .descricao {
    width: 90%;
    height: 40%;
    border-radius: 15px;
    border: 1px solid #16a085;
    padding: 1rem;

    p {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }

  .ladoDireito .review {
    width: 50%;
    height: 20%;
    background-color: #fff;
    cursor: pointer;
    color: var(--green);
    border-radius: 15px;
    font-size: 100%;
    font-weight: 600;
    margin-top: 1rem;
    border: 0.2rem solid var(--green);
  }

  .ladoDireito .review:hover {
    background-color: var(--green);
    color: #fff;
    border: 0.2rem solid green;
  }
  .btn-alterar {
    background-color: transparent;
    cursor: pointer;
    color: #16a085;
    padding: 5px;
    border: #16a085 solid 1px;
    margin: 5px;
    border-radius: 15px;
    :hover {
      color: #fff;
      background-color: #16a085;
      border: 1px solid #16a085;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
    height: 100vh;
    margin-left: 0%;
    .informacoesDoPerfil {
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  @media (max-width: 650px) {
    height: 130vh;
    .imagemFundo {
      max-height: 20%;
    }
    .informacoesDoPerfil {
      flex-wrap: nowrap;
      .ladoEsquerdo {
        width: 100%;
      }
      .meio {
        width: 100%;
      }
      .ladoDireito {
        width: 100%;
        min-height: 40%;
      }
    }
  }
`;

export const Review = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: 40vh;
    background-color: #fff;
    border-radius: 10px;
  }

  .faixa {
    display: flex;
    height: 30%;
    margin: 2%;
    background-color: #006853;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
  }
  .modal h2 {
    margin-left: 2%;
    font-size: 28px;
    color: white;
  }

  input {
    width: 85%;
    height: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 7%;
    padding-left: 5%;
    font-size: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #006853;
  }
  textarea {
    width: 85%;
    height: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 7%;
    padding-left: 15%;
    padding-top: 5%;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #006853;
  }

  .botaox {
    width: 15%;
    height: 70%;
    background-color: var(--green);
    cursor: pointer;
    color: white;
    border-radius: 5px;
    margin-right: 3%;
  }

  .modal .salvar {
    width: 30%;
    height: 50%;
    margin: 2%;
    font-size: 150%;
    color: #fff;
    background-color: var(--green);
    border-radius: 5px;
    cursor: pointer;
  }

  .modal .salvar:hover {
    color: var(--green);
    background-color: #fff;
    border: 2px solid var(--green);
  }
  @media (max-width: 650px) {
    .modal {
      width: 80vw;
      height: 40vh;
      .salvar {
        width: 40%;
      }
    }
  }
`;
