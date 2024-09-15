import styled from "styled-components";
import { theme } from "../../../../theme";
import { BsPersonCircle } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";

import { useSelector } from 'react-redux';

import ProfileMenu from "./ProfileMenu";

export default function Profile() {
    const { user } = useSelector(state => state.user);
    return (
        <ProfilePageStyled>
            <thead>
                <tr>
                    <th colSpan={2}>Bienvenue, <span>{user.name}</span></th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>ID</td>
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
                <tr>
                    <td colSpan={2}> <ProfileMenu /> </td>
                </tr>
            </tbody>
        </ProfilePageStyled>
    )
}

const ProfilePageStyled = styled.table`
    color: white;
    border: 1px dashed white;
    padding: 20px 5px;
    text-align: center;


    th {
        padding: 20px 10px;
        color: whitesmoke;
        font-weight: bold;
        border: 1px dotted white;
        text-align: center;
        margin: 0 auto;
    }

    th span {
        color: red;
        font-weight: bolder;
    }

    td {
        padding: 20px 10px;
        color: whitesmoke;
        border: 1px dotted whitesmoke;
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
