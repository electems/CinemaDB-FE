import styled from "styled-components";

export const RelogioContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(22, 160, 132, 0.091);
  border-radius: 50%;
  box-shadow: 0 0 0 1px #16a085, 0 0 0 4px #16a085, 0 0 8px #777,
    0 0 15px var(--light-color), 0 0 25px #777;

  :before {
    content: "";
    position: absolute;
    width: 2px;
    height: 80px;
    border-radius: 2px;
    background: linear-gradient(0deg, transparent, #16a085);
    transform-origin: bottom;
    animation: animarPonteiros 600s steps(60) infinite;
  }

  :after {
    content: "";
    position: absolute;
    width: 2px;
    height: 75px;
    border-radius: 2px;
    background: linear-gradient(0deg, transparent, #16a085);
    transform-origin: bottom;
    animation: animarPonteiros 60s steps(60) infinite;
  }

  @keyframes animarPonteiros {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  ul li {
    position: absolute;
    top: 18px;
    list-style: none;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    font-size: 15px;
  }

  ul li span {
    display: inline-block;
    color: #16a085;
    text-transform: uppercase;
    text-shadow: 0 0 15px #16a085, 0 0 35px #7bffe5, 0 0 75px #7bffe5,
      0 0 100px #7bffe5;
  }
  .um {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 1));
  }
  .dois {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 2));
  }
  .tres {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 3));
  }
  .quatro {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 4));
  }
  .cinco {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 5));
  }
  .seis {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 6));
  }
  .sete {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 7));
  }
  .oito {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 8));
  }
  .nove {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 9));
  }
  .dez {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 10));
  }
  .onze {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 11));
  }
  .doze {
    transform-origin: 0 130px;
    transform: rotate(calc(30deg * 12));
  }
`;
