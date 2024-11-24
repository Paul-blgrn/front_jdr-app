import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { theme } from "../../../../theme/index"
import PrimaryButton from "../../../reusable-ui/PrimaryButton";
import TextInput from "../../../reusable-ui/TextInput";
import { IoChevronForward } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { loginUser } from '../../../../actions/userActions';
import { DEBUG } from '../../../../config/debug';

export default function LoginForm() {
    const { error, loading } = useSelector(state => state.user || {});
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChangeEmail = (event) => setEmailValue(event.target.value);
    const handleChangePass = (event) => setPassValue(event.target.value);

    const handleLogin = async (event) => {
        event.preventDefault();
        if (DEBUG) console.log('[LoginForm]: Attempting login');
        dispatch(loginUser(emailValue, passValue))
            .then(() => navigate('/'))
            .catch((err) => console.error(err.message)
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
                Icon={<RiLockPasswordLine className="icon" />}
            />
            <PrimaryButton 
                Icon={<IoChevronForward />} 
                label={loading ? "Connexion..." : "Confirmer"}
            />
        </LoginFormStyled>
    );
}

const LoginFormStyled = styled.form`
    text-align: center;
    max-width: 500px;
    min-width: 400px;
    margin: 0px auto;
    padding: 10px ${theme.spacing.lg};
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

    .loginButton {
        background-color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
    }
`;

const ErrorMessage = styled.div`
    color: ${theme.colors.error};
    margin-bottom: ${theme.spacing.md};
`;