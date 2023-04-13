import { Div } from "./../../components/Profissional/style";
import styled from "styled-components";

export const SobreContainer = styled.div`
  width: 100vw;
  margin-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .div-problemas {
    background-color: #16a085;
    color: #fff;
    h2 {
      text-align: center;
      margin-top: 5%;
      font-size: 2.5rem;
      text-shadow: 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.2);
    }
    div {
      display: flex;
      width: 100%;
      justify-content: space-around;
      p {
        margin-left: 3%;
        margin-top: 3%;
        width: 50%;
        font-size: 1.3rem;
      }
      img {
        width: 25%;
        border-radius: 15px;
      }
    }
  }
  .div-solucao {
    color: #16a085;
    h2 {
      text-align: center;
      margin-top: 5%;
      font-size: 2.5rem;
      text-shadow: 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.2);
    }
    div {
      display: flex;
      width: 100%;
      justify-content: space-around;
      p {
        margin-left: 3%;
        margin-top: 3%;
        width: 50%;
        font-size: 1.3rem;
      }
      img {
        width: 25%;
        border-radius: 15px;
      }
    }
  }
  @media (max-width: 1000px) {
    .div-problemas {
      div {
        flex-direction: column;
        align-items: center;
        p {
          width: 90%;
          margin-left: 0%;
        }
        img {
          width: 50%;
        }
      }
    }
    .div-solucao {
      div {
        flex-direction: column;
        align-items: center;
        p {
          width: 90%;
        }
        img {
          width: 50%;
        }
      }
    }
  }
  @media (max-width: 700px) {
    .div-problemas {
      h2 {
        font-size: 2rem;
      }
      div {
        p {
          font-size: 1rem;
        }
      }
    }
    .div-solucao {
      h2 {
        font-size: 2rem;
      }
      div {
        p {
          font-size: 1rem;
        }
      }
    }
  }
`;
