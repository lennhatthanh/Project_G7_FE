import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DangNhap from '../page/NguoiDung/DangNhap';
import api from '@/utils/http';
export const dangNhapChuSan = createAsyncThunk('chusan/dangNhap', async (payload) => {
    const res = await api.post('/auth/dang-nhap-chu-san', payload);
    return res.data;
});
export const themChuSan = createAsyncThunk('chusan/themChuSan', async (payload) => {
    const res = await api.post('/chu-san/them-moi-chu-san', payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_admin')}`,
        },
    });
    return res.data;
});
export const xoaChuSan = createAsyncThunk('chusan/xoaChuSan', async (payload) => {
    const res = await api.delete(`/chu-san/xoa-chu-san/${payload}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_admin')}`,
        },
    });
    return res.data;
});
export const capNhatChuSan = createAsyncThunk('chusan/capNhatChuSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/chu-san/cap-nhat-chu-san', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_admin')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataChuSan = createAsyncThunk('chusan/dataChuSan', async () => {
    const res = await api.get('/chu-san/get-all', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token_admin')}`,
        },
    });
    return res.data;
});

export const kiemTraChuSan = createAsyncThunk('admin/kiemTraChuSan', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/chu-san/kiem-tra-chu-san', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const dangXuatChuSan = createAsyncThunk('admin/dangXuatChuSan', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/auth/dang-xuat', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataDatSan = createAsyncThunk('nhanvien/dataDatSan', async () => {
    try {
        const res = await api.get('/dat-san/lich-su-dat-san-chu-san', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const chuSanSlice = createSlice({
    name: 'chusan',
    initialState: {
        chu_san: [],
        dangNhap: {},
        datsan: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dangNhapChuSan.fulfilled, (state, action) => {
                state.dangNhap = action.payload;
                localStorage.setItem('token_chusan', state.dangNhap.accessToken);
            })
            .addCase(dataChuSan.fulfilled, (state, action) => {
                state.chu_san = action.payload.data;
            })
            .addCase(dataDatSan.fulfilled, (state, action) => {
                state.datsan = action.payload.data;
            })
            .addCase(themChuSan.fulfilled, (state, action) => {
                state.chu_san.push(action.payload.data);
            })
            .addCase(xoaChuSan.fulfilled, (state, action) => {
                state.chu_san = state.chu_san.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatChuSan.fulfilled, (state, action) => {
                const index = state.chu_san.findIndex((item) => item.id === action.payload.data.id);

                if (index !== -1) {
                    state.chu_san[index] = action.payload.data;
                }
            });
    },
});

export default chuSanSlice;
