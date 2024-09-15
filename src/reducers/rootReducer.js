import { combineReducers } from 'redux';
import userReducer from './userReducer';
import boardReducer from './boardReducer'
import tokenReducer from './tokenReducer'
import boardDetails from './boardDetailsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    boards: boardReducer,
    board_details: boardDetails,
    token: tokenReducer,
  });
  
  export default rootReducer;