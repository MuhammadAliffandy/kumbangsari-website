import { persistReducer } from 'redux-persist';
import storage from './storage'; 
import authReducer from './slices/authSlice'
import generateAIReducer from './slices/generateAISlice'
import countInputProductReducer from './slices/countInputProductSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth : authReducer,
    countInputProduct : countInputProductReducer,
    generateAI : generateAIReducer, 
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export default persistedReducer;
