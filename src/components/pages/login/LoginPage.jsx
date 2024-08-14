import { useContext } from 'react';
import UserContext from '../../../context/UserContext';

import Logo from "../../reusable-ui/Logo";
import LoginForm from './LoginForm';

import styled from "styled-components";

export default function LoginPage() {
  const { user, isLoggedIn } = useContext(UserContext);

  return (
    <LoginPageStyled>
        <Logo />
        <LoginForm/>
        {isLoggedIn && user && (
          <h1>Bienvenue {user.name}</h1>
        )}
    </LoginPageStyled>
  )
}

const LoginPageStyled = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
`;