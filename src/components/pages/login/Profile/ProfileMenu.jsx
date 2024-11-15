import styled from "styled-components";
import { theme } from "../../../../theme";

export default function ProfileMenu() {
  return (
    <ProfileMenuStyled>
        <button className="buttonUpdateProfile">Sauvegarder mon profil</button>
        <button className="buttonDeleteProfile">Supprimer mon profil</button>
    </ProfileMenuStyled>
  )
}

const ProfileMenuStyled = styled.div`
    min-width: 15vw;
    max-width: 40vw;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 0 auto;
    
    button {
        min-width: 15vw;
        max-width: 40vw;
        padding: 15px 10px;
        border-radius: 10px;
        margin: 2px;
        font-size: 0.9em;
        font-weight: bolder;
    }

    .buttonUpdateProfile {
        background-color: ${theme.colors.darkGreen};
        border: 1px solid ${theme.colors.darkGreen};
        color: ${theme.colors.greyLight};
    }

    .buttonDeleteProfile {
        background-color: ${theme.colors.redSecondary};
        border: 1px solid ${theme.colors.redSecondary};
        color: ${theme.colors.greyLight};
    }

    .buttonUpdateProfile:hover {
        color: ${theme.colors.background_white};
        background-color: ${theme.colors.success};
        border: 1px solid ${theme.colors.success};
    }

    .buttonDeleteProfile:hover {
        color: ${theme.colors.background_white};
        background-color: ${theme.colors.red};
        border: 1px solid ${theme.colors.red};
    }
`;
