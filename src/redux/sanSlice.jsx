import api from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const dataSan = createAsyncThunk('san/dataSan', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/san/lay-tat-ca', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataSanChuSanOpen = createAsyncThunk('san/dataSanChuSanOpen', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/san/lay-tat-ca-chu-san-open', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const dataSanOpen = createAsyncThunk('san/dataSanOpen', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/san/lay-tat-ca-open');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const dataChiTietSan = createAsyncThunk('san/dataChiTietSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.get(`/san/lay-san-theo-id/${payload}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const themSan = createAsyncThunk('san/themSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('/san/them-san', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const capNhatSan = createAsyncThunk('san/capNhatSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.put('/san/cap-nhat-san', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const xoaSan = createAsyncThunk('san/xoaSan', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/san/xoa-san/${payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_chusan')}`,
            },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const sanSlice = createSlice({
    name: 'san',
    initialState: {
        san: [],
        san_open: [],
        san_chi_tiet: [],
        san_dat_san: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataSan.fulfilled, (state, action) => {
                state.san = action.payload.data;
            })
            .addCase(dataSanChuSanOpen.fulfilled, (state, action) => {
                state.san = action.payload.data;
            })
            .addCase(dataSanOpen.fulfilled, (state, action) => {
                state.san_open = action.payload.data;
            })
            .addCase(dataChiTietSan.fulfilled, (state, action) => {
                state.san_chi_tiet = action.payload.data;
                state.san_dat_san = action.payload.datavitrisan;
            })
            .addCase(themSan.fulfilled, (state, action) => {
                state.san.push(action.payload.data);
            })
            .addCase(xoaSan.fulfilled, (state, action) => {
                state.san = state.san.filter((item) => item.id !== action.meta.arg);
            })
            .addCase(capNhatSan.fulfilled, (state, action) => {
                const index = state.san.findIndex((item) => item.id === action.payload.data.id);

                if (index !== -1) {
                    state.san[index] = action.payload.data;
                }
            });
    },
});

export default sanSlice;
