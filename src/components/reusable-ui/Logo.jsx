import styled from "styled-components";
import { theme } from "../../theme";

export default function Logo() {
  return (
    <LogoStyled>
        <img src="/images/logo.png" alt="logo jdr_app"/>
        <h1>Grimoire Tales</h1>
        <p>Votre application de gestion de JDR</p>
    </LogoStyled>
  )
}

const LogoStyled = styled.div`
display: flex;
align-items: center;
flex-direction: column;

@media (min-width: 768px) {
    // transform: scale(2.5);
  }

  @media (min-width: 400px) and (max-width: 768px) {
    //transform: scale(1.5);
  }


h1 {
    text-align: center;
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.size.P5};
    line-height: 1em;
    font-weight: ${theme.fonts.weights.bold};
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-family: "OpenSans", sans-serif;
}

p {
    text-align: center;
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.size.P1};
    line-height: 1em;
    font-weight: ${theme.fonts.weights.bold};
    text-transform: lowercase;
    letter-spacing: 1.5px;
    font-family: "OpenSans", sans-serif;
}

img {
    object-fit: cover;
    object-position: center;
    height: 140px;
    margin: 0 5px;
}
`;