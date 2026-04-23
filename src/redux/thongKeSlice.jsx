import api from '@/utils/http';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const layThongKeSuKien = createAsyncThunk('thongke/sukien', async () => {
    const res = await api.get('/thong-ke/su-kien', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
        },
    });
    return res.data;
});

export const layThongKeDatSan = createAsyncThunk('thongke/datsan', async () => {
    const res = await api.get('/thong-ke/dat-san', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
        },
    });
    return res.data;
});

export const layThongKeDoanhThu = createAsyncThunk('thongke/doanhthu', async () => {
    const res = await api.get('/thong-ke/doanh-thu', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
        },
    });
    return res.data;
});

const thongKeSlice = createSlice({
    name: 'thongke',
    initialState: {
        suKien: [],
        datSan: [],
        doanhThu: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(layThongKeSuKien.fulfilled, (state, action) => {
                state.suKien = action.payload;
            })
            .addCase(layThongKeDatSan.fulfilled, (state, action) => {
                state.datSan = action.payload;
            })
            .addCase(layThongKeDoanhThu.fulfilled, (state, action) => {
                state.doanhThu = action.payload;
            });
    },
});

export default thongKeSlice;
