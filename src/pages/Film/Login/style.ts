import styled from 'styled-components';

export const Formulario = styled.div`
  width: 50%;
  height: 400px;
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
    margin-top: 60px;
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
    flex-grow: 2;
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
    width: 50%;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    color: #ffffff;
    font-size: 16px;
    margin-right: 50px;
    background-color: red;
  }

  @media (max-width: 800px) {
    width: 100vw;
    height: 70vh;
    button {
      margin-top: 20px;
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

    display: flex;
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
