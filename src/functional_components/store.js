// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import auditionsReducer from './AuditionSlice';

export const store = configureStore({
    reducer: {
        auditions: auditionsReducer,
    },
});
