import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const dataDichVu = createAsyncThunk('dichvu/dataDichVu', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/dich-vu/lay-tat-ca', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const dataDichVuOpen = createAsyncThunk('dichvu/dataDichVuOpen', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/dich-vu/lay-tat-ca-open');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataDichVuOpenId = createAsyncThunk('dichvu/dataDichVuOpenId', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.get(`/dich-vu/lay-tat-ca-by-id/${payload}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const themDichVu = createAsyncThunk('dichvu/themDichVu', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/dich-vu/them-dich-vu', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const capNhatDichVu = createAsyncThunk('dichvu/capNhatDichVu', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/dich-vu/cap-nhat-dich-vu', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const xoaDichVu = createAsyncThunk('dichvu/xoaDichVu', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/dich-vu/xoa-dich-vu/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const DichVuS = createSlice({
    name: 'dichvu',
    initialState: {
        dichvu: [],
        dichvuopen: [],
        dichvuopenbyid: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataDichVu.fulfilled, (state, action) => {
                state.dichvu = action.payload.data;
            })
            .addCase(dataDichVuOpenId.fulfilled, (state, action) => {
                state.dichvuopenbyid = action.payload.data;
            })
            .addCase(dataDichVuOpen.fulfilled, (state, action) => {
                state.dichvuopen = action.payload.data;
            })
            .addCase(themDichVu.fulfilled, (state, action) => {
                state.dichvu.push(action.payload.data);
            })
            .addCase(xoaDichVu.fulfilled, (state, action) => {
                state.dichvu = state.dichvu.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatDichVu.fulfilled, (state, action) => {
                const index = state.dichvu.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.dichvu[index] = action.payload.data;
                }
            });
    },
});

export default DichVuS;
