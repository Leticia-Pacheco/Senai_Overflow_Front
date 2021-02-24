import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    position: relative; /*Quando queremos que um elemento filho seja absolute e não
                          saia de dentro, colocamos o elemento pai como relative*/
    margin-top: 15px;

    > input {
        border: 0px;
        padding-left: 10px;
        border-radius: 3px;

        font-family: sans-serif;
    }

    > label {
        position: absolute;
        left: 10px;
        top: 0px;
        display: flex;
        align-items: center;

        transition: 0.2s ease-in-out;

        color: var(--darkGray);
        cursor: text;

        pointer-events: none;
    }

    > input,
    > label {
        width: 100%;
        height: 30px;
        font-size: 16px;
    }

    > input:focus {
        border-bottom: 2px solid var(--primary);
    }

    /* Serve para quando clicarmos num campo, o placeholder ficar em cima do botão
    apenas para indicar o que é o campo */
    >input:not(:placeholder-shown) + label,
    > input:focus + label {
        font-size: 14px;
        color: var(--light);
        top: -25px;
        left:0px;
    }
`;