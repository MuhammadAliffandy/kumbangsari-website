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
            const generateList = action.payload;
            setCookie('generateAIHistory',JSON.stringify(generateList),365);
            state.value = generateList
        },
        updateGenerateAIList: (state , action) => {
            const generateList = JSON.parse(getCookie('generateAIHistory'));
            const generate = action.payload;
            generateList.push(...generate)
            setCookie('generateAIHistory',JSON.stringify(generateList),365);
            state.value = generateList
        },
    },
});

export const { getGenerateAIList, setGenerateAIList , updateGenerateAIList} = generateAISlice.actions;
export default generateAISlice.reducer;
