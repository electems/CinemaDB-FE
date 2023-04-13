import FotoLucas from "../../assets/lucas.png";
import FotoKaleb from "../../assets/kalebe.png";
import FotoWilson from "../../assets/wilson.png";
import FotoJoao from "../../assets/joao.png";
import FotoArthur from "../../assets/arthur.png";
import { Container } from "./style";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MdAlternateEmail } from "react-icons/md";
import {
  BsFillTelephoneFill,
  BsInstagram,
  BsTwitter,
  BsFacebook,
  BsGithub,
} from "react-icons/bs";
import image from "../../assets/contatos.svg";

export const Contatos = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="contatos">
          <div className="listacontatos">
            <h2>Contatos</h2>
            <ul>
              <li>
                <MdAlternateEmail />
                <p>doarvidas@horasvitais.com.br</p>
              </li>
              <li>
                <BsFillTelephoneFill />
                <p>(11) 3611-0990</p>
              </li>
              <li>
                <BsInstagram />
                <p>Instagram</p>
              </li>
              <li>
                <BsTwitter />
                <p>Twitter </p>
              </li>
              <li>
                <BsFacebook />
                <p>Facebook</p>
              </li>
            </ul>
          </div>
          <div>
            <img src={image} alt="" />
          </div>
        </div>
        <div className="criadores">
          <h2>Criadores: </h2>
          <ul>
            <li>
              <img src={FotoLucas} alt="Lucas Maciel" />
              <a href="https://github.com/maciellucas0">
                <BsGithub /> GitHub
              </a>
            </li>
            <li>
              <img src={FotoJoao} alt="João victor de Souza Lemos" />
              <a href="https://github.com/jhonlemos">
                <BsGithub /> GitHub
              </a>
            </li>
            <li>
              <img src={FotoKaleb} alt="Kalebe Pereira Sampaio da Silva" />
              <a href="https://github.com/KalebeSampaio">
                <BsGithub /> GitHub
              </a>
            </li>
            <li>
              <img src={FotoArthur} alt="Arthur Ribeiro Gonçalves" />
              <a href="https://github.com/ArthurRibeiro04">
                <BsGithub /> GitHub
              </a>
            </li>
            <li>
              <img src={FotoWilson} alt="Wilson Mesquita" />
              <a href="https://github.com/wilsonmesquita03">
                <BsGithub /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Footer />
    </>
  );
};
