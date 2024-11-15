import styled from "styled-components";
// import { theme } from "../../../theme";

import IconActionButton from "../../reusable-ui/IconActionButton";
import { MdTableRestaurant } from "react-icons/md";
import { LuLayoutTemplate } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { FaHome } from "react-icons/fa";

import { logoutUser } from "../../../actions/userActions";
import { useLocation } from "react-router-dom";

// import { DEBUG } from '../../../config/debug';

export default function Menu() {
    const location = useLocation();
    const buttons = [
        { icon: <FaHome />, label: "Accueil", link: '/' },
        { icon: <MdTableRestaurant />, label: "Mes Tables", link: '/boards' },
        { icon: <LuLayoutTemplate />, label: "Mes Templates", link: '/templates' },
        { icon: <IoMdLogOut />, label: "Deconnexion", action: logoutUser }
    ];

    return (
        <MenuNavStyled>
            {buttons.map(({ icon, label, link, action }, index) => (
                // Only render if the current path is not equal to the button's link
                link !== location.pathname && (
                    <IconActionButton
                        key={index}
                        Icon={icon}
                        Label={label}
                        Link={link}
                        Dispatch={action}
                    />
                )
            ))}
        </MenuNavStyled>
    )
}

const MenuNavStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
`;
