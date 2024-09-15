import styled from "styled-components";
import { theme } from "../../../theme";

import Logo from "../../reusable-ui/Logo";
import MainMenu from '../nav/MainMenu'
import EditorPage from "../editor/EditorPage"

export default function Main() {
  return (
    <TemplateStyled>
        <Logo />
        <MainMenu />
        <EditorPage />
    </TemplateStyled>
  )
}

const TemplateStyled = styled.div`
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
