import styled from "styled-components";
import { theme } from "../../theme";

export default function IconButton({Icon, Label, onClick=()=>{} }) {
  return (
    <IconButtonStyled onClick={onClick}>
        <span className="icon">{Icon && Icon}</span>
        <span>{Label && Label}</span>
    </IconButtonStyled>
  )
}

const IconButtonStyled = styled.button`
    background: none;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 16px 24px;
    cursor: pointer;
    line-height: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    font-family: "Roboto", sans-serif;
    font-weight:  ${theme.fonts.weights.light};
    font-size: ${theme.fonts.size.P1};

    .icon {
        font-size: ${theme.fonts.size.P4};
    }

    &:hover:not(:disabled) {
        color: ${theme.colors.primary2};
        transition: all 0.3s ease-in-out;
        transform: scale(1.05);
    }
    &:active {
        color: white;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`
