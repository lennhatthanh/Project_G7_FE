import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const getDataSan = createAsyncThunk('map/getData', async () => {
    const res = await axios(
        ''
    );
    return res.data;
});
export const dataSanOpen = createAsyncThunk('san/dataSanOpen', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/san/lay-tat-ca-open');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const initState = {
    dataSan: [],
    loading: true,
};
const mapSlice = createSlice({
    name: 'map',
    initialState: initState,
    extraReducers: (builder) => {
        builder.addCase(dataSanOpen.fulfilled, (state, action) => {
            state.dataSan = action.payload.data;
            state.loading = false;
        });
    },
});

export default mapSlice;
