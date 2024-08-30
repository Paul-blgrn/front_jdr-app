import { useNavigate } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/UserContext';

import styled from "styled-components";
import { theme } from '../../../theme';
import Logo from "../../reusable-ui/Logo"

import LoggedInMenu from "../login/LoggedInMenu/Main"
import LoggedOutMenu from "../login/LoggedOutMenu/Main"

import PrimaryButton from '../../reusable-ui/PrimaryButton';
import { IoChevronForward } from 'react-icons/io5';

import { DEBUG } from '../../../config/debug';

export default function Main() {
    const { 
        user, 
        setUser, 
        isLoggedIn, 
        setIsLoggedIn, 
        isRegistering, 
        setIsRegistering 
    } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = () => navigate('/login')

    useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn);
        console.log("User:", user);
    }, [isLoggedIn, user]);
    

    if (isLoggedIn && user) {
        return (
            <LoginPageStyled>
                <Logo />
                <h1>Bienvenue {user.name}</h1>
                <LoggedInMenu />
            </LoginPageStyled>
        )
    } else {
        return (
            <LoginPageStyled>
                <Logo />
                <PrimaryButton 
                    label={"Se Connecter"} 
                    Icon={<IoChevronForward 
                    className="icon" />} 
                    onClick={handleLogin} 
                />

                <PrimaryButton 
                    label={"S'inscrire"} 
                    Icon={<IoChevronForward 
                    className="icon" />} 
                    onClick={handleLogin} 
                />
            </LoginPageStyled>
        )
    }
}

const LoginPageStyled = styled.div`
    height: 100vh;
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
    }

    ::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background: url("/images/logo.png") no-repeat center center fixed rgba(0, 0, 0, 0.5);
        background-size: cover;
        background-blend-mode: darken;
    }

    .icon {
        vertical-align: middle;
        justify-content: center;
        align-items: center;
        font-size: ${theme.fonts.size.P0};
        margin-left: 10px;
    }

    &:hover {
        color: ${theme.colors.primary};
    }
`;