import { useContext, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { theme } from '../../../theme';
import Logo from "../../reusable-ui/Logo"
import LoggedInMenu from "./LoggedInMenu/Main"
import LoggedOutMenu from "./LoggedOutMenu/Main"

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
                <h1>Bienvenue {user.name || 'Utilisateur'}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>VALUE</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{user.id || 'Non défini'}</td>
                        </tr>
                        <tr>
                            <td>NAME</td>
                            <td>{user.name || 'Non défini'}</td>
                        </tr>
                        <tr>
                            <td>E-MAIL</td>
                            <td>{user.email || 'Non défini'}</td>
                        </tr>
                    </tbody>
                </table>
                <LoggedInMenu />

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

    table {
      color: white;
      border: 1px dashed white;
      padding: 20px 5px;
      text-align: center;
    }

    table th {
        padding: 20px 10px;
        color: red;
        border: 1px dotted red;
        text-align: center;
        margin: 0 auto;
    }

    table td {
        padding: 20px 10px;
        color: whitesmoke;
        border: 1px dotted whitesmoke;
        text-align: left;
        margin: 0 auto;
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