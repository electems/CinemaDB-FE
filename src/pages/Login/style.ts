import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  .botao-voltar {
    margin-top: 3%;
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
    display: flex;
    div {
      margin-top: 5%;
    }
    img {
      width: 45%;
    }
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
