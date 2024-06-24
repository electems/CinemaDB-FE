// src/auditionsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching data from the API
export const fetchAuditions = createAsyncThunk(
    'auditions/fetchAuditions',
    async () => {
        const response = await axios.get('http://localhost:3001/auditioncall/audtions');
        return response.data;
    }
);

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

const auditionsSlice = createSlice({
    name: 'auditions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuditions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuditions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAuditions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default auditionsSlice.reducer;
