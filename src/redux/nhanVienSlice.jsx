import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import DangNhap from '../page/NguoiDung/DangNhap';
import api from '@/utils/http';
export const dangNhapNhanVien = createAsyncThunk('nhanvien/dangNhap', async (payload) => {
    const res = await api.post('/auth/dang-nhap-nhan-vien', payload);
    return res.data;
});
export const themNhanVien = createAsyncThunk('nhanvien/themNhanVien', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/nhan-vien/them-moi-nhan-vien', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const xoaNhanVien = createAsyncThunk('nhanvien/xoaNhanVien', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/nhan-vien/xoa-nhan-vien/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const capNhatNhanVien = createAsyncThunk('nhanvien/capNhatNhanVien', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/nhan-vien/cap-nhat-nhan-vien', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataNhanVien = createAsyncThunk('nhanvien/dataNhanVien', async () => {
    const res = await api.get('/nhan-vien/get-all-chu-san', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
        },
    });
    return res.data;
});
export const dataDatSan = createAsyncThunk('nhanvien/dataDatSan', async () => {
    try {
        const res = await api.get('/dat-san/lich-su-dat-san-nhan-vien', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nhanvien')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const kiemTraNhanVien = createAsyncThunk('admin/kiemTraNhanVien', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/nguoi-dung/kiem-tra-nguoi-dung', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nhanvien')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const nhanVienSlice = createSlice({
    name: 'nhanvien',
    initialState: {
        nhan_vien: [],
        dangNhap: {},
        datsan: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dangNhapNhanVien.fulfilled, (state, action) => {
                state.dangNhap = action.payload;
                localStorage.setItem('token_nhanvien', state.dangNhap.accessToken);
            })
            .addCase(dataNhanVien.fulfilled, (state, action) => {
                state.nhan_vien = action.payload.data;
            })
            .addCase(dataDatSan.fulfilled, (state, action) => {
                state.datsan = action.payload.data;
            })
            .addCase(themNhanVien.fulfilled, (state, action) => {
                state.nhan_vien.push(action.payload.data);
            })
            .addCase(xoaNhanVien.fulfilled, (state, action) => {
                state.nhan_vien = state.nhan_vien.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatNhanVien.fulfilled, (state, action) => {
                const index = state.nhan_vien.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.nhan_vien[index] = action.payload.data;
                }
            });
    },
});

export default nhanVienSlice;
