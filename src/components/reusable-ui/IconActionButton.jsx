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
            console.error('[IconButton Dispatcher]: ', err.message);
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
    font-size: 15px;
    font-weight: 800;
    padding: 16px 24px;
    cursor: pointer;
    line-height: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    .icon {
        font-size: 30px;
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
