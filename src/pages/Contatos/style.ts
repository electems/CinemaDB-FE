import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  .contatos {
    width: 100vw;
    display: flex;
    div {
      width: 50%;
      height: 100vh;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .listacontatos {
      background-color: #16a085;
      width: 50%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h2 {
        font-size: 3rem;
        color: #fff;
      }
      ul {
        list-style: none;

        li {
          padding: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 1.5rem;
          p {
            padding: 1rem;
          }
          svg {
            font-size: 4.5rem;
            padding: 5px;
          }
        }
      }
    }
  }
  .criadores {
    background-color: #16a085;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 3rem;
      color: #fff;
      padding: 2rem;
    }
    ul {
      display: flex;
      list-style: none;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 1rem;
        img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 100%;
          padding: 1rem;
        }
        a {
          font-size: 1.5rem;
          color: #fff;
        }
      }
    }
  }
  @media (max-width: 820px) {
    .contatos {
      flex-direction: column;
      div {
        width: 100%;
        display: none;
      }
      .listacontatos {
        width: 100%;
      }
    }
  }
  @media (max-width: 820px) {
    .contatos {
      .listacontatos {
        ul {
          li {
            font-size: 1rem;
          }
        }
      }
    }
    .criadores {
      ul {
        flex-direction: column;
      }
    }
  }
`;
