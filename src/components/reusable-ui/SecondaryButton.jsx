import styled from "styled-components";
import { theme } from "../../theme";

export default function SecondaryButton({ label, Icon, onClick=()=>{} }) {
  return (
    <SecondaryButtonStyled className="buttonContainer" onClick={onClick}>
        <span>{label}</span>
        <span className="icon">{Icon && Icon}</span>
    </SecondaryButtonStyled>
  )
}

const SecondaryButtonStyled = styled.button`
    background: ${theme.colors.greyMedium};
    border: 1px solid ${theme.colors.greyDark};
    border-radius: 5px;
    color: white;
    font-size: 18px;
    font-weight: 800;
    padding: 16px 24px;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    line-height: 1;
    margin-bottom: 5px;
    margin-left: 2px;
    margin-right: 2px;

    .buttonContainer {
        min-width: 250px;
        max-width: 500px;
        font-family: "Pacifico", sans-serif;
    }

    &:hover:not(:disabled) {
        background: white;
        color: ${theme.colors.greyMedium};
        border: 1px solid ${theme.colors.greyMedium};
        transition: all 0.3s ease-in-out;
        transform: scale(1.05);
    }
    &:active {
        color: white;
        background: ${theme.colors.greyMedium};
        border: 1px solid ${theme.colors.greyMedium};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .icon {
        vertical-align: middle;
        justify-content: center;
        align-items: center;
        font-size: ${theme.fonts.size.P0};
        margin-left: 10px;
    }
`;