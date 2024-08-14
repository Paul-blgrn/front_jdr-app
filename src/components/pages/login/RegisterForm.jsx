import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../../theme/index';
import PrimaryButton from '../../reusable-ui/PrimaryButton';
import TextInput from '../../reusable-ui/TextInput';
import { IoChevronForward } from 'react-icons/io5';
import { BsPersonCircle } from 'react-icons/bs';
import API from '../../../services/API';
import { deleteAllCookies, deleteCookie, getCookie, getCsrfCookie } from '../../../utils/cookieManager';

export default function RegisterForm() {
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [passConfirmValue, setPassConfirmValue] = useState("");
    const navigate = useNavigate();

    const handleChangeName = (event) => {
        setNameValue(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setEmailValue(event.target.value);
    }

    const handleChangePass = (event) => {
        setPassValue(event.target.value);
    }

    const handleChangePassConfirm = (event) => {
        setPassConfirmValue(event.target.value);
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        console.log("Register button clicked");

        const xsrfToken = getCookie('XSRF-TOKEN');
        console.log('XSRF-TOKEN:', xsrfToken);

        try {
            // Premièrement, obtenez le cookie CSRF
            // await API.get('/sanctum/csrf-cookie');
            await getCsrfCookie();

            // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const xsrfToken = getCookie('XSRF-TOKEN');
            console.log('XSRF-TOKEN:', xsrfToken);

            // Ensuite, envoyez la requête d'enregistrement
            const response = await API.post('/register', {
                name: nameValue,
                email: emailValue,
                password: passValue,
                password_confirmation: passConfirmValue,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
            });

            console.log("Registration response received:", response);
            console.log("Registration successful");
            deleteAllCookies('127.0.0.1', '/');
            navigate("/");
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
        }
    };

    return (
        <RegisterFormStyled onSubmit={handleRegister}>
            <TextInput value={nameValue} onChange={handleChangeName} placeholder={"Entrez votre prénom"} required Icon={<BsPersonCircle className="icon" />} />
            <TextInput value={emailValue} onChange={handleChangeEmail} placeholder={"Entrez votre email"} required Icon={<BsPersonCircle className="icon" />} />
            <TextInput type="password" value={passValue} onChange={handleChangePass} placeholder={"Entrez votre mot de passe"} required Icon={<BsPersonCircle className="icon" />} />
            <TextInput type="password" value={passConfirmValue} onChange={handleChangePassConfirm} placeholder={"Confirmez votre mot de passe"} required Icon={<BsPersonCircle className="icon" />} />
            <PrimaryButton Icon={<IoChevronForward className="icon" />} label={"S'inscrire"} type="submit" />
        </RegisterFormStyled>
    )
}

const RegisterFormStyled = styled.form`
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