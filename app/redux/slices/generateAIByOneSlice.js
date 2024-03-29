import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const generateAIByOneSlice = createSlice({
    name: 'generateAIByOne',
    initialState: {
        value: '',
    },
    reducers: {
        getGenerateAI: (state) => {
            state.value = getCookie('generateAIByOne');
        },
        setGenerateAI: (state , action) => {
            const generateAI = action.payload;
            setCookie('generateAIByOne',generateAI,365);
            state.value = generateAI
        },
    },
});

export const { getGenerateAI, setGenerateAI } = generateAIByOneSlice.actions;
export default generateAIByOneSlice.reducer;
