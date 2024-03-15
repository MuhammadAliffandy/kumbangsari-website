import { createSlice } from '@reduxjs/toolkit';

const pageProductSlice = createSlice({
    name: 'pageProduct',
    initialState: {
        value: '',
    },
    reducers: {
        getPageProduct: (state) => {
            return state.value;
        },
        setPageProduct: (state , action) => {
            const count = action.payload;
            state.value = count;
        },
    },
});

export const { getPageProduct, setPageProduct } = pageProductSlice.actions;
export default pageProductSlice.reducer;
