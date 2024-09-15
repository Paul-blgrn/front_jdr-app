import { useContext, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { theme } from '../../../theme';
import Logo from "../../reusable-ui/Logo"
import LoggedOutMenu from "./LoggedOutMenu/Main"
import Profile from './Profile/Profile';
import MainMenu from '../nav/MainMenu'

import { DEBUG } from '../../../config/debug';

export default function Login() {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        
        if (!isLoggedIn || !user) {
            console.log("[MainLogin]: Condition non remplie, arrêt du useEffect");
            hasRun.current = true;
            return; // Le useEffect se termine ici, rien d'autre n'est exécuté
        } else {
            console.log("[MainLogin]: isLoggedIn = ", isLoggedIn);
            console.log("[MainLogin]: User = ", user);
            hasRun.current = true;
            return;
        }
    }, [isLoggedIn, user]);

    if (isLoggedIn && user) {
        return (
            <LoginPageStyled>
                <Logo />
                <MainMenu />
                <Profile />
            </LoginPageStyled>
        )
    } else {
        return (
            <LoginPageStyled>
                <LoggedOutMenu />
            </LoginPageStyled>
        )
    }
}

const LoginPageStyled = styled.div`
    max-height: 100vh;
    max-width: 800px;
    min-width: 400px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Pacifico", sans-serif;

    h1 {
      color: white;
      font-size: x-large;
      font-weight: bold;
      padding: 10px 15px;
    }

    &:hover {
        color: ${theme.colors.primary};
    }
`;