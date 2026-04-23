import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const dataThongBao = createAsyncThunk('thongbao/dataThongBao', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/thong-bao/lay-thong-bao', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const themThongBao = createAsyncThunk('thongbao/themThongBao', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/thong-bao/them-thong-bao', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const guiThongBao = createAsyncThunk('thongbao/guiThongBao', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/thong-bao/gui-thong-bao', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const capNhatThongBao = createAsyncThunk('thongbao/capNhatThongBao', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/thong-bao/cap-nhat-thong-bao', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const xoaThongBao = createAsyncThunk('thongbao/xoaThongBao', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/thong-bao/delete-thong-bao/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const thongBaoSlice = createSlice({
    name: 'thongbao',
    initialState: {
        thongbao: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataThongBao.fulfilled, (state, action) => {
                state.thongbao = action.payload.data;
            })
            .addCase(themThongBao.fulfilled, (state, action) => {
                state.thongbao.push(action.payload.data);
            })
            .addCase(xoaThongBao.fulfilled, (state, action) => {
                state.thongbao = state.thongbao.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatThongBao.fulfilled, (state, action) => {
                const index = state.thongbao.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.thongbao[index] = action.payload.data;
                }
            });
    },
});

export default thongBaoSlice;
