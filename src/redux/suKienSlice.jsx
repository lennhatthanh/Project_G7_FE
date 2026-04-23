import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const dataSuKien = createAsyncThunk('sukien/dataSuKien', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/su-kien/lay-tat-ca', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataSuKienOpen = createAsyncThunk('sukien/dataSuKienOpen', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/su-kien/lay-tat-ca-open', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const themSuKien = createAsyncThunk('sukien/themSuKien', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/su-kien/them-su-kien', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const thamGiaSuKien = createAsyncThunk('sukien/thamGiaSuKien', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/su-kien/tham-gia-su-kien', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const capNhatSuKien = createAsyncThunk('sukien/capNhatSuKien', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/su-kien/cap-nhat-su-kien', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const xoaSuKien = createAsyncThunk('sukien/xoaSuKien', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/su-kien/xoa-su-kien/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const suKienSlice = createSlice({
    name: 'sukien',
    initialState: {
        sukien: [],
        checksukien: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataSuKien.fulfilled, (state, action) => {
                state.sukien = action.payload.data;
            })
            .addCase(dataSuKienOpen.fulfilled, (state, action) => {
                state.sukien = action.payload.data;
                state.checksukien = action.payload.sukien;
            })
            .addCase(themSuKien.fulfilled, (state, action) => {
                state.sukien.push(action.payload.data);
            })
            .addCase(thamGiaSuKien.fulfilled, (state, action) => {
                state.checksukien.push({ id_su_kien: action.meta.arg.id_su_kien });
            })
            .addCase(xoaSuKien.fulfilled, (state, action) => {
                state.sukien = state.sukien.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatSuKien.fulfilled, (state, action) => {
                const index = state.sukien.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.sukien[index] = action.payload.data;
                }
            });
    },
});

export default suKienSlice;
