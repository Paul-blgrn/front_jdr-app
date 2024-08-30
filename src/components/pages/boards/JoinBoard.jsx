import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joinBoard } from '../../../actions/boardActions';

import styled from 'styled-components';
import { theme } from '../../../theme';
import { IoChevronForward } from 'react-icons/io5';

import TextInput from '../../reusable-ui/TextInput';
import PrimaryButton from '../../reusable-ui/PrimaryButton';

export default function JoinBoard({ onClose }) {
    const [ boardCode, setBoardCode ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeCode = (event) => setBoardCode(event.target.value);

    const handleCreateBoard = async (event) => {
        event.preventDefault();
        dispatch(joinBoard(boardCode))
            .then(navigate('/boards'))
            .catch((err) => console.error(err.message));
        onClose();
    }

  return (
    <JoinBoardStyled onSubmit={handleCreateBoard}>
        {/* CODE */}
        <TextInput 
            type="text"
            placeholder={'Entrez un code'} 
            value={boardCode}
            onChange={handleChangeCode}
            required 
        />
        {/* SUBMIT */}
        <PrimaryButton 
            type="submit"
            label={'Confirmer'} 
            Icon={<IoChevronForward className="icon" />}
        />
    </JoinBoardStyled>
  )
}

const JoinBoardStyled = styled.form`
    display: flex;
    flex-direction: column;
    /* position: relative;
    right: 8rem; */

    border: 1px dotted white;
    padding: 10px ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.round};
    font-family: "Pacifico", sans-serif;
    
    ::before {
        content: none;
        background: none;
    }

    div {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 2rem;
        max-width: 20rem;
    }

    .capacityBoard {
        width: 1.1rem;
        font-weight: bold;
        text-align: center;
    }

`
