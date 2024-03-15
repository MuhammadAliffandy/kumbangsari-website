import { persistReducer } from 'redux-persist';
import storage from './storage'; 
import authReducer from './slices/authSlice'
import countInputProductReducer from './slices/countInputProductSlice'
import pageProductReducer from './slices/pageProductSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth : authReducer,
    countInputProduct : countInputProductReducer,
    pageProduct : pageProductReducer,
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export default persistedReducer;
