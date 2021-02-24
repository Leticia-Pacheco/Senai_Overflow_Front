import { Container } from "./styles";

function Chips ({ info, handleClose }) {
    return(
        <Container>
            {info}
            <span onClick={handleClose}>&times;</span>
        </Container>
    );
}

export default Chips;