import { getCookie, setCookie } from '@/app/utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const userSubscription = createSlice({
    name: 'userSubscription',
    initialState: {
        value: '',
    },
    reducers: {
        getUserSubscription: (state) => {
            state.value = JSON.parse(getCookie('userSubscription'));
        },
        setUserSubscriptionData: (state , action) => {
            const userSubscription = JSON.stringify(action.payload);
            setCookie('userSubscription' ,userSubscription );
            state.value = userSubscription
        },
    },
});

export const { getUserSubscription, setUserSubscriptionData } = userSubscription.actions;
export default userSubscription.reducer;
