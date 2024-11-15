import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../../actions/boardActions';
import styled from 'styled-components';
import { theme } from '../../../theme';
import { IoChevronForward } from 'react-icons/io5';
import TextInput from '../../reusable-ui/TextInput';
import PrimaryButton from '../../reusable-ui/PrimaryButton';
export default function CreateBoard({ onClose }) {
    const [ boardName, setBoardName ] = useState("");
    const [ boardDescription, setBoardDescription ] = useState("");
    const [ boardCapacity, setBoardCapacity] = useState(2);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeName = (event) => setBoardName(event.target.value);
    const handleChangeDesc = (event) => setBoardDescription(event.target.value);
    const handleCapacityChange = (event) => setBoardCapacity(event.target.value);
    
    const handleCreateBoard = async (event) => {
        event.preventDefault();
        dispatch(createBoard(boardName, boardDescription, boardCapacity))
            .then(navigate('/boards'))
            .catch((err) => console.error(err.message));
        onClose();
    }
  return (
    <CreateBoardStyled onSubmit={handleCreateBoard}>
        {/* NAME */}
        <TextInput 
            type="text"
            placeholder={'Entrez un nom'} 
            value={boardName}
            onChange={handleChangeName}
            required 
        />
        {/* DESCRIPTION */}
        <TextInput 
            type="textarea"
            placeholder={'Entrez une courte description'} 
            value={boardDescription}
            onChange={handleChangeDesc}
            required 
        />
        {/* CAPACITY */}
        <div>
            <TextInput 
                type="range"
                min="2" max="10"
                placeholder={'Entrez une capacité'}
                value={boardCapacity}
                onChange={handleCapacityChange} 
                required 
            />
            <TextInput
                type="text"
                className="capacityBoard"
                value={boardCapacity}
                readOnly
            />
        </div>
        {/* SUBMIT */}
        <PrimaryButton 
            type="submit"
            label={'Confirmer'} 
            Icon={<IoChevronForward className="icon" />}
        />
    </CreateBoardStyled>
  )
}

const CreateBoardStyled = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px dotted white;
    padding: 10px ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.round};
    font-family: "Pacifico", sans-serif;

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
`;