import { useContext, useEffect, useState, useCallback } from 'react';
import UserContext from '../../../context/UserContext';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import styled, { keyframes, css } from "styled-components";
import { theme } from "../../../theme";
import Logo from "../../reusable-ui/Logo";
import { IoChevronForward } from 'react-icons/io5';
import PrimaryButton from "../../reusable-ui/PrimaryButton";

import HomeButton from '../../reusable-ui/HomeButton';
import DisconnectButton from '../../reusable-ui/DisconnectButton';
import CreateBoard from './CreateBoard';
import JoinBoard from './JoinBoard';

import { getBoards, getCreatedBoards, getJoinedBoards } from '../../../actions/boardActions';
import PaginateBoards from './PaginateBoards';

import { DEBUG } from "../../../config/debug";

export default function ReadBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector(state => state.user);
  const { 
    created_boards, 
    created_boards_meta, 
    joined_boards, 
    joined_boards_meta, 
    loading,
    loadingCreated,
    loadingJoined,
    error 
  }  = useSelector((state) => state.boards);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false);
  const [currentCreatedPage, setCurrentCreatedPage] = useState(1);
  const [currentJoinedPage, setCurrentJoinedPage] = useState(1);

  const { 
    isCreatingBoard, 
    setIsCreatingBoard, 
    isJoiningBoard, 
    setIsJoiningBoard 
  } = useContext(UserContext);

  const handleToggleCreateForm = useCallback(() => {
    setIsCreateFormOpen(!isCreateFormOpen);
    setIsJoinFormOpen(false);  // Ferme le formulaire rejoindre si le formulaire créer s'ouvre
    setIsCreatingBoard(!isCreateFormOpen);
    setIsJoiningBoard(false);  // Reset l'état de rejoindre
  }, [isCreateFormOpen, setIsCreatingBoard, setIsJoiningBoard]);

  const handleToggleJoinForm = useCallback(() => {
    setIsJoinFormOpen(!isJoinFormOpen);
    setIsCreateFormOpen(false);  // Ferme le formulaire créer si le formulaire rejoindre s'ouvre
    setIsJoiningBoard(!isJoinFormOpen);
    setIsCreatingBoard(false);  // Reset l'état de créer
  }, [isJoinFormOpen, setIsJoiningBoard, setIsCreatingBoard]);

  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
    setIsCreatingBoard(false);
  };

  const handleCloseJoinForm = () => {
    setIsJoinFormOpen(false);
    setIsJoiningBoard(false);
  };

  useEffect(() => {
    if (!isLoggedIn && !user) {
      navigate('/');
    }
    return;
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    // Charger les boards créés pour la page actuelle
    dispatch(getCreatedBoards(currentCreatedPage));
  }, [dispatch, currentCreatedPage]);

  useEffect(() => {
    // Charger les boards rejoints pour la page actuelle
    dispatch(getJoinedBoards(currentJoinedPage));
  }, [dispatch, currentJoinedPage]);

  //console.log('board const = ', board);

  const handlePageChange = (type, direction) => {
    if (type === 'created') {
      if (direction === 'next' && currentCreatedPage < created_boards_meta.last_page) {
        setCurrentCreatedPage(currentCreatedPage + 1);
      } else if (direction === 'prev' && currentCreatedPage > 1) {
        setCurrentCreatedPage(currentCreatedPage - 1);
      }
    } else if (type === 'joined') {
      if (direction === 'next' && currentJoinedPage < joined_boards_meta.last_page) {
        setCurrentJoinedPage(currentJoinedPage + 1);
      } else if (direction === 'prev' && currentJoinedPage > 1) {
        setCurrentJoinedPage(currentJoinedPage - 1);
      }
    }
  };

  return (
    <BoardsStyled>
      <Logo />
      <div className='boardButton'>
        <HomeButton />
        <PrimaryButton 
          label={'Créer un Board'}
          Icon={<IoChevronForward />}
          onClick={handleToggleCreateForm}
        />
        <PrimaryButton 
          label={'Rejoindre un Board'}
          Icon={<IoChevronForward />}
          onClick={handleToggleJoinForm}
        />
        <DisconnectButton />
      </div>
      <div className='boardForms'>
        {isCreateFormOpen && (
          <AnimatedDiv isvisible={isCreateFormOpen} className="board-form-overlay">
            <CreateBoard onClose={handleCloseCreateForm} />
          </AnimatedDiv>
        )}
        {isJoinFormOpen && (
          <AnimatedDiv isvisible={isJoinFormOpen} className="board-form-overlay">
            <JoinBoard onClose={handleCloseJoinForm} />
          </AnimatedDiv>
        )}
      </div>

      <div className='boards'>
        {/* Affichage des boards créés*/} 
        <div className='boards-section'>
          <h1 className='board-title'>Mes boards créés</h1>
          <div className='pagination-container'>
            {created_boards_meta.last_page >= 2 && (
              <PaginateBoards 
                currentPage={currentCreatedPage}
                totalPages={created_boards_meta.last_page}
                onPageChange={(page) => setCurrentCreatedPage(page)}
              />
            )}
          </div>
          <div className='board-list'>
            {loadingCreated ? (
              <h2 className='loading-board'>Chargement...</h2>
            ) : created_boards.length > 0 ? (
              created_boards.map((board) => (
                <div key={board.id} className='board-card'>
                  <h2 className='board-name'>{board.name}</h2>
                  <p className='board-description'>{board.description}</p>
                  <p className='board-capacity'>{board.users_count}/{board.capacity}</p>
                </div>
              ))
            ) : (
              <h2 className='no-boards'>Vous n'avez pas de boards créés</h2>
            )}
          </div>
        </div>

        {/* Affichage des boards rejoints */}
        <div className='boards-section'>
          <h1 className='board-title'>Boards Rejoints</h1>
          <div className='pagination-container'>
            {joined_boards_meta.last_page >= 2 && (
              <PaginateBoards
                currentPage={currentJoinedPage}
                totalPages={joined_boards_meta.last_page}
                onPageChange={(page) => setCurrentJoinedPage(page)}
              />
            )}
          </div>
          <div className='board-list'>
            {loadingJoined ? (
              <h2 className='loading-board'>Chargement...</h2>
            ) : joined_boards.length > 0 ? (
              joined_boards.map((board) => (
                <div key={board.id} className='board-card'>
                  <h2 className='board-name'>{board.name}</h2>
                  <p className='board-description'>{board.description}</p>
                  <p className='board-capacity'>{board.users_count}/{board.capacity}</p>
                </div>
              ))
            ) : (
              <h2 className='no-boards'>Vous n'avez pas de boards rejoints</h2>
            )}
          </div>
        </div>
      </div>
    </BoardsStyled>
  )
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const BoardsStyled = styled.div`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Pacifico", sans-serif;
  position: relative;
  width: calc(100vw - 40px);
    height: calc(100vh - 80px);

  .no-boards {
    color: white;
  }

  .boardButton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: center;
    z-index: 10;
  }

  .boardForms {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    background: none;
    position: relative;
    z-index: 100; 
    width: 600px;
  }

  .board-form-overlay {
    position: absolute;
    padding: 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .board-form-overlay.animated {
    animation: ${fadeIn} 0.5s ease-in-out forwards;
  }

  .board-form-overlay.animated-hide {
    animation: ${fadeOut} 0.5s ease-in-out forwards;
  }

  .boards {
    overflow-y: auto;
    padding: 40px 20px 20px;
    box-sizing: border-box;
    border: 1px solid green;
  }

  .boards::-webkit-scrollbar {
    width: 10px;
  }

  .boards::-webkit-scrollbar-track {
    background-color: #ddd; /* Définit la couleur de la piste */
    border-radius: 5px;
  }

  .boards::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4); /* Définit la couleur de la scrollbar */
    border-radius: 5px; /* Arrondit les coins de la scrollbar */
  }

  .boards-section {
    border: 1px solid red;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .board-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    overflow-y: auto;
    box-sizing: border-box;
    border: 1px solid blue;
  }

  .pagination-container {
    border: 1px solid yellow;
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  .loading-board {
    color: whitesmoke;
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
    letter-spacing: 2px;
    animation: pulse 2s infinite;
    margin-top: 70px;
}

/* Animation de pulsation */
@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

  .board-title {
    color: white;
    font-size: xxx-large;
    margin-top: 20px;
    padding: 20px;
    text-transform: uppercase;
    font-weight: bold;
    text-shadow: black 0 0 10px;
  }

  .board-card {
    width: calc(75% - 10px);
    max-width: 250px;
    height: 200px;
    margin: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    font-size: 1rem;
    position: relative;
    box-sizing: border-box;
    text-align: center;
  }

  .board-card:hover {
    box-shadow: 0 0 10px rgba(0, 125, 255, 0.8);
  }
  
  .board-name {
    border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: calc(0.8rem + 0.5vw);
    color: darkgray;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-word;
    margin-bottom: 10px;
    padding: 10px;
  }

  .board-description {
    border: 1px solid orangered;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: calc(0.6rem + 0.4vw);
    color: black;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-word;
    max-width: 100%; 
    margin-bottom: 30px;
    padding: 10px;
    flex-grow: 1;
  }

  .board-capacity {
    border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px 10px;
    margin-top: 10px;
    font-size: calc(0.7rem + 0.3vw);
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 30px;
    height: 25px;
    border-radius: 100%;
    background-color: white;
  }

   /* Responsive adjustment */
   @media (max-width: 1200px) {
    .board-list {
      grid-template-columns: repeat(4, 1fr); /* 4 cartes par ligne */
    }
  }

  @media (max-width: 900px) {
    .board-list {
      grid-template-columns: repeat(3, 1fr); /* 3 cartes par ligne */
    }
  }

  @media (max-width: 600px) {
    .board-list {
      grid-template-columns: repeat(2, 1fr); /* 2 cartes par ligne */
    }
  }

  @media (max-width: 400px) {
    .board-list {
      grid-template-columns: 1fr; /* 1 carte par ligne */
    }
  }
  
`;

const AnimatedDiv = styled.div`
  animation: ${({ isvisible }) => isvisible ? css`${fadeIn} 0.5s ease-in-out forwards` : css`${fadeOut} 0.5s ease-in-out forwards`};
  ${({ isvisible }) => !isvisible && css`
    animation: ${fadeOut} 0.5s ease-in-out forwards;
    pointer-events: none;
  `}
  transition: visibility 0.5s ease-in-out;
  visibility: ${({ isvisible }) => isvisible ? 'visible' : 'hidden'};
`;
