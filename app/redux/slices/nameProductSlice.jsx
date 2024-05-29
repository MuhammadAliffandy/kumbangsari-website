import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const nameProduct = createSlice({
    name: 'nameProduct',
    initialState: {
        value: '',
    },
    reducers: {
        getNameProduct: (state) => {
            state.value = JSON.parse(getCookie('nameProduct'));
        },
        setNameProduct: (state , action) => {
            const nameProduct = JSON.stringify(action.payload);
            setCookie('nameProduct' ,nameProduct );
            state.value = nameProduct
        },
    },
});

export const { getNameProduct, setNameProduct } = nameProduct.actions;
export default nameProduct.reducer;
