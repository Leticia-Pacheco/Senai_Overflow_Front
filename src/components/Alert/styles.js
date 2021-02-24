import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 0px;
  height: 80px;
  margin: 10px;

  transition: width 0.8s;

  border-radius: 4px;
  background-color: ${(props) =>
    props.type === "error" ? "#d90429cc" : "#04d929cc"};

    white-space: nowrap; /*serve para não quebrar linha do texto*/
    overflow: hidden;

  > h1 {
    font-size: 18px;
    margin: 5px;
  }

  > p {
    font-size: 14px;
    margin-left: 5px;
  }

  > span {
    position: absolute;
    top: 5px;
    right: 10px;

    font-size: 20px;

    cursor: pointer;
    transition: 2s;

    :hover {
      color: var(--dark);
    }
  }
`;