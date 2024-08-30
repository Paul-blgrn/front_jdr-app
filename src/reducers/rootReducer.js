import { combineReducers } from 'redux';
import userReducer from './userReducer';
import boardReducer from './boardReducer'
import tokenReducer from './tokenReducer'

const rootReducer = combineReducers({
    user: userReducer,
    boards: boardReducer,
    token: tokenReducer,
  });
  
  export default rootReducer;