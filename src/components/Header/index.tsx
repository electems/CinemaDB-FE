import Logo from "../Logo";
import { HeaderContainer } from "./styles";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import "react-dropdown/style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [openModal, setIsOpenModal] = useState(false);
  const user = localStorage.getItem("@HorasDeVida:Token");
  return user ? (
    <HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>
      <button className="btn-login" onClick={() => setIsOpenModal(!openModal)}>
        <FaUser />
      </button>
      {openModal ? (
        <div className="dropdown-login">
          <section>
            <Link to="/">Home</Link>
            <Link to="/contatos">Contato</Link>
            <Link to="/sobre">Sobre</Link>
            <button
              className="logout"
              onClick={() => {
                localStorage.clear();
                document.location.reload();
              }}
            >
              Sair
            </button>
          </section>
        </div>
      ) : (
        <></>
      )}
    </HeaderContainer>
  ) : (
    <HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/contatos">Contato</Link>
        <Link to="/sobre">Sobre</Link>
      </nav>
      <button onClick={() => setIsOpenModal(!openModal)}>
        <AiOutlineMenu />
      </button>
      {openModal ? (
        <div className="dropdown">
          <section>
            <Link to="/login">Login</Link>
            <Link to="/contatos">Contato</Link>
            <Link to="/sobre">Sobre</Link>
          </section>
        </div>
      ) : (
        <></>
      )}
    </HeaderContainer>
  );
};

export default Header;
