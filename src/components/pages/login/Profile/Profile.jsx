import styled from "styled-components";
import { theme } from "../../../../theme";

import { BsPersonCircle } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { PiIdentificationCardLight } from "react-icons/pi";

import { useSelector } from 'react-redux';

import ProfileMenu from "./ProfileMenu";

export default function Profile() {
    const { user } = useSelector(state => state.user);
    return (
        <ProfilePageStyled>
            <ProfilePageTableStyled>
                <thead>
                    <tr>
                        <th colSpan={2}>Bienvenue, <span>{user.name}</span></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><PiIdentificationCardLight className='icon-left' /> ID</td>
                        <td>{user.id || 'Non défini'}</td>
                    </tr>
                    <tr>
                        <td><BsPersonCircle className='icon-left' /> USERNAME</td>
                        <td>{user.name || 'Non défini'}</td>
                    </tr>
                    <tr>
                        <td><IoMailOutline className='icon-left' /> E-MAIL</td>
                        <td>{user.email || 'Non défini'}</td>
                    </tr>
                </tbody>
            </ProfilePageTableStyled>
            <ProfileMenu /> 
        </ProfilePageStyled>
    )
}
const ProfilePageStyled = styled.div`
    padding: 10px 5px;
`;

const ProfilePageTableStyled = styled.table`
    width: 60vw;
    color: ${theme.colors.greyDark};
    border: 1px dashed ${theme.colors.greyDark};
    padding: 20px 5px;
    text-align: center;
    background: rgba(255, 255, 255, 0.8);


    th {
        padding: 20px 10px;
        font-weight: bold;
        border: 1px dotted ${theme.colors.greyDark};
        text-align: center;
        margin: 0 auto;
    }

    th span {
        color: red;
        font-weight: bolder;
    }

    td {
        padding: 20px 10px;
        border: 1px dotted ${theme.colors.greyDark};
        text-align: left;
        margin: 0 auto;
    }

    .icon-left {
        vertical-align: middle;
        font-size: 1.2em;
        margin-right: 10px;
    }

    .icon-right {
        vertical-align: middle;
        font-size: 1.2em;
        margin-right: 10px;
    }
`;
