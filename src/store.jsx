import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './redux/pageSlice';
import chuSanSlice from './redux/chuSanSlice';
import adminSlice from './redux/adminSlice';
import nguoiDungSlice from './redux/nguoiDungSlice';
import sanSlice from './redux/sanSlice';
import monChoiSlice from './redux/monChoiSlice';
import maGiamGiaSlice from './redux/maGiamGiaSlice';
import dichVuSlice from './redux/dichVuSlice';
import thongBaoSlice from './redux/thongBaoSlice';
import viTriSanSlice from './redux/viTriSanSlice';
import mapSlice from './redux/mapSlice';
import nhanVienSlice from './redux/nhanVienSlice';
import danhGiaSlice from './redux/danhGiaSlice';
import suKienSlice from './redux/suKienSlice';
import thongKeSlice from './redux/thongKeSlice';

const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        chuSan: chuSanSlice.reducer,
        admin: adminSlice.reducer,
        nguoidung: nguoiDungSlice.reducer,
        san: sanSlice.reducer,
        monchoi: monChoiSlice.reducer,
        magiamgia: maGiamGiaSlice.reducer,
        dichvu: dichVuSlice.reducer,
        thongbao: thongBaoSlice.reducer,
        vitrisan: viTriSanSlice.reducer,
        map: mapSlice.reducer,
        nhanvien : nhanVienSlice.reducer,
        danhgia : danhGiaSlice.reducer,
        sukien : suKienSlice.reducer,
        thongke: thongKeSlice.reducer
    },
});

export default store;
