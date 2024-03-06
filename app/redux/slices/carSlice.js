import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
    name: 'car',
    initialState: {
        value: '',
    },
    reducers: {
        getCarsId: (state) => {
            state.value = localStorage.getItem('carsId');
        },
        setCarsId: (state , action) => {
            const carId = action.payload;
            localStorage.setItem('carsId', carId);
            state.value = carId
        },
    },
});

export const { getCarsId, setCarsId } = carSlice.actions;
export default carSlice.reducer;
