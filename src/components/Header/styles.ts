import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: 0.2rem 6%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  button {
    display: none;
  }
  .btn-login {
    display: inline-block;
    align-items: center;
    background-color: #fff;
    border: none;
    color: #16a085;
    cursor: pointer;
    font-size: 1.3rem;
  }
  nav {
    a {
      font-size: 1.2rem;
      color: #777;
      text-decoration: none;
      margin-left: 2rem;
      :hover {
        background-color: #16a085;
        border-radius: 5px;
        color: white;
      }
    }
  }
  .dropdown {
    display: none;
  }
  .dropdown-login {
    display: initial;
    position: absolute;
    top: 98px;
    right: 0px;
    width: 220px;
    background-color: #fff;
    border: #16a085 1px solid;
    display: initial;
    border-radius: 5px;
    padding: 1rem;
    section {
      height: 130px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      a {
        font-size: 1rem;
        align-items: center;
        width: 100%;
        text-align: start;
        padding: 0.5rem;
        display: flex;
        text-decoration: none;
        justify-content: space-between;
        color: #777;
        margin-left: 0rem;
        border-radius: 5px;
        display: initial;
        :hover {
          background-color: #16a085;
          color: white;
        }
      }
    }
    .logout {
      font-size: 1rem;
      align-items: center;
      width: 100%;
      text-align: start;
      padding: 0.5rem;
      display: flex;
      text-decoration: none;
      justify-content: space-between;
      background-color: #fff;
      color: #777;
      margin-left: 0rem;
      border-radius: 5px;
      display: initial;
      cursor: pointer;
      :hover {
        background-color: #16a085;
        color: white;
      }
    }
  }

  @media (max-width: 768px) {
    button {
      display: flex;
      align-items: center;
      background-color: #fff;
      border: none;
      color: #16a085;
      cursor: pointer;
      font-size: 1.3rem;
    }
    nav {
      display: none;
    }
    .dropdown {
      position: absolute;
      top: 98px;
      right: 0px;
      width: 220px;
      background-color: #fff;
      border: #16a085 1px solid;
      display: initial;
      border-radius: 5px;
      padding: 1rem;
      overflow: hidden;
      section {
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        a {
          font-size: 1rem;
          align-items: center;
          width: 100%;
          text-align: start;
          padding: 0.5rem;
          display: flex;
          text-decoration: none;
          justify-content: space-between;
          color: #777;
          margin-left: 0rem;
          border-radius: 5px;
          display: initial;
          :hover {
            background-color: #16a085;
            color: white;
          }
        }
      }
    }
  }
  @media (max-width: 400px) {
    .dropdown {
      position: absolute;
      top: 98px;
      right: 0px;
      width: 110px;
      background-color: #fff;
      border: #16a085 1px solid;
      display: initial;
      border-radius: 5px;
      padding: 1rem;
      overflow: hidden;
      section {
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        a {
          font-size: 1rem;
          align-items: center;
          width: 100%;
          text-decoration: none;
          text-align: start;
          padding: 0.5rem;
          display: flex;
          justify-content: space-between;
          color: #777;
          margin-left: 0rem;
          border-radius: 5px;
          display: initial;
          :hover {
            background-color: #16a085;
            color: #fff;
          }
        }
      }
    }
  }
`;
