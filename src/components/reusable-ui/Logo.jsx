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
  display: grid;
  place-items: center;

  @media (min-width: 768px) {
    padding-top: 40px; /* Add more space for larger screens */
  }

  @media (max-width: 768px) {
    padding-top: 10px; /* Adjust for smaller screens */
    img {
      height: 200px; /* Make logo smaller on smaller screens */
    }
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