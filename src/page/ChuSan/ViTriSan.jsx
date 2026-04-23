import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pageSlice from '../../redux/pageSlice';
import { dataChuSan, themChuSan } from '../../redux/chuSanSlice';
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
import { dataSan, dataSanChuSanOpen } from '@/redux/sanSlice';
import { dataMonChoi } from '@/redux/monChoiSlice';
import { capNhatViTriSan, dataViTriSan, themViTriSan, xoaViTriSan } from '@/redux/viTriSanSlice';
import toast, { Toaster } from 'react-hot-toast';

const ViTriSan = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(pageSlice.actions.setName('Vị Trí Sân'));
    }, []);
    const defaultViTriSan = {
        id_san: '',
        id_mon_choi: '',
        so_san: '',
        gia_san: '',
        mo_ta: '',
        tinh_trang: true,
    };
    const [viTriSan, setViTriSan] = useState(defaultViTriSan);
    const dsvitrisan = useSelector((state) => state.vitrisan.vitrisan) || [];
    const [selectedSan, setSelectedSan] = useState(null);
    const dssan = useSelector((state) => state.san.san);
    const dsmonchoi = useSelector((state) => state.monchoi.monchoi);

    const handleDelViTriSan = async (id) => {
        const result = await dispatch(xoaViTriSan(id));
        if (xoaViTriSan.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Xóa thất bại');
        }
    };

    const handleUpdateViTriSan = async (payload) => {
        const result = await dispatch(capNhatViTriSan(payload));
        if (capNhatViTriSan.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Cập nhật thất bại');
        }
    };

    const handleAddViTriSan = async (e) => {
        e.preventDefault();
        const result = await dispatch(themViTriSan(viTriSan));
        if (themViTriSan.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setOpen(false);
            setViTriSan({});
        } else {
            toast.error(result.payload || 'Thêm mới thất bại');
        }
    };

    useEffect(() => {
        dispatch(dataSanChuSanOpen());
        dispatch(dataMonChoi());
        dispatch(dataViTriSan());
    }, []);
    const handleEditClick = (value) => {
        setViTriSan({
            id: value.id,
            id_san: value.id_san,
            id_mon_choi: value.id_mon_choi,
            so_san: value.so_san,
            gia_san: value.gia_san,
            mo_ta: value.mo_ta,
            tinh_trang: value.tinh_trang,
        });
    };
    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách các vị trí sân</h3>
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
                            onClick={() => setViTriSan(defaultViTriSan)}
                            className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-md shadow-custom-xs hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            Thêm Vị Trí Sân
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        showCloseButton={false}
                        className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Vị Trí Sân</DialogTitle>
                            <DialogDescription className="text-gray-600 text-sm">
                                Điền đầy đủ thông tin chi tiết về vị trí sân mới.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleAddViTriSan}>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Sân Thể Thao</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setViTriSan({
                                            ...viTriSan,
                                            id_san: value,
                                        })
                                    }
                                    value={viTriSan.id_san}
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
                                <Label className="text-sm font-medium text-gray-700">Môn Chơi</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setViTriSan({
                                            ...viTriSan,
                                            id_mon_choi: value,
                                        })
                                    }
                                    value={viTriSan.id_mon_choi}
                                    required
                                >
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Môn chơi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dsmonchoi.map((value, index) => {
                                            return (
                                                <SelectItem key={index} value={String(value.id)}>
                                                    {value.ten_mon}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Số Sân</Label>
                                <Input
                                    onChange={(e) =>
                                        setViTriSan({
                                            ...viTriSan,
                                            so_san: e.target.value,
                                        })
                                    }
                                    value={viTriSan.so_san}
                                    placeholder="Nhập số sân"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Giá Sân</Label>
                                <Input
                                    onChange={(e) =>
                                        setViTriSan({
                                            ...viTriSan,
                                            gia_san: e.target.value,
                                        })
                                    }
                                    value={viTriSan.gia_san}
                                    placeholder="Nhập giá sân"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Mô Tả</Label>
                                <Input
                                    onChange={(e) =>
                                        setViTriSan({
                                            ...viTriSan,
                                            mo_ta: e.target.value,
                                        })
                                    }
                                    value={viTriSan.mo_ta}
                                    placeholder="Nhập mô tả"
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
                                Môn Chơi
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Số Sân
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Giá Sân
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mô Tả
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
                        {dsvitrisan
                            .filter((item) => (selectedSan === null ? item : item.id_san === selectedSan))
                            .map((value, index) => {
                                return (
                                    <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {dsmonchoi.length < 1 ? '' : dsmonchoi.find((item) => item.id === value.id_mon_choi).ten_mon}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.so_san}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.gia_san}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.mo_ta}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            <Button
                                                onClick={() => handleUpdateViTriSan({ ...value, tinh_trang: !value.tinh_trang })}
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
                                                            Cập Nhật Vị Trí Sân
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
                                                                    setViTriSan({
                                                                        ...viTriSan,
                                                                        id_san: value,
                                                                    })
                                                                }
                                                                value={viTriSan.id_san}
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
                                                            <Label className="text-sm font-medium text-gray-700">Môn Chơi</Label>
                                                            <Select
                                                                onValueChange={(value) =>
                                                                    setViTriSan({
                                                                        ...viTriSan,
                                                                        id_mon_choi: value,
                                                                    })
                                                                }
                                                                value={viTriSan.id_mon_choi}
                                                            >
                                                                <SelectTrigger className="w-[100%]">
                                                                    <SelectValue placeholder="Thành Phố" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {dsmonchoi.map((value, index) => {
                                                                        return (
                                                                            <SelectItem key={index} value={value.id}>
                                                                                {value.ten_mon}
                                                                            </SelectItem>
                                                                        );
                                                                    })}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Số Sân</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setViTriSan({
                                                                        ...viTriSan,
                                                                        so_san: e.target.value,
                                                                    })
                                                                }
                                                                value={viTriSan.so_san}
                                                                placeholder="Nhập email"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Giá Sân</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setViTriSan({
                                                                        ...viTriSan,
                                                                        gia_san: e.target.value,
                                                                    })
                                                                }
                                                                value={viTriSan.gia_san}
                                                                placeholder="Nhập mật khẩu"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-sm font-medium text-gray-700">Mô Tả</Label>
                                                            <Input
                                                                onChange={(e) =>
                                                                    setViTriSan({
                                                                        ...viTriSan,
                                                                        mo_ta: e.target.value,
                                                                    })
                                                                }
                                                                value={viTriSan.mo_ta}
                                                                placeholder="Nhập số điện thoại"
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
                                                                onClick={() => handleUpdateViTriSan(viTriSan)}
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
                                                <DialogContent
                                                    showCloseButton={false}
                                                    className="max-w-sm p-6 bg-white rounded-xl shadow-custom-md border border-gray-100"
                                                >
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
                                                                onClick={() => handleDelViTriSan(value.id)}
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

export default ViTriSan;
