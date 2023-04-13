import Footer from "../../components/Footer";
import Header from "../../components/Header";
import error from "../../assets/Error404.svg";
import { ContainerError } from "./style";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <ContainerError>
        <img src={error} alt="Logo" />
        <button onClick={() => navigate("/", { replace: true })}>
          Página inicial
        </button>
      </ContainerError>
      <Footer />
    </>
  );
};

export default Page404;
