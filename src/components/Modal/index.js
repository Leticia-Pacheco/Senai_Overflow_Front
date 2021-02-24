import { Overlay, ModalContainer } from "./styles";

function Modal({ title, children, handleClose }) {
  return (
    <Overlay>
      <ModalContainer>
        <span onClick={handleClose}>&times;</span>
        <header>{title}</header>
        {children}
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;