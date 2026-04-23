import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
const pageSlice = createSlice({
    name: 'page',
    initialState: {
        name: '',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
    },
});

export default pageSlice;
