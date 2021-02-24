import styled, { keyframes } from "styled-components";

const spin = keyframes`
    100%{
        transform: rotate(360deg);
    }
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: #333c;

    z-index: 99;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    user-select: none;

    /* Estamo fazendo a "bolinha" que roda enquanto esperamos carregar */
    > img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        opacity: 0.8;
        margin-bottom: 10px;
        /* border: 1px solid white; */

        animation: ${spin} 3s linear infinite;
    }
`;