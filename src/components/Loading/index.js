import { Container } from "./styles";
import imgLoading from "../../assets/loading.png";

function Loading() {
  return (
    <Container>
      <img src={imgLoading} alt="Imagem loading"/>
      <p>Carregando...</p>
    </Container>
  );
}

export default Loading;