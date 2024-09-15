import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import duplicateRequestMiddleware from '../services/duplicateRequestMiddleware';
  

// Configuring Redux Persist
const persistConfig = {
    key: 'root',
    // Storage you want to use : [storage, sessionStorage or customStorage]
    storage,
    // List of reducers you want to persist
    whitelist: ['user', 'boards', 'board_details', 'token'],
};

// Create a persistent reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = store => next => action => {
    console.log('Dispatching action:', action);
    return next(action);
};

// Create the store
const store = createStore(
    persistedReducer, 
    applyMiddleware(thunk, duplicateRequestMiddleware, loggerMiddleware)
);

// Create the persistor to persist the store
const persistor = persistStore(store);

export { store, persistor };