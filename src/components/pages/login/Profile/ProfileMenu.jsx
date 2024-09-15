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
    display: flex;
    flex-direction: column;
    
    button {
        padding: 15px 10px;
        border-radius: 10px;
        border: 2px solid ${theme.colors.greySemiDark};
        margin: 2px;
    }

    .buttonUpdateProfile {
        background-color: ${theme.colors.darkGreen};
        border: 1px solid ${theme.colors.darkGreen};
        color: ${theme.colors.greyLight};
        font-weight: bolder;
    }

    .buttonDeleteProfile {
        background-color: ${theme.colors.redSecondary};
        border: 1px solid ${theme.colors.redSecondary};
        color: ${theme.colors.greyLight};
        font-weight: bolder;
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
