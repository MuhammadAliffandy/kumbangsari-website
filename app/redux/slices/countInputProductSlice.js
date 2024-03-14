import { createSlice } from '@reduxjs/toolkit';

const countInputProductSlice = createSlice({
    name: 'countInputProduct',
    initialState: {
        value: '',
    },
    reducers: {
        getCountInputProduct: (state) => {
            return state.value;
        },
        setCountInputProduct: (state , action) => {
            const count = action.payload;
            state.value = count;
        },
    },
});

export const { getCountInputProduct, setCountInputProduct } = countInputProductSlice.actions;
export default countInputProductSlice.reducer;
