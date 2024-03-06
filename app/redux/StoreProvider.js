"use client"

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from './store';

const StoreProvider = ({ children }) => {
    return (
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

export default StoreProvider;