import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const generateAIHistorySlice = createSlice({
    name: 'generateAIHistory',
    initialState: {
        value: '',
    },
    reducers: {
        getGenerateHistory: (state) => {
            state.value = getCookie('generateFieldHistory');
        },
        setGenerateHistory: (state , action) => {
            const generateHistory = action.payload;
            setCookie('generateFieldHistory',generateHistory,365);
            state.value = generateHistory
        },

    },
});

export const { getGenerateHistory , setGenerateHistory } = generateAIHistorySlice.actions;
export default generateAIHistorySlice.reducer;
