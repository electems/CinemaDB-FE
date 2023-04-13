import styled from "styled-components";

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  input {
    background-color: rgba(0, 0, 0, 0.1);
    height: 40px;
    border-radius: 20px;
    padding: 1rem;
  }

  button {
    width: 80%;
    height: 40px;
  }
`;
export { Form };
