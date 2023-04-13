import styled, { css } from "styled-components";

interface IInputContainer {
  error?: string;
}

const InputContainer = styled.div<IInputContainer>`
  display: flex;
  flex-direction: column;

  input {
    ${({ error }) =>
      error
        ? css`
            border: 2px solid red;
          `
        : css`
            border: 2px solid var(--green);
          `}
    border-radius: 4px;
    height: 2rem;
  }

  label {
    color: var(--grey-0);
    ${({ error }) =>
      error &&
      css`
        color: red;
      `}
    font-size: 0.95rem;
  }

  span {
    font-size: 0.75rem;
    color: red;
    margin: 3px 14px 0px;
  }

  width: 100%;
`;

export { InputContainer };
