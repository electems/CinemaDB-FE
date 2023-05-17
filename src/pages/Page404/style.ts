import styled from 'styled-components';

export const ContainerError = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 90vh;
  img {
    height: 500px;
  }
  button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border: 0.2rem solid #16a085;
    border-radius: 0.5rem;
    height: 56px;
    box-shadow: 0.5rem 0.5rem 0 rgba(22, 160, 133, 0.2);
    color: #16a085;
    cursor: pointer;
    font-size: 1.7rem;
    background: #fff;

    :hover {
      background: #16a085;
      color: #fff;
    }
  }
  @media (max-width: 800px) {
    img {
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    button {
      display: inline-block;
      margin-top: 0.5rem;
      padding: 0.5rem;
      padding-left: 0.6rem;
      padding-right: 0.6rem;
      border: 0.1rem solid #16a085;
      border-radius: 0.5rem;
      height: 46px;
      color: #16a085;
      cursor: pointer;
      font-size: 1rem;
      background: #fff;
    }
  }
`;
