import { useEffect, useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import { HeaderRegister, RegisterContainer, DivFlexDirection } from "./styles";
import ImgLogin from "../../assets/logoLogin.svg";
import backArrow from "../../assets/backArrow.svg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Register = () => {
  let { ong } = useParams();
  const navigate = useNavigate();

  const [isOng, setIsOng] = useState(false);
  useEffect(() => {
    ong ? setIsOng(true) : setIsOng(false);
  }, [ong]);

  function comeBackBtn() {
    if (isOng) {
      setIsOng(false);
    } else {
      navigate("../", { replace: true });
    }
  }

  return (
    <RegisterContainer>
      <HeaderRegister>
        <button onClick={comeBackBtn}>
          <img src={backArrow} alt="Voltar" />
          Voltar
        </button>
        {isOng ? (
          <>
            <h1>
              <em>INSCREVER</em> INSTITUIÇÃO
            </h1>
          </>
        ) : (
          <h1>
            <em>DOAR</em> MEU TEMPO
          </h1>
        )}
      </HeaderRegister>
      <DivFlexDirection>
        <img src={ImgLogin} alt="" />
        <RegisterForm isOng={isOng} setIsOng={setIsOng} />
      </DivFlexDirection>
    </RegisterContainer>
  );
};

export default Register;
