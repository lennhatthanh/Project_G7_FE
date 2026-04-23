
import KiemTraNhanVien from '@/kiemtra/KiemTraNhanVien';
import LayoutBlank from '@/layout/wrapper/layout_blank';
import LayoutNhanVien from '@/layout/wrapper/layout_nhanvien';
import DangNhap from '@/page/NhanVien/DangNhap';
import QuanLyDatSan from '@/page/NhanVien/QuanLyDatSan';


const layoutNhanVien = [
    { path: '/nhan-vien/dang-nhap', component: DangNhap, layout: LayoutBlank },
    { path: '/nhan-vien/quan-ly-dat-san', component: QuanLyDatSan, layout: LayoutNhanVien, kiemtra: KiemTraNhanVien },
];

export default layoutNhanVien;
