import { useContext, useState, useCallback } from 'react';
import UserContext from '../../../../context/UserContext';

import styled from "styled-components";
import { theme } from '../../../../theme';
import Logo from "../../../reusable-ui/Logo";

import PrimaryButton from '../../../reusable-ui/PrimaryButton';
import { IoChevronForward } from 'react-icons/io5';

import LoginForm from "./LoginForm"
import RegisterForm from './RegisterForm';

import { DEBUG } from '../../../../config/debug';


export default function Main() {
    const { isRegistering, setIsRegistering } = useContext(UserContext);
    
    const toggleForm = useCallback(() => {
        setIsRegistering((prevIsRegistering) => {
          const newIsRegistering = !prevIsRegistering;
          // if (DEBUG) console.log(newIsRegistering);
          return newIsRegistering;
        });
      }, [setIsRegistering, DEBUG]);

    return (
        <LoggedOutPageStyled>
            <Logo />
            {isRegistering ? (
                <>
                    <RegisterForm />
                    <PrimaryButton 
                        label={"Se Connecter"} 
                        Icon={<IoChevronForward/>} 
                        onClick={toggleForm} 
                    />
                </>
            ) : (
                <>
                    <LoginForm />
                    <PrimaryButton 
                        label={"S'inscrire"} 
                        Icon={<IoChevronForward/>} 
                        onClick={toggleForm} 
                    />
                </>
            )}
        </LoggedOutPageStyled>
    );
}

const LoggedOutPageStyled = styled.div`
    height: 100vh;
    max-width: 800px;
    min-width: 400px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Pacifico", sans-serif;

    .buttonContainer {
        min-width: 250px;
        max-width: 500px;
        font-family: "Pacifico", sans-serif;
        padding: 16px 24px;
        margin: 0;
    }

    h1 {
      color: white;
    }

    &:hover {
        color: ${theme.colors.primary};
    }
`;
