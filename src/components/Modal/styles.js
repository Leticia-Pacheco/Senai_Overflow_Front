import styled from "styled-components";

export const Overlay = styled.div `
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 9;

    background-color: #333C;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.section `
    min-width: 250px;
    min-height: 250px;
    max-height: calc(100vh - 20px); /*Para calcular uma boa altura e que não fique tão grande nem tão pequeno*/
    padding: 20px;

    z-index: 19;

    overflow-y: auto;

    background-color: var(--dark);
    box-shadow: 0px 0px 10px black;
    border-radius: 4px;

    position: absolute;

    > span {
        position: absolute;
        top: 15px;
        right: 20px;

        font-size: 30px;

        cursor: pointer;
        transition: 2s;

        :hover{
            color: var(--primary);
        }
    }

    > header {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
        margin: 0px 20px;
    }
`;