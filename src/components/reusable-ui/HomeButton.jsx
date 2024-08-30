import { useNavigate } from "react-router-dom"

import styled from "styled-components";
import { theme } from "../../theme";

import { BsHouseDoorFill } from "react-icons/bs";

export default function HomeButton() {
    const navigate = useNavigate();
    const redirectHome = (event) => navigate('/');
  return (
    <HomeButtonStyled className="homeButtonContainer" onClick={redirectHome} title="Accueil">
        <span className="icon"><BsHouseDoorFill className="iconHome"/></span>
    </HomeButtonStyled>
  )
}

const HomeButtonStyled = styled.button`
    background: #63a5aa;
    border: 1px solid #63a5aa;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    font-weight: 800;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    line-height: 1;

    margin-bottom: 5px;
    margin-left: 2px;
    margin-right: 2px;

    .buttonContainer {
        min-width: 250px;
        max-width: 500px;
        font-family: "Pacifico", sans-serif;
    }

    &:hover:not(:disabled) {
        background: white;
        color: #63a5aa;
        border: 1px solid #63a5aa;
        transition: all 0.3s ease-in-out;
        /* transform: scale(1.05); */
    }

    &:active {
        color: white;
        background: #63a5aa;
        border: 1px solid #63a5aa;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`
