import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const dataViTriSan = createAsyncThunk('vitrisan/dataViTriSan', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/vi-tri-san/lay-vi-tri-san-chu-san', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const themViTriSan = createAsyncThunk('vitrisan/themViTriSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/vi-tri-san/them-vi-tri-san', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const capNhatViTriSan = createAsyncThunk('vitrisan/capNhatViTriSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/vi-tri-san/cap-nhat-vi-tri-san', payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const xoaViTriSan = createAsyncThunk('vitrisan/xoaViTriSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/vi-tri-san/xoa-vi-tri-san/${payload}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataViTriSanNhanVien = createAsyncThunk('vitrisan/dataViTriSanNhanVien', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get(`/vi-tri-san/lay-vi-tri-san-nhan-vien`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nhanvien')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const viTriSanSlice = createSlice({
    name: 'vitrisan',
    initialState: {
        vitrisan: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataViTriSan.fulfilled, (state, action) => {
                state.vitrisan = action.payload.data;
            })
            .addCase(dataViTriSanNhanVien.fulfilled, (state, action) => {
                state.vitrisan = action.payload.data;
            })
            .addCase(themViTriSan.fulfilled, (state, action) => {
                state.vitrisan.push({ ...action.payload.data, ten_san: action.meta.arg.ten_san });
            })
            .addCase(xoaViTriSan.fulfilled, (state, action) => {
                state.vitrisan = state.vitrisan.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatViTriSan.fulfilled, (state, action) => {
                const index = state.vitrisan.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.vitrisan[index] = action.payload.data;
                }
            });
    },
});

export default viTriSanSlice;
