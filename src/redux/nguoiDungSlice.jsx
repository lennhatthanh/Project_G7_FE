import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const dangKyNguoiDung = createAsyncThunk('nguoidung/dangKy', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/auth/dang-ky', payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dangNhapNguoiDung = createAsyncThunk('nguoidung/dangNhap', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/auth/dang-nhap', payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const capNhatNguoiDung = createAsyncThunk('nguoidung/capNhatNguoiDung', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/nguoi-dung/cap-nhat-nguoi-dung-open', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const LichSuDatSan = createAsyncThunk('nguoidung/LichSuDatSan', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/dat-san/lich-su-dat-san', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const doiPassNguoiDung = createAsyncThunk('nguoidung/doiPassNguoiDung', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/nguoi-dung/doi-mat-khau-nguoi-dung', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const dangXuatNguoiDung = createAsyncThunk('nguoidung/dangXuatNguoiDung', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.get('/auth/dang-xuat', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const kiemTraNguoiDung = createAsyncThunk('admin/kiemTraNguoiDung', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/nguoi-dung/kiem-tra-nguoi-dung', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataNguoiDung = createAsyncThunk('admin/dataNguoiDung', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/nguoi-dung/get-nguoi-dung', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_nguoidung')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const nguoiDungSlice = createSlice({
    name: 'nguoidung',
    initialState: {
        chu_san: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dangNhapNguoiDung.fulfilled, (state, action) => {
                state.dangNhap = action.payload;
                localStorage.setItem('token_nguoidung', state.dangNhap.accessToken);
            })
            .addCase(kiemTraNguoiDung.fulfilled, (state, action) => {});
    },
});

export default nguoiDungSlice;
