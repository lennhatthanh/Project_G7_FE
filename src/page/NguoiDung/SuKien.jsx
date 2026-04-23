import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { dataSuKienOpen, thamGiaSuKien } from '@/redux/suKienSlice';

const SuKien = () => {
    const dispatch = useDispatch();
    const [timKiem, setTimKiem] = useState('');
    const [suKienDangKy, setSuKienDangKy] = useState(null);
    const [CCCD, setCCCD] = useState('');
    const navigate = useNavigate();
    const dssukien = useSelector((state) => state.sukien.sukien);
    const checksukien = useSelector((state) => state.sukien.checksukien);
    const [newCheck, setNewCheck] = useState([]);
    useEffect(() => {
        const ids = checksukien.map((element) => element.id_su_kien);
        setNewCheck(ids);
    }, [checksukien]);
    console.log(checksukien);

    useEffect(() => {
        dispatch(dataSuKienOpen());
    }, []);

    const handleDangKy = async () => {
        if (!suKienDangKy) return;
        const result = await dispatch(
            thamGiaSuKien({ id_su_kien: suKienDangKy.id, can_cuoc_cong_dan: CCCD, phi_tham_gia: suKienDangKy.phi_tham_gia, so_luong: suKienDangKy.so_luong })
        );
        if (thamGiaSuKien.fulfilled.match(result)) {
            toast.success('Đăng ký thành công!');
            setSuKienDangKy(null);
            setTimeout(() => {
                const checkoutUrl = result.payload.checkoutUrl;
                window.location.href = checkoutUrl;
            }, 1000);
        } else {
            toast.error('Đã có lỗi xảy ra!');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 z-20 bg-white cursor-pointer rounded-full shadow-md w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-100 transition"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className="ms-20 text-xl font-bold">Sự kiện thể thao</h2>
                <div className="flex gap-2 items-center">
                    <Label htmlFor="search">Tìm kiếm:</Label>
                    <Input id="search" value={timKiem} onChange={(e) => setTimKiem(e.target.value)} className="w-64" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dssukien
                    .filter((sk) => sk.ten_su_kien.toLowerCase().includes(timKiem.toLowerCase()))
                    .map((sk) => (
                        <Card key={sk.id} className="shadow-md">
                            <CardHeader>
                                <CardTitle>{sk.ten_su_kien}</CardTitle>
                                <CardDescription>{sk.ten_san}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm mb-2">{sk.noi_dung}</p>
                                <p className="text-sm mb-1">
                                    {new Date(sk.thoi_gian_bat_dau).toLocaleString('vi-VN', {
                                        timeZone: 'Asia/Ho_Chi_Minh',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {new Date(sk.thoi_gian_ket_thuc).toLocaleString('vi-VN', {
                                        timeZone: 'Asia/Ho_Chi_Minh',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </p>
                                <p className="text-sm mb-2">Phí tham gia: {sk.phi_tham_gia.toLocaleString()}</p>
                                <p className={`text-sm mb-2 ${sk.so_luong_tham_gia < 10 ? "text-red-600" : ""}`}>Số lượng còn lại: {sk.so_luong_tham_gia}</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        {newCheck.includes(sk.id) ? (
                                            <Button
                                                className="bg-green-600 hover:bg-green-700 cursor-pointer"
                                                disabled
                                                onClick={() => setSuKienDangKy(sk)}
                                            >
                                                Đã Tham Gia
                                            </Button>
                                        ) : (
                                            <Button
                                                className="bg-green-600 hover:bg-green-700 cursor-pointer"
                                                onClick={() => setSuKienDangKy(sk)}
                                            >
                                                Tham gia
                                            </Button>
                                        )}
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Tham gia sự kiện</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="add_ten_mon" className="text-sm font-medium text-gray-700">
                                                    Căn cước công dân
                                                </Label>
                                                <Input
                                                    id="add_ten_mon"
                                                    onChange={(e) => setCCCD(e.target.value)}
                                                    value={CCCD}
                                                    placeholder="Nhập căn cước công dân"
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-200"
                                                />
                                            </div>
                                        </div>
                                        <p>
                                            Bạn có chắc chắn muốn tham gia sự kiện <strong>{suKienDangKy?.ten_su_kien}</strong> không?
                                        </p>
                                        <div className="flex flex-col">
                                            <span className="text-red-500">Lưu ý!</span>
                                            <span>- Chụp lại nội dung thanh toán để xác nhận</span>
                                            <span>- Mang theo CCCD để xác nhận</span>
                                        </div>
                                        <DialogFooter className="mt-4">
                                            <DialogClose asChild>
                                                <Button variant="outline">Hủy</Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button onClick={handleDangKy}>Xác nhận</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    ))}
            </div>
            <Toaster />
        </div>
    );
};

export default SuKien;
