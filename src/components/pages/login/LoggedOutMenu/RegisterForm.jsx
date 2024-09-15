import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../../../theme/index';
import PrimaryButton from '../../../reusable-ui/PrimaryButton';
import TextInput from '../../../reusable-ui/TextInput';
import { IoChevronForward } from 'react-icons/io5';
import { BsPersonCircle } from 'react-icons/bs';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import { registerUser } from '../../../../actions/userActions';
import { DEBUG } from '../../../../config/debug';

export default function RegisterForm() {
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [passConfirmValue, setPassConfirmValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, loading, error } = useSelector(state => state.user);

    const handleChangeName = (event) => setNameValue(event.target.value);
    const handleChangeEmail = (event) => setEmailValue(event.target.value);
    const handleChangePass = (event) => setPassValue(event.target.value);
    const handleChangePassConfirm = (event) => setPassConfirmValue(event.target.value);

    const validatePassword = (password) => {
        const minLength = 8;
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*(),.?":{}|<>-_]/.test(password);

        if (password.length < minLength) {
            return `Le mot de passe doit contenir au moins ${minLength} caractères.`;
        }
        if (!hasLetters) {
            return "Le mot de passe doit contenir au moins une lettre.";
        }
        if (!hasMixedCase) {
            return "Le mot de passe doit contenir des majuscules et des minuscules.";
        }
        if (!hasNumbers) {
            return "Le mot de passe doit contenir au moins un chiffre.";
        }
        if (!hasSymbols) {
            return "Le mot de passe doit contenir au moins un symbole.";
        }
        return null;
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const passwordError = validatePassword(passValue);

        if (passwordError) {
            setErrorMessage(passwordError);
            return;
        }

        if (passValue !== passConfirmValue) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        dispatch(registerUser(nameValue, emailValue, passValue, passConfirmValue))
            .then(() => navigate('/'))
            .catch((err) => console.error(err.message));
    };

    return (
        <RegisterFormStyled onSubmit={handleRegister}>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <TextInput value={nameValue} onChange={handleChangeName} placeholder={"Entrez votre prénom"} required Icon={<BsPersonCircle className="icon" />} />
            <TextInput value={emailValue} onChange={handleChangeEmail} placeholder={"Entrez votre email"} required Icon={<MdAlternateEmail className="icon" />} />
            <TextInput type="password" value={passValue} onChange={handleChangePass} placeholder={"Entrez votre mot de passe"} required Icon={<RiLockPasswordLine className="icon" />} />
            <TextInput type="password" value={passConfirmValue} onChange={handleChangePassConfirm} placeholder={"Confirmez votre mot de passe"} required Icon={<RiLockPasswordLine className="icon" />} />
            <PrimaryButton Icon={<IoChevronForward className="icon" />} label={"Confirmer"} type="submit" />
        </RegisterFormStyled>
    )
}

const RegisterFormStyled = styled.form`
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

    .error {
        color: red;
        margin-bottom: 10px;
    }
`;