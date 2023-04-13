import styled from "styled-components";

export const Formulario = styled.div`
  width: 50%;
  height: 400px;
  border: 3px solid #16a085;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  h1 {
    color: black;
    text-shadow: 3px 3px 5px gray;
    font-size: 2.5rem;
    margin-top: 7%;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    width: 50%;
    height: 45px;
    border-radius: 10px;
    border: 2px solid #16a085;
    margin-bottom: 10px;
    padding: 0px 16px 0px 16px;
    font-size: 16px;
    margin-right: 50px;
  }
  label {
    color: black;
    font-size: 16px;
    font-weight: 700;
    text-align: start;
    width: 82%;
    padding: 0.6rem;
  }
  button {
    cursor: pointer;
    width: 150px;
    border-radius: 5px;
    height: 50px;
    border: 3px solid #16a085;
    color: #16a085;
    background-color: white;
    font-weight: 600;
    font-size: 20px;
    margin-top: 15px;
  }
  button:hover {
    background-color: #16a085;
    color: white;
    border: white;
  }
  @media (max-width: 800px) {
    width: 100vw;
    height: 70vh;
    button {
      margin-top: 50px;
    }
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 2rem;
    }
  }
`;
export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  .botao-voltar {
    margin-top: 6%;
    margin-left: 5%;
    cursor: pointer;
    display: flex;
  }
  .title {
    font-size: 2.5rem;
    text-align: center;
    span {
      color: #16a085;
    }
  }

  .container {
    display: -webkit-box;

    ali div {
      margin-top: 5%;
    }
    img {
      width: 45%;
    }
  }

  .images {
    display: block;
    margin-left: auto;
  }
  @media (max-width: 800px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
    img {
      display: none;
    }
    .botao-voltar {
      margin-top: 5%;
    }
    .title {
      margin-top: 3%;
    }
  }
  @media (max-width: 500px) {
    .botao-voltar {
      margin-top: 8%;
    }
    .title {
      font-size: 2rem;
      margin-top: 5%;
    }
  }
`;
