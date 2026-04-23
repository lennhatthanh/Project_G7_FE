import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pageSlice from '../../redux/pageSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { dataSan, dataSanChuSanOpen, dataSanOpen } from '@/redux/sanSlice';
import { capNhatSuKien, dataSuKien, themSuKien, xoaSuKien } from '@/redux/suKienSlice';

const QuanLySuKien = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(pageSlice.actions.setName('Quản Lý Sự Kiện'));
    }, []);
    const defaultSuKien = {
        id_san: '',
        ten_su_kien: '',
        noi_dung: '',
        thoi_gian_bat_dau: '',
        thoi_gian_ket_thuc: '',
        so_luong: '',
        tinh_trang: true,
    };
    const [suKien, setSuKien] = useState(defaultSuKien);

    const dssuKien = useSelector((state) => state.sukien.sukien) || [];
    const [selectedSan, setSelectedSan] = useState(null);
    const dssan = useSelector((state) => state.san.san);

    useEffect(() => {
        dispatch(dataSuKien());
        dispatch(dataSanChuSanOpen());
    }, []);

    const handleDelSuKien = async (id) => {
        const result = await dispatch(xoaSuKien(id));
        if (xoaSuKien.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Xóa thất bại');
        }
    };

    const handleUpdateSuKien = async (payload) => {
        const result = await dispatch(capNhatSuKien(payload));
        if (capNhatSuKien.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Cập nhật thất bại');
        }
    };

    const handleAddSuKien = async (e) => {
        e.preventDefault();
        const result = await dispatch(themSuKien(suKien));
        if (themSuKien.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setOpen(false);
            setSuKien({});
        } else {
            toast.error(result.payload || 'Thêm mới thất bại');
        }
    };
    const handleEditClick = (value) => {
        setSuKien({
            ten_su_kien: value.ten_su_kien,
            noi_dung: value.noi_dung,
            thoi_gian_bat_dau: value.thoi_gian_bat_dau,
            thoi_gian_ket_thuc: value.thoi_gian_ket_thuc,
            so_luong: value.so_luong,
            tinh_trang: value.tinh_trang,
            id: value.id,
        });
    };
    const getMinDateTimeLocal = () => {
        const now = new Date();
        now.setSeconds(0, 0);

        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60 * 1000);

        return localDate.toISOString().slice(0, 16);
    };
    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách các dịch vụ</h3>
                <Select onValueChange={(value) => setSelectedSan(value)} value={selectedSan} className="text-2xl">
                    <SelectTrigger className="w-[50%]">
                        <SelectValue placeholder="Sân Thể Thao" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key={2000} value={null}>
                            All
                        </SelectItem>
                        {dssan.map((value, index) => {
                            return (
                                <SelectItem key={index} value={String(value.id)}>
                                    {value.ten_san}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setSuKien(defaultSuKien)}
                            className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-md shadow-custom-xs hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            Thêm Sự Kiện
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md h-[550px] overflow-auto p-6 bg-white rounded-xl shadow-custom-md border border-gray-100">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Sự Kiện</DialogTitle>
                            <DialogDescription className="text-gray-600 text-sm">
                                Điền đầy đủ thông tin chi tiết về sự kiện mới.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleAddSuKien}>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Sân Thể Thao</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setSuKien({
                                            ...suKien,
                                            id_san: value,
                                        })
                                    }
                                    value={suKien.id_san}
                                    required
                                >
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Chọn sân" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dssan.map((value, index) => {
                                            return (
                                                <SelectItem key={index} value={String(value.id)}>
                                                    {value.ten_san}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Tên Sự Kiện</Label>
                                <Input
                                    onChange={(e) =>
                                        setSuKien({
                                            ...suKien,
                                            ten_su_kien: e.target.value,
                                        })
                                    }
                                    value={suKien.ten_su_kien}
                                    placeholder="Nhập tên sự kiện"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Nội Dung</Label>
                                <Input
                                    onChange={(e) =>
                                        setSuKien({
                                            ...suKien,
                                            noi_dung: e.target.value,
                                        })
                                    }
                                    value={suKien.noi_dung}
                                    placeholder="Nhập nội dung"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Thời Gian Bắt Đầu</Label>
                                <Input
                                    onChange={(e) =>
                                        setSuKien({
                                            ...suKien,
                                            thoi_gian_bat_dau: e.target.value,
                                        })
                                    }
                                    type="datetime-local"
                                    min={getMinDateTimeLocal}
                                    value={suKien.thoi_gian_bat_dau}
                                    placeholder="Nhập ngày bắt đầu"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Thời Gian Kết Thúc</Label>
                                <Input
                                    onChange={(e) =>
                                        setSuKien({
                                            ...suKien,
                                            thoi_gian_ket_thuc: e.target.value,
                                        })
                                    }
                                    type="datetime-local"
                                    min={getMinDateTimeLocal}
                                    value={suKien.thoi_gian_ket_thuc}
                                    placeholder="Nhập ngày kết thúc"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Số Lượng</Label>
                                <Input
                                    onChange={(e) =>
                                        setSuKien({
                                            ...suKien,
                                            so_luong: e.target.value,
                                        })
                                    }
                                    value={suKien.so_luong}
                                    placeholder="Nhập số lượng"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Phí Tham Gia</Label>
                                <Input
                                    onChange={(e) =>
                                        setSuKien({
                                            ...suKien,
                                            phi_tham_gia: e.target.value,
                                        })
                                    }
                                    value={suKien.phi_tham_gia}
                                    required
                                    placeholder="Nhập phí tham gia"
                                />
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
                                <Button
                                    onClick={() => handleAddSuKien()}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition duration-200 text-sm shadow-custom-xs"
                                    type="submit"
                                >
                                    Xác Nhận
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table className="min-w-full divide-y divide-gray-100">
                    <TableHeader>
                        <TableRow className="bg-gray-300">
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                TÊn Sự Kiện
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nội Dung
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thời Gian Bắt Đầu
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thời Gian Kết Thúc
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Số Lượng
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Phí Tham Gia
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tình Trạng
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Chức Năng
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dssuKien
                            .filter((item) => (selectedSan === null ? item : item.id_san === selectedSan))
                            .map((value, index) => {
                                return (
                                    <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.ten_su_kien}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.noi_dung}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {new Date(value.thoi_gian_bat_dau).toLocaleString('vi-VN', {
                                                timeZone: 'Asia/Ho_Chi_Minh',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {new Date(value.thoi_gian_ket_thuc).toLocaleString('vi-VN', {
                                                timeZone: 'Asia/Ho_Chi_Minh',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.so_luong}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.phi_tham_gia}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            <Button
                                                onClick={() => handleUpdateSuKien({ ...value, tinh_trang: !value.tinh_trang })}
                                                className={`${
                                                    value.tinh_trang
                                                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                } text-xs py-1.5 px-3 rounded-full transition duration-200 font-medium shadow-custom-xs`}
                                                style={{ minWidth: '85px' }}
                                            >
                                                {value.tinh_trang ? 'Hoạt Động' : 'Không Hoạt Động'}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-center text-base space-x-3">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <FontAwesomeIcon
                                                        onClick={() => handleEditClick(value)}
                                                        className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200 transform hover:scale-110"
                                                        icon={faPenToSquare}
                                                    />
                                                </DialogTrigger>
                                                <DialogContent
                                                    showCloseButton={false}
                                                    className="max-w-md h-[550px] overflow-auto p-6 bg-white rounded-xl shadow-custom-md border border-gray-100"
                                                >
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
                                                            Cập Nhật Sự Kiện
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gray-600 text-sm">
                                                            Chỉnh sửa thông tin chi tiết và xác nhận thay đổi.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Sân Thể Thao</Label>
                                                            <Select
                                                                onValueChange={(value) =>
                                                                    setSuKien({
                                                                        ...suKien,
                                                                        id_san: value,
                                                                    })
                                                                }
                                                                value={suKien.id_san}
                                                            >
                                                                <SelectTrigger className="w-[100%]">
                                                                    <SelectValue placeholder="Thành Phố" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {dssan.map((value, index) => {
                                                                        return (
                                                                            <SelectItem key={index} value={value.id}>
                                                                                {value.ten_san}
                                                                            </SelectItem>
                                                                        );
                                                                    })}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Tên Sự Kiện</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setSuKien({
                                                                        ...suKien,
                                                                        ten_su_kien: e.target.value,
                                                                    })
                                                                }
                                                                value={suKien.ten_su_kien}
                                                                placeholder="Nhập tên sự kiện"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Nội Dung</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setSuKien({
                                                                        ...suKien,
                                                                        noi_dung: e.target.value,
                                                                    })
                                                                }
                                                                value={suKien.noi_dung}
                                                                placeholder="Nhập nội dung"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Thời Gian Bắt Đầu</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setSuKien({
                                                                        ...suKien,
                                                                        thoi_gian_bat_dau: e.target.value,
                                                                    })
                                                                }
                                                                type="datetime-local"
                                                                value={suKien.thoi_gian_bat_dau}
                                                                placeholder="Nhập ngày bắt đầu"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Thời Gian Kết Thúc</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setSuKien({
                                                                        ...suKien,
                                                                        thoi_gian_ket_thuc: e.target.value,
                                                                    })
                                                                }
                                                                type="datetime-local"
                                                                value={suKien.thoi_gian_ket_thuc}
                                                                placeholder="Nhập ngày kết thúc"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Số Lượng</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setSuKien({
                                                                        ...suKien,
                                                                        ngay_bat_dau: e.target.value,
                                                                    })
                                                                }
                                                                value={suKien.ngay_bat_dau}
                                                                placeholder="Nhập số lượng"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Phí Tham Gia</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setSuKien({
                                                                        ...suKien,
                                                                        phi_tham_gia: e.target.value,
                                                                    })
                                                                }
                                                                value={suKien.phi_tham_gia}
                                                                placeholder="Nhập phí tham gia"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="px-4 py-2 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition duration-200 text-sm font-medium"
                                                            >
                                                                Hủy bỏ
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button
                                                                onClick={() => handleUpdateSuKien(suKien)}
                                                                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200 text-sm shadow-custom-xs"
                                                                type="submit"
                                                            >
                                                                Xác Nhận
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <FontAwesomeIcon
                                                        className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200 transform hover:scale-110"
                                                        icon={faTrashCan}
                                                        title="Xóa"
                                                    />
                                                </DialogTrigger>
                                                <DialogContent className="max-w-sm p-6 bg-white rounded-xl shadow-custom-md border border-gray-100">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
                                                            Xác Nhận Xóa
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gray-600 text-sm">
                                                            Bạn có chắc chắn muốn xóa môn chơi "
                                                            <span className="font-semibold text-gray-800">{value.ten_mon}</span>" không?
                                                            <br />
                                                            Hành động này <strong className="text-red-600">không thể hoàn tác</strong>.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="px-4 py-2 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition duration-200 text-sm font-medium"
                                                            >
                                                                Hủy bỏ
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button
                                                                onClick={() => handleDelSuKien(value.id)}
                                                                className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition duration-200 text-sm shadow-custom-xs"
                                                                type="submit"
                                                            >
                                                                Xác Nhận
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
            <Toaster />
        </div>
    );
};

export default QuanLySuKien;
