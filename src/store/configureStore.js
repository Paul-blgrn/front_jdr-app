import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import duplicateRequestMiddleware from '../services/duplicateRequestMiddleware';
  

// Configuration de Redux Persist
const persistConfig = {
    key: 'root',
    storage, // Utiliser le stockage local
    whitelist: ['user', 'boards', 'token'], // Liste des réducteurs que vous souhaitez persister
};

// Créer un reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = store => next => action => {
    console.log('Dispatching action:', action);
    return next(action);
};

const store = createStore(
    persistedReducer, 
    applyMiddleware(thunk, duplicateRequestMiddleware, loggerMiddleware)
);

// Créer le persistor pour persister le store
const persistor = persistStore(store);

export { store, persistor };