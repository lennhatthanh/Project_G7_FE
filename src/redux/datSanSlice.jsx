import api from '@/utils/http';
import { getErrorMessage } from '@/utils/errorMessage';
import { dangNhapAdmin } from './adminSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const ThanhToan = createAsyncThunk('admin/datSanThanhToan', async (payload, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token_nguoidung');
        const res = await api.post('/dat-san/thanh-toan', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.checkoutUrl;
    } catch (error) {
        console.error('Lỗi khi gọi API thanh toán:', error);
        return rejectWithValue(getErrorMessage(error));
    }
});
const datSanSlice = createSlice({
    name: 'datsan',
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(dangNhapAdmin.fulfilled, (state, action) => {
            state.dangNhap = action.payload;
            localStorage.setItem('token_admin', state.dangNhap.accessToken);
        });
    },
});

export default datSanSlice;
