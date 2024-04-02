import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const generateAIContentHistorySlice = createSlice({
    name: 'generateAIContentHistory',
    initialState: {
        value: '',
    },
    reducers: {
        getContentHistory: (state) => {
            state.value = getCookie('generateContentHistory');
        },
        createContentHistory: (state , action) => {
            const contentHistory = action.payload;
            setCookie('generateContentHistory',JSON.stringify([contentHistory]),365);
            state.value = [contentHistory]
        },
        updateContentHistory: (state , action) => {
            const data = JSON.parse(getCookie('generateContentHistory'));
            const contentHistory = action.payload;
            data.push(contentHistory)
            setCookie('generateContentHistory',JSON.stringify(data),365);
            state.value = data

        },
        deleteContentHistory: (state , action) => {
            const data = JSON.parse(getCookie('generateContentHistory'));
            const contentHistory = action.payload;
            const dataFiltered = data.filter(item => {
                return item.contentTitle != contentHistory.contentTitle
            })

            setCookie('generateContentHistory',JSON.stringify(dataFiltered),365);
            state.value = dataFiltered
        },
        filterContentHistory: (state , action) => {
            const data = JSON.parse(getCookie('generateContentHistory'));
            const checkboxIndicator = action.payload;
            console.log(checkboxIndicator)
            const dataFiltered = data.filter(item => {
                if( checkboxIndicator.product.length == 0 && checkboxIndicator.platform.length == 0){
                    return item;
                }else{
                    return checkboxIndicator.product.indexOf(item.productName) > -1 || checkboxIndicator.platform.indexOf(item.platform) > -1
                }
            });




            state.value = dataFiltered
        },
        
    },
});

export const { getContentHistory , updateContentHistory , createContentHistory , deleteContentHistory ,filterContentHistory} = generateAIContentHistorySlice.actions;
export default generateAIContentHistorySlice.reducer;
