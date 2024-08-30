import styled from "styled-components";
import { theme } from "../../theme";

export default function Logo() {
  return (
    <LogoStyled>
        <img src="/images/logo_app_white.png" alt="logo jdr_app" />
        <h2>Votre gestionnaire de JDR</h2>
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


h2 {
    text-align: center;
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.size.P4};
    line-height: 1em;
    font-weight: ${theme.fonts.weights.bold};
    text-transform: uppercase;
    letter-spacing: 0.2px;
    font-family: "OpenSans", sans-serif;
    margin-top: -50px;
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
    height: 340px;
    margin: 0 5px;
}
`;