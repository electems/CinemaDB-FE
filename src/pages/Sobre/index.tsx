import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { SobreContainer } from "./style";
import img1 from "../../assets/medicsobre1.svg";
import img2 from "../../assets/medicsobre2.svg";

const SobrePage = () => {
  return (
    <>
      <Header />
      <SobreContainer>
        <div className="div-problemas">
          <h2>Qual problema estamos resolvendo?</h2>
          <div>
            <p>
              Hoje em dia muitas pessoas estão com dificuldade de ter um
              atendimento médico adequado, de qualidade e também a um preço
              acessível. Ou muitas das vezes moram longe de um hospital,ou posto
              de saúde o que dificulta esse atendimento. Também muitos médicos e
              especialistas na área da saúde tem a intenção de ajudar e não
              sabem como, não tem a praticidade e nem por onde ajudar. Juntando
              esses dois problemas que é a necessidade de um atendimento
              adequado e a vontade da ajuda por parte dos médicos pensamos na
              solução HORAS VITAIS.
            </p>
            <img src={img1} alt="" />
          </div>
        </div>
        <div className="div-solucao">
          <h2>Solução</h2>
          <div>
            <p>
              Pensamos em uma aplicação web que tem a função de unir
              profissionais da saúde a pessoas que não podem pagar por
              atendimento através de ONG´S que selecionarão um usuário
              profissional da área de saúde que se coloque a disposição para
              ajudar doando seu tempo livre como um voluntário. Terão usuários
              ONGS que farão a seleção do profissional que se inscrever no site
              de acordo com sua competência e habilidade. Com isso nos trás
              equidade realizando consultas médicas gratuitas e de fácil acesso.
              O profissional poderá realizar uma doação do seu tempo que é hoje
              em dia o bem mais precioso quem alguém pode ter, transformando
              assim suas horas de trabalho em horas vitais.
            </p>
            <img src={img2} alt="" />
          </div>
        </div>
      </SobreContainer>
      <Footer />
    </>
  );
};
export default SobrePage;
