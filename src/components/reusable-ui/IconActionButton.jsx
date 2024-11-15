import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"

import styled from "styled-components";
import { theme } from "../../theme";

import { DEBUG } from '../../config/debug';

export default function IconButton({ Icon, Label, Link, Dispatch }) {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = async () => {
        setError(null);
        const finalLink = Link || '/';
        let actionToDispatch = Dispatch;

        // Check if Dispatch is a function, if so, don't call it yet
        if (typeof Dispatch === 'function') {
            actionToDispatch = Dispatch();
        }

        try {
            // If there's a link and an action to dispatch, handle both
            if (Link && actionToDispatch) {
                await dispatch(actionToDispatch);
                navigate(finalLink);
            } 
            // If only a link is provided, navigate without dispatching
            else if (Link) {
                navigate(finalLink);
                if (DEBUG) console.log('[IconButton Dispatcher]: <', finalLink, '> link button pressed !');
            }
            // If only an action is provided, just dispatch
            else if (actionToDispatch) {
                await dispatch(actionToDispatch);
            }
            // default button (link button)
            else {
                navigate(finalLink);
                if (DEBUG) console.log('[IconButton Dispatcher default]: <', finalLink, '> link button pressed !');
            }
        } catch (err) {
            setError(err.message);
            console.error('[IconButton Dispatcher]: ', error);
        }

    };

    return (
        <IconActionButtonStyled onClick={handleNavigate}>
            <span className="icon">{Icon && Icon}</span>
            <span>{Label && Label}</span>
        </IconActionButtonStyled>
    )
}

const IconActionButtonStyled = styled.button`
    background: none;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 16px 24px;
    cursor: pointer;
    line-height: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    font-family: "Roboto", sans-serif;
    font-weight:  ${theme.fonts.weights.light};
    font-size: ${theme.fonts.size.P1};

    .icon {
        font-size: ${theme.fonts.size.P4};
    }

    &:hover:not(:disabled) {
        color: ${theme.colors.primary2};
        transition: all 0.3s ease-in-out;
        transform: scale(1.05);
    }
    &:active {
        color: white;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`
