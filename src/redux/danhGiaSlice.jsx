import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const themDanhGia = createAsyncThunk('danh-gia/themDanhGia', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/danh-gia/them-moi-danh-gia', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataDanhGia = createAsyncThunk('danh-gia/dataDanhGia', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/danh-gia/lay-du-lieu');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const danhGiaSlice = createSlice({
    name: 'danhgia',
    initialState: {
        danhgia: [],
    },
    extraReducers: (builder) => {
        builder.addCase(dataDanhGia.fulfilled, (state, action) => {
            state.danhgia = action.payload.data;
        });
    },
});

export default danhGiaSlice;
