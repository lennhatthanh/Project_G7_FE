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
import { capNhatMaGiamGia, dataMaGiamGia, themMaGiamGia, xoaMaGiamGia } from '@/redux/maGiamGiaSlice';
import toast, { Toaster } from 'react-hot-toast';
import { dataSan, dataSanChuSanOpen, dataSanOpen } from '@/redux/sanSlice';

const QuanLyMaGiamGia = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(pageSlice.actions.setName('Quản Lý Mã Giảm Giá'));
    }, []);
    const defaultMaGiamGia = {
        id_san: '',
        ma_giam_gia: '',
        loai_giam_gia: '',
        mo_ta: '',
        gia_tri_giam: '',
        ngay_bat_dau: '',
        ngay_ket_thuc: '',
        tinh_trang: true,
    };
    const [maGiamGia, setMaGiamGia] = useState(defaultMaGiamGia);

    const dsmaGiamGia = useSelector((state) => state.magiamgia.magiamgia) || [];
    const [selectedSan, setSelectedSan] = useState(null);
    const dssan = useSelector((state) => state.san.san);

    useEffect(() => {
        dispatch(dataMaGiamGia());
        dispatch(dataSanChuSanOpen());
    }, []);

    const handleDelMaGiamGia = async (id) => {
        const result = await dispatch(xoaMaGiamGia(id));
        if (xoaMaGiamGia.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Xóa thất bại');
        }
    };

    const handleUpdateMaGiamGia = async (payload) => {
        const result = await dispatch(capNhatMaGiamGia(payload));
        if (capNhatMaGiamGia.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Cập nhật thất bại');
        }
    };

    const handleAddMaGiamGia = async (e) => {
        e.preventDefault();
        const result = await dispatch(themMaGiamGia(maGiamGia));
        if (themMaGiamGia.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setMaGiamGia({});
            setOpen(false);
        } else {
            toast.error(result.payload || 'Thêm mới thất bại');
        }
    };
    // ✅ Format ngày để input date hiển thị chính xác
    const toYMD = (d) => {
        if (!d) return '';
        const date = new Date(d);
        if (Number.isNaN(date.getTime())) return '';
        return date.toISOString().slice(0, 10);
    };

    // ...

    const handleEditClick = (v) => {
        setMaGiamGia({
            id: v.id,
            id_san: v.id_san,
            ma_giam_gia: v.ma_giam_gia,
            loai_giam_gia: v.loai_giam_gia,
            mo_ta: v.mo_ta,
            gia_tri_giam: v.gia_tri_giam,
            // ✅ Chỉnh 2 dòng này để input hiển thị đúng định dạng
            ngay_bat_dau: toYMD(v.ngay_bat_dau),
            ngay_ket_thuc: toYMD(v.ngay_ket_thuc),
            tinh_trang: !!v.tinh_trang,
        });
    };

    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách các mã giảm giá</h3>
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
                                <SelectItem key={index} value={value.id}>
                                    {value.ten_san}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setMaGiamGia(defaultMaGiamGia)}
                            className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-md shadow-custom-xs hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            Thêm Mã Giảm Giá
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Mã Giảm Giá</DialogTitle>
                            <DialogDescription className="text-gray-600 text-sm">
                                Điền đầy đủ thông tin chi tiết về mã giảm giá mới.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleAddMaGiamGia}>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Sân Thể Thao</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setMaGiamGia({
                                            ...maGiamGia,
                                            id_san: value,
                                        })
                                    }
                                    value={maGiamGia.id_san}
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
                                <Label className="text-sm font-medium text-gray-700">Mã Giảm Giá</Label>
                                <Input
                                    onChange={(e) =>
                                        setMaGiamGia({
                                            ...maGiamGia,
                                            ma_giam_gia: e.target.value,
                                        })
                                    }
                                    value={maGiamGia.ma_giam_gia}
                                    placeholder="Nhập mã giảm giá"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Loại Giảm Giá</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setMaGiamGia({
                                            ...maGiamGia,
                                            loai_giam_gia: value,
                                        })
                                    }
                                    value={maGiamGia.loai_giam_gia}
                                    required
                                >
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Loại giảm giá" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Phần Trăm">Phần Trăm</SelectItem>
                                        <SelectItem value="Tiền Mặt">Tiền Mặt</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Mô Tả</Label>
                                <Input
                                    onChange={(e) =>
                                        setMaGiamGia({
                                            ...maGiamGia,
                                            mo_ta: e.target.value,
                                        })
                                    }
                                    value={maGiamGia.mo_ta}
                                    placeholder="Nhập mô tả"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Giá Trị Giảm</Label>
                                <Input
                                    onChange={(e) =>
                                        setMaGiamGia({
                                            ...maGiamGia,
                                            gia_tri_giam: e.target.value,
                                        })
                                    }
                                    value={maGiamGia.gia_tri_giam}
                                    placeholder="Nhập giá trị giảm giá"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Ngày Bắt Đầu</Label>
                                <Input
                                    onChange={(e) =>
                                        setMaGiamGia({
                                            ...maGiamGia,
                                            ngay_bat_dau: e.target.value,
                                        })
                                    }
                                    value={maGiamGia.ngay_bat_dau}
                                    type="date"
                                    placeholder="Nhập giá trị giảm giá"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Ngày Kết Thúc</Label>
                                <Input
                                    onChange={(e) =>
                                        setMaGiamGia({
                                            ...maGiamGia,
                                            ngay_ket_thuc: e.target.value,
                                        })
                                    }
                                    value={maGiamGia.ngay_ket_thuc}
                                    type="date"
                                    placeholder="Nhập giá trị giảm giá"
                                    required
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
                                Mã Giảm Giá
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mô Tả
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Giá Trị
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
                        {dsmaGiamGia
                            .filter((item) => (selectedSan === null ? item : item.id_san === selectedSan))
                            .map((value, index) => {
                                return (
                                    <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.ma_giam_gia}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.mo_ta}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.gia_tri_giam}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            <Button
                                                onClick={() => handleUpdateMaGiamGia({ ...value, tinh_trang: !value.tinh_trang })}
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
                                                    className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100"
                                                >
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
                                                            Cập Nhật Mã Giảm Giá
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
                                                                    setMaGiamGia({
                                                                        ...maGiamGia,
                                                                        id_san: value,
                                                                    })
                                                                }
                                                                value={value.id_san}
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
                                                            <Label className="text-sm font-medium text-gray-700">Mã Giảm Giá</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setMaGiamGia({
                                                                        ...maGiamGia,
                                                                        ma_giam_gia: e.target.value,
                                                                    })
                                                                }
                                                                value={maGiamGia.ma_giam_gia}
                                                                placeholder="Nhập mã giảm giá"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Loại Giảm Giá</Label>
                                                            <Select
                                                                onValueChange={(value) =>
                                                                    setMaGiamGia({
                                                                        ...maGiamGia,
                                                                        loai_giam_gia: value,
                                                                    })
                                                                }
                                                                value={maGiamGia.loai_giam_gia}
                                                            >
                                                                <SelectTrigger className="w-[100%]">
                                                                    <SelectValue placeholder="Thành Phố" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Phần Trăm">Phần Trăm</SelectItem>
                                                                    <SelectItem value="Tiền Mặt">Tiền Mặt</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Mô Tả</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setMaGiamGia({
                                                                        ...maGiamGia,
                                                                        mo_ta: e.target.value,
                                                                    })
                                                                }
                                                                value={maGiamGia.mo_ta}
                                                                placeholder="Nhập mô tả"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Giá Trị Giảm</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setMaGiamGia({
                                                                        ...maGiamGia,
                                                                        gia_tri_giam: e.target.value,
                                                                    })
                                                                }
                                                                value={maGiamGia.gia_tri_giam}
                                                                placeholder="Nhập giá trị giảm giá"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Ngày Bắt Đầu</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setMaGiamGia({
                                                                        ...maGiamGia,
                                                                        ngay_bat_dau: e.target.value,
                                                                    })
                                                                }
                                                                value={maGiamGia.ngay_bat_dau}
                                                                type="date"
                                                                placeholder="Nhập giá trị giảm giá"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Ngày Kết Thúc</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setMaGiamGia({
                                                                        ...maGiamGia,
                                                                        ngay_ket_thuc: e.target.value,
                                                                    })
                                                                }
                                                                value={maGiamGia.ngay_ket_thuc}
                                                                type="date"
                                                                placeholder="Nhập giá trị giảm giá"
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
                                                                onClick={() => handleUpdateMaGiamGia(maGiamGia)}
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
                                                                onClick={() => handleDelMaGiamGia(value.id)}
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

export default QuanLyMaGiamGia;
