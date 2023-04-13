import { Botao } from "./style";
import "./style.css";
interface PropsBotao {
  text: string;
}
export const BotaoDeSelecionar = ({ text }: PropsBotao) => {
  return (
    <>
      <Botao>{text}</Botao>
    </>
  );
};
