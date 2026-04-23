import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const dataMaGiamGia = createAsyncThunk('magiamgia/dataMaGiamGia', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/ma-giam-gia/lay-ma-giam-gia', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const themMaGiamGia = createAsyncThunk('magiamgia/themMaGiamGia', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/ma-giam-gia/them-ma-giam-gia', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const kiemTraMaGiamGia = createAsyncThunk('magiamgia/kiemTraMaGiamGia', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/ma-giam-gia/kiem-tra-ma-giam-gia', payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const capNhatMaGiamGia = createAsyncThunk('magiamgia/capNMaGiamGia', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/ma-giam-gia/cap-nhat-ma-giam-gia', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const xoaMaGiamGia = createAsyncThunk('magiamgia/xoaMMaGiamGia', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/ma-giam-gia/xoa-ma-giam-gia/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const maGiamGiaSlice = createSlice({
    name: 'magiamgia',
    initialState: {
        magiamgia: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataMaGiamGia.fulfilled, (state, action) => {
                state.magiamgia = action.payload.data;
            })
            .addCase(themMaGiamGia.fulfilled, (state, action) => {
                state.magiamgia.push(action.payload.data);
            })
            .addCase(xoaMaGiamGia.fulfilled, (state, action) => {
                state.magiamgia = state.magiamgia.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatMaGiamGia.fulfilled, (state, action) => {
                const index = state.magiamgia.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.magiamgia[index] = action.payload.data;
                }
            });
    },
});

export default maGiamGiaSlice;
