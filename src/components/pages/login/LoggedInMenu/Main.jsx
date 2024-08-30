import styled from 'styled-components';
import { theme } from '../../../../theme';

import DisconnectButton from '../../../reusable-ui/DisconnectButton';
import BoardsButton from './BoardsButton';

export default function Main() {
  return (
    <LogoutContainer>
      <BoardsButton />
      <DisconnectButton />
    </LogoutContainer>
  )
}

const LogoutContainer = styled.div`
    text-align: center;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
`;