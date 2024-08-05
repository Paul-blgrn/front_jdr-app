import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import styled from 'styled-components';
import { theme } from "../../../theme/index"

import TextInput from "../../reusable-ui/TextInput";

import { IoChevronForward } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";

export default function LoginForm() {
    const [nameValue, setNameValue] = useState("")
    const [passValue, setPassValue] = useState("")
    const navigate = useNavigate();

    const handleChange = (event) => {
        const valueAfterChange = event.target.value
        setValue(valueAfterChange)
    }
    return (
        <LoginFormStyled>
            <TextInput value={nameValue} onChange={handleChange} placeholder={"Entrez votre prénom"} required Icon={<BsPersonCircle className="icon" />} />
            <TextInput value={passValue} onChange={handleChange} placeholder={"Entrez votre mot de passe"} required Icon={<BsPersonCircle className="icon" />} />
        </LoginFormStyled>
    )
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