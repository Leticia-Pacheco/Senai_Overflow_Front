import { createGlobalStyle } from "styled-components";

/* A sintaxe é dessa forma: Após exportar a constante e receber o createGlobalStyle, abrimos crase e 
colocamos aí dentro os códigos do CSS*/
export const GlobalStyles = createGlobalStyle`

    /* Paleta de cores */
    :root{
        --dark: #282a36;
        --darkGray: #44475a;
        --light: #EDF2F4;
        --primary: #EF233C;
        --secondary: #D90429;
    }

    *{
        margin: 0px;
        padding: 0px;
        outline: 0px; /*Para não colocar aquelas linhas clarinhas em volta do componente*/
        box-sizing: border-box;
    }
    
    /* A scrollbar num todo, tamanho, cores e afins */
    ::-webkit-scrollbar {
        width: 4px;
        background-color: var(--darkGray);
    }
    
    /* A parte de trás da barra de rolagem */
    ::-webkit-scrollbar-track {
        background-color: var(--darkGray);
    }

    /* O cursorzinho que, normalmente é cinza escuro. */
    ::-webkit-scrollbar-thumb {
        background-color: var(--light);
        border-radius: 2px;
    }

    body{
        font-family: "Franklin Ghotic Medium", "Times new roman";
        color: var(--light); /* Como estamos usando uma cor que criamos, ela é considerada uma variável */
    }

    button{
        padding: 10px;

        font-weight: bold;
        color: var(--light);
        background-color: var(--darkGray);
        border: 1px solid var(--light);
        border-radius: 4px;

        cursor: pointer;

        transition: 1s ease-in;

        /* Quando passar o mouse por cima do botão */
        :hover{
            background-color: var(--primary);
        }


        :active{
            transform: scale(0.95);
        }

        :disabled{
            background-color: transparent;
            border: 1px solid var(--darkGray);
            color: var(--darkGray);
        }
    }

    a{
        color: var(--light);
        transition: 1s;

        :hover{
            color: var(--primary);
        }

        :active{
            transform: scale(0.95);
        }
    }

    textarea, select {
        font-size: 16px;
        padding: 5px;
        border-radius: 4px;

        resize: none;

        font-family: 'Times New Roman'
    }
`;