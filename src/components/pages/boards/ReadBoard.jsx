import { useContext, useEffect, useState, useCallback } from 'react';
import UserContext from '../../../context/UserContext';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import styled, { keyframes, css } from "styled-components";
import { theme } from "../../../theme";

import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlineSubtitles } from "react-icons/md";

import Logo from "../../reusable-ui/Logo";
import CreateBoard from './CreateBoard';
import JoinBoard from './JoinBoard';
import MainMenu from '../nav/MainMenu'
import IconButton from '../../reusable-ui/IconButton'

import { /*getBoards,*/ getCreatedBoards, getJoinedBoards } from '../../../actions/boardActions';
import PaginateBoards from './PaginateBoards';

import IconSwitcher from '../../reusable-ui/IconSwitcher';

// import { DEBUG } from "../../../config/debug";

export default function ReadBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector(state => state.user);
  const { 
    created_boards, 
    created_boards_meta, 
    joined_boards, 
    joined_boards_meta, 
    /*loading,*/
    loadingCreated,
    loadingJoined,
    /*error */
  }  = useSelector((state) => state.boards);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false);
  const [currentCreatedPage, setCurrentCreatedPage] = useState(1);
  const [currentJoinedPage, setCurrentJoinedPage] = useState(1);

  const { 
    /*isCreatingBoard, */
    setIsCreatingBoard, 
    /*isJoiningBoard, */
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

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  const handleDeleteBoard = (boardID) => {
    alert("vous avez tenté de supprimer le board ID " + boardID);
  };

  const handleLeaveBoard = (boardID) => {
    alert("vous avez tenté de quitter le board ID " + boardID);
  };

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
      <MainMenu />
      {/* Create and Join Board Buttons */}
      <BoardButtonStyled>
        <IconButton 
          Icon={<IoAddCircleSharp className='boardMenuIconCreate' />}
          Label={'Créer un Board'}
          onClick={handleToggleCreateForm}
        />
        <IconButton 
          Icon={<IoAddCircleSharp className='boardMenuIconJoin' />}
          Label={'Rejoindre un Board'}
          onClick={handleToggleJoinForm}
        />
      </BoardButtonStyled>
      {/* Board creation and Join forms */}
      <div className='boardForms'>
        {isCreateFormOpen && (
          <AnimatedDiv isvisible={isCreateFormOpen.toString()} className="board-form-overlay">
            <CreateBoard onClose={handleCloseCreateForm} />
          </AnimatedDiv>
        )}
        {isJoinFormOpen && (
          <AnimatedDiv isvisible={isJoinFormOpen.toString()} className="board-form-overlay">
            <JoinBoard onClose={handleCloseJoinForm} />
          </AnimatedDiv>
        )}
      </div>

      <div className='boards'>
        {/* Display Created boards */} 
        <div className='boards-section'>
          <h1 className='board-title'>Mes boards créés</h1>
          {/* Board Pagination */}
          <div className='pagination-container'>
            {created_boards_meta.last_page >= 2 && (
              <PaginateBoards 
                currentPage={currentCreatedPage}
                totalPages={created_boards_meta.last_page}
                onPageChange={(page) => setCurrentCreatedPage(page)}
              />
            )}
          </div>
          {/* Created Boards Card */}
          <div className='board-list'>
            {loadingCreated ? (
              <h2 className='loading-board'>Chargement...</h2>
            ) : created_boards.length > 0 ? (
              created_boards.map((board) => (
                <div 
                  key={board.id} 
                  className='board-card' 
                  onClick={(event) => { 
                    event.stopPropagation(); 
                    handleBoardClick(board.id);
                  }}
                  >
                  <div className='board-delete'>
                    <IconSwitcher 
                      defaultLibrary="ri"
                      defaultIcon={"RiDeleteBin2Fill"}
                      hoverLibrary="ri"
                      hoverIcon={"RiDeleteBin2Line"}
                      size={35}
                      defaultColor="darkred"
                      hoverColor="red"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteBoard(board.id);
                      }}
                    />
                  </div>
                  <div className='board-name'>
                    <MdOutlineSubtitles className='boardIcon'/>
                    <h2>{board.name}</h2>
                    
                  </div>
                  <div className='board-description'>
                    <MdOutlineSubtitles className='boardIcon'/>
                    <p>{board.description}</p>
                  </div>
                  <div className='board-capacity'>
                    <p>{board.users_count}/{board.capacity}</p>
                  </div>
                </div>
              ))
            ) : (
              <h2 className='no-boards'>Vous n'avez pas de boards créés</h2>
            )}
          </div>
        </div>

        {/* Display Joined boards */}
        <div className='boards-section'>
          <h1 className='board-title'>Boards Rejoints</h1>
          {/* Board Pagination */}
          <div className='pagination-container'>
            {joined_boards_meta.last_page >= 2 && (
              <PaginateBoards
                currentPage={currentJoinedPage}
                totalPages={joined_boards_meta.last_page}
                onPageChange={(page) => setCurrentJoinedPage(page)}
              />
            )}
          </div>

          {/* Joined Boards Card */}
          <div className='board-list'>
            {loadingJoined ? (
              <h2 className='loading-board'>Chargement...</h2>
            ) : joined_boards.length > 0 ? (
              joined_boards.map((board) => (
                <div 
                  key={board.id} 
                  className='board-card' 
                  onClick={(event) => { 
                    event.stopPropagation(); 
                    handleBoardClick(board.id);
                  }}
                >
                  <div className='board-leave'>
                    <IconSwitcher
                      library="fa"
                      defaultIcon="FaDoorClosed"
                      hoverIcon="FaDoorOpen"
                      size={35}
                      defaultColor="darkred"
                      hoverColor="red"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLeaveBoard(board.id);
                      }}
                    />
                  </div>
                  <div className='board-name'>
                    <MdOutlineSubtitles className='boardIcon'/>
                    <h2>{board.name}</h2>
                  </div>
                  <div className='board-description'>
                    <MdOutlineSubtitles className='boardIcon'/>
                    <p>{board.description}</p>
                  </div>
                  <div className='board-capacity'>
                    <p>{board.users_count}/{board.capacity}</p>
                  </div>
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

const BoardButtonStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  z-index: 10;
  color: white;

  &:hover:not(:disabled) {
    color: red;
  }

  .boardMenuIconCreate {
    color: #5ade50;
  }

  .boardMenuIconJoin {
    color : #f2de74;
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

  .no-boards {
    color: white;
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
    /* border: 1px solid green; */
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
    /* border: 1px solid red; */
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .board-list {
    /* border: 1px solid blue; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .pagination-container {
    /* border: 1px solid yellow; */
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
    font-family: 'OpenSans' sans-serif;
  }

  .board-card {
    width: calc(100vw - 10px);
    max-width: 275px;
    height: 275px;
    margin: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    position: relative;
    box-sizing: border-box;
    text-align: center;
  }

  .board-card:hover {
    box-shadow: 0 0 10px rgba(0, 125, 255, 0.8);
  }

  .board-delete {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
  }

  .board-leave {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
  }
  
  /* Board Title */
  .board-name {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    margin-top: 1px;
  }

  .board-name::before {
    content: 'Nom';
    position: absolute;
    margin-left: 20px;
  }

  .board-name h2 {
    border: 1px solid ${theme.colors.greyMedium};
    border-radius: 5px;
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
    max-width: 100vw;
    height: 50px;
    padding: 10px;
    margin-top: 5px;
  }

  /* Board Description */
  .board-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  }

  .board-description::before {
    content: 'Description';
    position: absolute;
    margin-left: 20px;
  }

  .board-description p {
    border: 1px solid ${theme.colors.greyMedium};
    border-radius: 5px;
    color: black;
    /* font-size: calc(0.6rem + 0.4vw); */
    font-size: 1em;
    text-overflow: ellipsis;
    text-align: center;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-word;
    flex-grow: 1; 
    max-width: 100vw;
    height: 50px;
    padding: 10px;
    margin-top: 5px;
  }

  /* Board Capacity */
  .board-capacity {
    border: 1px dashed ${theme.colors.greyMedium};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px 10px;
    margin-top: 10px;
    /* font-size: calc(0.7rem + 0.3vw); */
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 35px;
    height: 25px;
    border-radius: 100%;
    background-color: white;
  }

  .boardIcon {
    font-size: 1em;
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
