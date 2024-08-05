import { persistReducer } from 'redux-persist';
import storage from './storage'; 
import newsReducer from './slices/newsSlice'
import productReducer from './slices/productSlice'
import galleryReducer from './slices/gallerySlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    gallery : galleryReducer,
    product : productReducer,
    news : newsReducer
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export default persistedReducer;
