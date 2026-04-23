import LayoutChuSan from '../layout/wrapper/layout_chusan';
import QuanLyNhanVien from '../page/ChuSan/QuanLyNhanVien';
import ThongKe from '../page/ChuSan/ThongKe';
import LayoutBlank from '../layout/wrapper/layout_blank';
import QuanLyDichVu from '@/page/ChuSan/QuanLyDichVu';
import QuanLySan from '@/page/ChuSan/QuanLySan';
import QuanLyThongBao from '@/page/ChuSan/QuanLyThongBao';
import QuanLyMaGiamGia from '@/page/ChuSan/QuanLyMaGiamGia';
import ViTriSan from '@/page/ChuSan/ViTriSan';
import KiemTraChuSan from '@/kiemtra/KiemTraChuSan';
import DangNhap from '@/page/ChuSan/DangNhap';
import QuanLySuKien from '@/page/ChuSan/QuanLySuKien';
import QuanLyDatSan from '@/page/ChuSan/QuanLyDatSan';

const layoutChuSan = [
    { path: '/chu-san/dang-nhap', component: DangNhap, layout: LayoutBlank },
    { path: '/chu-san/bao-cao-thong-ke', component: ThongKe, layout: LayoutChuSan },
    { path: '/chu-san/quan-ly-nhan-vien', component: QuanLyNhanVien, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
    { path: '/chu-san/quan-ly-su-kien', component: QuanLySuKien, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
    { path: '/chu-san/quan-ly-dich-vu', component: QuanLyDichVu, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
    { path: '/chu-san/quan-ly-san', component: QuanLySan, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
    { path: '/chu-san/quan-ly-dat-san', component: QuanLyDatSan, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
    { path: '/chu-san/quan-ly-thong-bao', component: QuanLyThongBao, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
    { path: '/chu-san/quan-ly-ma-giam-gia', component: QuanLyMaGiamGia, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
    { path: '/chu-san/vi-tri-san', component: ViTriSan, layout: LayoutChuSan, kiemtra: KiemTraChuSan },
];

export default layoutChuSan;
