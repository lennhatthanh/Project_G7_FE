import React from 'react';
import QuanLyChuSan from '../page/Admin/QuanLyChuSan';
import LayoutAdmin from '../layout/wrapper/layout_admin';
import DangNhap from '@/page/Admin/DangNhap';
import LayoutBlank from '@/layout/wrapper/layout_blank';
import QuanLyMonChoi from '@/page/Admin/QuanLyMonChoi';
import KiemTraAdmin from '@/kiemtra/KiemTraAdmin';

const layoutAdmin = [
    { path: '/admin/dang-nhap', component: DangNhap, layout: LayoutBlank },
    { path: '/admin/quan-ly-chu-san', component: QuanLyChuSan, layout: LayoutAdmin, kiemtra: KiemTraAdmin  },
    { path: '/admin/quan-ly-mon-choi', component: QuanLyMonChoi, layout: LayoutAdmin, kiemtra: KiemTraAdmin  },
];

export default layoutAdmin;
