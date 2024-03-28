import { persistReducer } from 'redux-persist';
import storage from './storage'; 
import authReducer from './slices/authSlice'
import generateAIByOneReducer from './slices/generateAIByOneSlice'
import generateAIReducer from './slices/generateAISlice'
import generateAIHistoryReducer from './slices/generateAIHistorySlice'
import generateAIContentHistoryReducer from './slices/generateAIContentHistorySlice'
import countInputProductReducer from './slices/countInputProductSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth : authReducer,
    countInputProduct : countInputProductReducer,
    generateAIByOne : generateAIByOneReducer, 
    generateAI : generateAIReducer, 
    generateAIHistory : generateAIHistoryReducer,
    generateAIContentHistory : generateAIContentHistoryReducer,
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export default persistedReducer;
