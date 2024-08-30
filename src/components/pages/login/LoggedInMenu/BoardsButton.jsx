import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import PrimaryButton from '../../../reusable-ui/PrimaryButton';
import { IoChevronForward } from "react-icons/io5";

import { DEBUG } from '../../../../config/debug';

export default function BoardsButton() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBoards = async () => {
        setError(null);
        navigate('/boards');
        if (DEBUG) {
            console.log('Boards button pressed !');
        }
    }
  return (
    <PrimaryButton
            Icon={<IoChevronForward />}
            label="Mes Tables"
            onClick={handleBoards}
        />
  )
}
