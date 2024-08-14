import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import styled from 'styled-components';
import { theme } from "../../../theme/index"

import UserContext from '../../../context/UserContext';

import PrimaryButton from "../../reusable-ui/PrimaryButton";
import TextInput from "../../reusable-ui/TextInput";

import { IoChevronForward } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";

import API from '../../../services/API';
import { deleteAllCookies, deleteCookie, getCookie, getCsrfCookie } from '../../../utils/cookieManager';

import { DEBUG } from '../../../config/debug';

export default function LoginForm() {
    const debug = false;
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChangeEmail = (event) => setEmailValue(event.target.value);
    const handleChangePass = (event) => setPassValue(event.target.value);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null); 

        try {
            // Get the CSRF token
            await getCsrfCookie();

            // Get the cookie with CSRF token
            const xsrfToken = getCookie('XSRF-TOKEN');
            if (DEBUG) {
                console.log('XSRF-TOKEN:', xsrfToken);
            }

            const response = await API.post('/login', {
                email: emailValue,
                password: passValue,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
            });

            if (response.status === 200) {
                const {token, user} = response.data;
                API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(user);
                setIsLoggedIn(true);

                if (DEBUG) {
                    console.log('Token:', token);
                    console.log('User:', user);
                    console.log('login successfully !');
                }

                navigate('/');
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            if (DEBUG) {
                console.error('Login error:', error);
            }
            setError('Login failed. Please try again.');
        }
    }

    const handleLogout = async () => {
        setError(null);
        try {
            await API.post('/logout');
            setUser(null);
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            if (DEBUG) {
                console.error('Logout error:', error);
                setError('Log-Out Error:', error);
            }

        }
    }

    const handleRegisterRedirect = () => navigate('/register');

    if (isLoggedIn) {
        return (
            <LogoutContainer>
                <PrimaryButton
                    Icon={<IoChevronForward className="icon" />}
                    label="Se déconnecter"
                    onClick={handleLogout}
                />
            </LogoutContainer>
        );
    }

    return (
        <LoginFormStyled onSubmit={handleLogin}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <TextInput
                value={emailValue}
                onChange={handleChangeEmail}
                placeholder="Entrez votre E-mail"
                required
                Icon={<BsPersonCircle className="icon" />}
            />
            <TextInput
                type="password"
                value={passValue}
                onChange={handleChangePass}
                placeholder="Entrez votre mot de passe"
                required
                Icon={<BsPersonCircle className="icon" />}
            />
            <PrimaryButton Icon={<IoChevronForward className="icon" />} label="Se Connecter" />
            <PrimaryButton
                Icon={<IoChevronForward className="icon" />}
                label="S'inscrire"
                type="button"
                onClick={handleRegisterRedirect}
            />
        </LoginFormStyled>
    );
}

const LoginFormStyled = styled.form`
    text-align: center;
    max-width: 500px;
    min-width: 400px;
    margin: 0px auto;
    padding: 40px ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.round};
    font-family: "Pacifico", sans-serif;

    hr {
        border: 1.5px solid ${theme.colors.loginLine};
        margin-bottom: ${theme.gridUnit * 5}px;
    }

    h1 {
        color: ${theme.colors.white};
        font-size: ${theme.fonts.size.P5};
    }

    h2 {
        margin: 20px 10px 10px;
        color: ${theme.colors.white};
        font-size: ${theme.fonts.size.P4};
    }

    .icon {
        vertical-align: middle;
        justify-content: center;
        align-items: center;
        font-size: ${theme.fonts.size.P0};
        margin-left: 10px;
    }
`;

const LogoutContainer = styled.div`
    text-align: center;
    margin: 20px auto;
`;

const ErrorMessage = styled.div`
    color: ${theme.colors.error};
    margin-bottom: ${theme.spacing.md};
`;