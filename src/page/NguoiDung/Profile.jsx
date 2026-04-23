import { Button } from '@/components/ui/button';
import { capNhatNguoiDung, dataNguoiDung, doiPassNguoiDung, LichSuDatSan } from '@/redux/nguoiDungSlice';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import StarRating from '@/components/ui/StarRating';
import { Textarea } from '@/components/ui/textarea';
import { themDanhGia } from '@/redux/danhGiaSlice';
const Profile = () => {
    const [tab, setTab] = useState('profile');
    const [nguoiDung, setNguoiDung] = useState({});
    const [lichSu, setLichSu] = useState([]);
    const [matKhau, setMatKhau] = useState({
        mat_khau_cu1: '',
        mat_khau_cu2: '',
        mat_khau_moi: '',
    });
    const [danhGia, setDanhGia] = useState({
        id_vi_tri_san: '',
        so_sao: '',
        danh_gia: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleGetNguoiDung = async () => {
            const result = await dispatch(dataNguoiDung());
            if (dataNguoiDung.fulfilled.match(result)) {
                setNguoiDung(result.payload.data);
            }
        };
        const getDataLichSu = async () => {
            const result = await dispatch(LichSuDatSan());
            if (LichSuDatSan.fulfilled.match(result)) {
                setLichSu(result.payload.data || []);
            }
        };
        handleGetNguoiDung();
        getDataLichSu();
    }, []);
    console.log(danhGia);
    const handleRating = (rating) => {
        setDanhGia({ ...danhGia, so_sao: rating });
    };
    const handleUpdate = async () => {
        const result = await dispatch(capNhatNguoiDung(nguoiDung));
        if (capNhatNguoiDung.fulfilled.match(result)) {
            toast.success('Cập nhật thành công!');
        } else {
            toast.error('Cập nhật thất bại!');
        }
    };
    const handleUpdatePassword = async () => {
        const result = await dispatch(doiPassNguoiDung(matKhau));
        if (doiPassNguoiDung.fulfilled.match(result)) {
            toast.success('Đổi mật khẩu thành công!');
        } else {
            toast.error('Đổi mật khẩu thất bại!');
        }
    };
    const handleDanhGia = async () => {
        const result = await dispatch(themDanhGia(danhGia));
        if (themDanhGia.fulfilled.match(result)) {
            toast.success(result.payload.message || 'Đánh giá thành công!');
        } else {
            toast.error('Đánh giá thất bại');
        }
    };
    const groupedLichSu = [];

    lichSu.forEach((item) => {
        const key = `${item.orderCode}-${item.id_vi_tri_dat_san}`;
        const existingGroup = groupedLichSu.find((g) => g.orderCode === item.orderCode && g.id_vi_tri_dat_san === item.id_vi_tri_dat_san);

        if (existingGroup) {
            existingGroup.gio_dats.push(item.gio_dat);
            existingGroup.thanh_tien += item.thanh_tien;
        } else {
            groupedLichSu.push({
                ...item,
                gio_dats: [item.gio_dat],
                thanh_tien: item.thanh_tien,
            });
        }
    });

    return (
        <div className="max-w-4xl mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 z-20 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-100 transition"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flex justify-center mb-6">
                <button
                    className={`cursor-pointer duration-300 ease-in-out px-6 py-2 rounded-t-lg font-semibold ${
                        tab === 'profile'
                            ? 'bg-white text-green-600 border-b-2 border-green-600'
                            : 'bg-gray-100 text-gray-500 border-b-2 border-gray-100'
                    }`}
                    onClick={() => setTab('profile')}
                >
                    Thông tin cá nhân
                </button>
                <button
                    className={`cursor-pointer duration-300 ease-in-out px-6 py-2 rounded-t-lg font-semibold ml-4 ${
                        tab === 'history'
                            ? 'bg-white text-green-600 border-b-2  border-green-600'
                            : 'bg-gray-100 text-gray-500 border-b-2 border-gray-100'
                    }`}
                    onClick={() => setTab('history')}
                >
                    Lịch sử đặt sân
                </button>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
                {tab === 'profile' ? (
                    <div className="flex justify-center gap-6 ">
                        <div className="flex flex-col gap-4 w-full max-w-lg">
                            <div>
                                <label className="text-sm text-gray-500 block mb-1">Họ tên</label>
                                <input
                                    value={nguoiDung.ho_ten || ''}
                                    onChange={(e) => setNguoiDung({ ...nguoiDung, ho_ten: e.target.value })}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-500 block mb-1">Email</label>
                                <input
                                    value={nguoiDung.email || ''}
                                    onChange={(e) => setNguoiDung({ ...nguoiDung, email: e.target.value })}
                                    type="email"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 block mb-1">Số điện thoại</label>
                                <input
                                    value={nguoiDung.so_dien_thoai || ''}
                                    onChange={(e) => setNguoiDung({ ...nguoiDung, so_dien_thoai: e.target.value })}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={handleUpdate}
                                    className="cursor-pointer w-fit bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 mt-2"
                                >
                                    Lưu thay đổi
                                </button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="cursor-pointer w-fit bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 mt-2">
                                            Đổi mật khẩu
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Thông Báo</DialogTitle>
                                            <DialogDescription className="text-gray-600 text-sm">
                                                Điền đầy đủ thông tin chi tiết về thông báo mới.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-1">
                                                <Label className="text-sm font-medium text-gray-700">Mật Khẩu Cũ</Label>
                                                <Input
                                                    onChange={(e) => setMatKhau({ ...matKhau, mat_khau_cu1: e.target.value })}
                                                    value={matKhau.mat_khau_cu1}
                                                    placeholder="Nhập tiêu đề"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-sm font-medium text-gray-700">Nhập Mật Khẩu Cũ</Label>
                                                <Input
                                                    onChange={(e) => setMatKhau({ ...matKhau, mat_khau_cu2: e.target.value })}
                                                    value={matKhau.mat_khau_cu2}
                                                    placeholder="Nhập nội dung"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-sm font-medium text-gray-700">Mật Khẩu Mới</Label>
                                                <Input
                                                    onChange={(e) => setMatKhau({ ...matKhau, mat_khau_moi: e.target.value })}
                                                    value={matKhau.mat_khau_moi}
                                                    placeholder="Nhập nội dung"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button
                                                    className="px-4 py-2 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition duration-200 text-sm font-medium"
                                                    variant="outline"
                                                >
                                                    Hủy
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button
                                                    onClick={handleUpdatePassword}
                                                    className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition duration-200 text-sm shadow-custom-xs"
                                                    type="submit"
                                                >
                                                    Xác Nhận
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-130 overflow-y-auto space-y-4 pr-2">
                        {groupedLichSu.sort((a, b) => new Date(b.ngay_dat) - new Date(a.ngay_dat)).map((item, index) => (
                            <div key={index} className="border rounded-lg p-4 flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="font-semibold">{item.ten_san}</p>
                                    <p className="text-sm text-gray-500">Ngày: {item.ngay_dat.substring(0, 10)}</p>
                                    <p className="text-sm text-gray-500">Sân số: {item.so_san}</p>
                                    <p className="text-sm text-gray-500">Mã Thanh Toán: {item.orderCode}</p>
                                    <p className="text-sm text-gray-500">Giờ đã đặt: {item.gio_dats.join(', ')}</p>

                                    <div className="flex justify-between">
                                        {item.id_danh_gia === null ? (
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            onClick={() =>
                                                                setDanhGia({ ...danhGia, id_vi_tri_san: item.id_vi_tri_dat_san })
                                                            }
                                                            className="bg-green-700 mt-2 shadow-2xs hover:bg-green-800 cursor-pointer"
                                                        >
                                                            Đánh Giá
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Đánh Giá</DialogTitle>
                                                            <DialogDescription>
                                                                Mỗi sân chỉ đc đánh giá 1 lần và ko thể thay đổi!
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <div className="">
                                                                    <Label htmlFor="username-1">Số sao</Label>
                                                                    <StarRating onRatingChange={handleRating} />
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">Đánh giá</Label>
                                                                <Textarea
                                                                    value={danhGia.danh_gia}
                                                                    onChange={(e) => setDanhGia({ ...danhGia, danh_gia: e.target.value })}
                                                                    className="h-40"
                                                                    id="username-1"
                                                                    name="username"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Hủy Bỏ</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button
                                                                    onClick={handleDanhGia}
                                                                    type="submit"
                                                                    className="bg-blue-500 hover:bg-blue-600"
                                                                >
                                                                    Xác Nhận
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>
                                        ) : (
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            onClick={() =>
                                                                setDanhGia({ ...danhGia, id_vi_tri_san: item.id_vi_tri_dat_san })
                                                            }
                                                            className="bg-green-700 mt-2 shadow-2xs hover:bg-green-800 cursor-pointer"
                                                        >
                                                            Đánh Giá
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Đánh Giá</DialogTitle>
                                                            <DialogDescription>Bạn đã đánh giá sân này rồi</DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Hủy Bỏ</Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-green-600">Giá tiền</p>
                                    <p className="text-lg font-bold text-gray-800">{item.thanh_tien.toLocaleString() + 'đ'}</p>
                                    <Button
                                        onClick={() => navigate(`/dat-san/${item.id_vi_tri_dat_san}`)}
                                        className="bg-blue-500 mt-2 shadow-2xs hover:bg-blue-600 cursor-pointer"
                                    >
                                        Đặt Lại
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Toaster />
        </div>
    );
};

export default Profile;
