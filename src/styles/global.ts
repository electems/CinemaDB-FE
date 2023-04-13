import { createGlobalStyle } from "styled-components";

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
    border: none;
    transition: all .2s ease-out;
    text-decoration: none;
  }
`;
export default GlobalStyle;
