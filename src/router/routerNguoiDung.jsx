import DangKy from '@/page/NguoiDung/DangKy';
import DangNhap from '../page/NguoiDung/DangNhap';
import LayoutBlank from '../layout/wrapper/layout_blank';
import TrangChu from '../page/TrangChu';
import layout from '../layout/wrapper/layout';
import MapBox from '@/page/MapBox';
import DanhSachSan from '@/page/DanhSachSan';
import DatSan from '@/page/DatSan';
import KiemTraNguoiDung from '@/kiemtra/KiemTraNguoiDung';
import LayoutNguoiDung from '@/layout/wrapper/layout_nguoidung';
import Profile from '@/page/NguoiDung/Profile';
import SuKien from '@/page/NguoiDung/SuKien';

const layoutNguoiDung = [
    { path: '/nguoi-dung/dang-ky', component: DangKy, layout: LayoutBlank },
    { path: '/nguoi-dung/dang-nhap', component: DangNhap, layout: LayoutBlank },
    { path: '/trang-chu', component: TrangChu, layout: layout},
    { path: '/trang-chu/nguoi-dung', component: TrangChu, layout: LayoutNguoiDung, kiemtra: KiemTraNguoiDung },
    { path: '/nguoi-dung/profile', component: Profile, layout: LayoutBlank, kiemtra: KiemTraNguoiDung },
    { path: '/su-kien', component: SuKien, layout: LayoutBlank, kiemtra: KiemTraNguoiDung },
    { path: '/danh-sach-san', component: DanhSachSan, layout: LayoutBlank },
    { path: '/dat-san/:id', component: DatSan, layout: LayoutBlank },
    { path: '/map', component: MapBox, layout: LayoutBlank },
];

export default layoutNguoiDung;
