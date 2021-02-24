import styled, { keyframes } from "styled-components";

// No JS, nós devemos colocar a imagem que queremos utilizar dentro de uma variável
import bgImg from "../../assets/bg.jpg";

/* Para estilizar um componente, devemos sempre abrir a crase para indicar que aquele bloco de código é
feito para AQUELE componente*/
export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    /* Para criar um elemento em cima de outro e abaixo de outro e deixar embaçado, */
    ::before{
        content:"";

        position: absolute;
        top:0px;
        left:0px;
        width: 100%;
        height: 100%;

        background-image: url(${bgImg});
        background-repeat: no-repeat;
        background-size: cover;
        background-position:center;

        filter: blur(4px); /* serve para embaçar elementos */

        z-index: -1;
    }
`;

// Animação da abertura da aplicação
const loginAnimation = keyframes`
    0%{
        top: -250px;
        opacity: 0;
        transform: scale(0.01) rotate(90deg);
    }
    
    100%{
        top: 0px;
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
`;

export const FormLogin = styled.form`
    animation: ${loginAnimation} 0.5s;

    width: 30%;
    min-width: 300px;
    max-width: 500px;

    background-color: #282a3699;
    border-radius: 4px;
    text-align: center;

    box-shadow: 0px 0px 10px black;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

export const Header = styled.header`
    width: 100%;
    padding: 20px;
    border-radius: 4px 4px 0px 0px;

    background-color: var(--dark);
    box-shadow: 0px 2px 4px black;

    /* Aqui nós estamos dizendo que todos h1 dentro do header tenha certas propriedades */
    > h1{
        font-size: 24px;
        text-align: center;
        margin-bottom: 10px;
    }

    > h2{
        font-size: 18px;
        text-align: center;

    }
`;

export const Body = styled.section`
    width: 100%;
    padding: 30px;
    padding-top: 10px;
    
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Button = styled.button`
    width: 100%;
    margin-top: 10px;
`