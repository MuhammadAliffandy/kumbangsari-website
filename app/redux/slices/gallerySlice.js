import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        value: '',
    },
    reducers: {
        getGalleryData : (state) => {
            state.value = getCookie('gallery');
        },
        setGalleryData: (state , action) => {
            const galleryData = action.payload;
            setCookie('gallery',galleryData,365);
            state.value = galleryData
        },

    },
});

export const { getGalleryData , setGalleryData } = gallerySlice.actions;
export default gallerySlice.reducer;
