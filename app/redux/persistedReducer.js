import { persistReducer } from 'redux-persist';
import storage from './storage'; 
import carReducer from './slices/carSlice'
import authReducer from './slices/authSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    car : carReducer,
    auth : authReducer
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export default persistedReducer;
