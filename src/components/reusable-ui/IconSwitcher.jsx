import React, { useState } from 'react'
import * as FaIcons  from "react-icons/fa";
import * as TiIcons from "react-icons/ti";
import * as RiIcons from "react-icons/ri";

import styled from "styled-components";

export default function IconSwitcher({
    defaultLibrary = "fa",
    hoverLibrary = "fa",
    defaultIcon, 
    hoverIcon, 
    size = 40, 
    defaultColor = "black", 
    hoverColor = "black", 
    onClick=()=>{}
}) {
    const [isHovered, setIsHovered] = useState(false);


    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const iconLibraries = {
        fa: FaIcons,
        ti: TiIcons,
        ri: RiIcons,
    }

    const DefaultIcons = iconLibraries[defaultLibrary] || {};
    const HovertIcons = iconLibraries[hoverLibrary] || {};

    const DefaultIcon = DefaultIcons[defaultIcon];
    const HoverIcon = HovertIcons[hoverIcon];

    return (
        <IconSwitcherStyled
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isHovered={isHovered}
            hoverColor={hoverColor}
            defaultColor={defaultColor}
            size={size}
        > 
            {isHovered ? (
                HoverIcon && <HoverIcon />
            ) : (
                DefaultIcon && <DefaultIcon />
            )}
        </IconSwitcherStyled>
    )
}

const IconSwitcherStyled = styled.div.withConfig({
    shouldForwardProp: (prop) => 
        !['isHovered', 'hoverColor', 'defaultColor'].includes(prop)
})`
    display: flex;
    justify-content: right;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
    color: ${({ isHovered, hoverColor, defaultColor }) =>
    isHovered ? hoverColor : defaultColor};
    font-size: ${({ size }) => size}px;

    &:hover {
        cursor: pointer;
    }

`;