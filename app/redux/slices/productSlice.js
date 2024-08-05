import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        value: '',
    },
    reducers: {
        getProductData: (state) => {
            state.value = getCookie('product');
        },
        setProductData: (state , action) => {
            const productData = action.payload;
            setCookie('product',productData,365);
            state.value = productData
        },

    },
});

export const { getProductData , setProductData } = productSlice.actions;
export default productSlice.reducer;
