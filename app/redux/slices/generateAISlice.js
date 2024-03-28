import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const generateAISlice = createSlice({
    name: 'generateAI',
    initialState: {
        value: '',
    },
    reducers: {
        getGenerateAIList: (state) => {
            state.value = getCookie('generateAIHistory');
        },
        setGenerateAIList: (state , action) => {
            const token = action.payload;
            setCookie('generateAIHistory',token,365);
            state.value = token
        },
    },
});

export const { getGenerateAIList, setGenerateAIList } = generateAISlice.actions;
export default generateAISlice.reducer;
