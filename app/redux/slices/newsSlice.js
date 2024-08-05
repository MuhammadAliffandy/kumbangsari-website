import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        value: '',
    },
    reducers: {
        getNewsData: (state) => {
            state.value = getCookie('news');
        },
        setNewsData: (state , action) => {
            const newsData = action.payload;
            setCookie('news',newsData,365);
            state.value = newsData
        },

    },
});

export const { getNewsData , setNewsData } = newsSlice.actions;
export default newsSlice.reducer;
