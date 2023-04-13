import styled from "styled-components";

export const Botao = styled.section`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem;
  padding-left: 1rem;
  border: 0.2rem solid #16a085;
  border-radius: 0.5rem;
  box-shadow: 0.5rem 0.5rem 0 rgba(22, 160, 133, 0.2);
  color: #16a085;
  cursor: pointer;
  font-size: 1.7rem;
  background: #fff;

  :hover {
    background: #16a085;
    color: #fff;
  }

  span {
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    background: #16a085;
    color: #fff;
    margin-left: 0.5rem;
  }

  .btn:hover {
    background: #16a085;
    color: #fff;
  }

  :hover span {
    color: #16a085;
    background: #fff;
    margin-left: 1rem;
  }
`;
