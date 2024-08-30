import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"

import { logoutUser } from "../../actions/userActions";
import { DEBUG } from "../../config/debug";

import styled from "styled-components";
import { theme } from "../../theme";

import { LuArrowRightSquare } from "react-icons/lu";

export default function DisconnectButton() {
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logoutUser())
            .then(() => navigate('/'))
            .catch((err) => console.error('[Logout Button]: Error during logout ' . err.message));
        if (DEBUG) console.info('[Logout Button]: Attempting logout..');
    }

  return (
    <DisconnectButtonStyled className="homeButtonContainer" onClick={handleLogout} title="Se Déconnecter">
        <span className="icon"><LuArrowRightSquare /></span>
    </DisconnectButtonStyled>
  )
}

const DisconnectButtonStyled = styled.button`
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

    display: flex;
    align-items: center;
    justify-content: center;

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
