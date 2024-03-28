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
            const generateList = action.payload;
            setCookie('generateAIHistory',generateList,365);
            state.value = generateList
        },
    },
});

export const { getGenerateAI, setGenerateAI } = generateAIByOneSlice.actions;
export default generateAIByOneSlice.reducer;
