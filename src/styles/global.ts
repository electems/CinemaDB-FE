import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
  :root {
    --green: #16a085;
    --black: #444;
    --grey-0: #696F79;
    --grey-1: #8692A6;
    --light-color: #777;
    --box-shadow: .5rem .5rem 0 rgba(22, 160, 133, .2);
    --text-shadow: .4rem .4rem 0 rgba(0, 0, 0, .2);
    --border: .2rem solid var(--green);
  }
  ul::-webkit-scrollbar {
  max-width: 5px;  
}
ul::-webkit-scrollbar-thumb {
  background-color: #16a085;
  border-radius: 20px;
  max-width: 5px;
}
  .App {
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
  }
  * {
    font-family: 'Poppins', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: none;
    transition: all .2s ease-out;
    text-decoration: none;
  }
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 2rem 4rem;

  box-shadow: 0px 4px 35px rgba(41, 82, 144, 0.25);

  border: 2px solid var(--green);

  .redirect_btn {
    font-size: 1rem;
    color: var(--green);
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
  }

  p {
    color: var(--grey-1);
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: var(--green);
    font-weight: bold;
  }
`
export { GlobalStyle, FormContainer }
