import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPenToSquare, faPlus, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import pageSlice from '../../redux/pageSlice';
import { dataThongBao, themThongBao, capNhatThongBao, xoaThongBao, guiThongBao } from '@/redux/thongBaoSlice';

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
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dataSan, dataSanChuSanOpen } from '@/redux/sanSlice';
import adminSlice from '../../redux/adminSlice';

const QuanLyThongBao = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const defaultThongBao = {
        id_san: '',
        tieu_de: '',
        noi_dung: '',
        tinh_trang: true,
    };

    const [thongBao, setThongBao] = useState(defaultThongBao);

    const dsthongbao = useSelector((state) => state.thongbao.thongbao);

    const dssan = useSelector((state) => state.san.san);
    const [selectedSan, setSelectedSan] = useState(null);
    console.log(dssan);

    useEffect(() => {
        dispatch(pageSlice.actions.setName('Quản Lý Thông Báo'));
        dispatch(dataThongBao());
        dispatch(dataSanChuSanOpen());
    }, [dispatch]);

    const handleAddThongBao = async (e) => {
        e.preventDefault();
        const result = await dispatch(themThongBao(thongBao));
        if (themThongBao.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setThongBao(defaultThongBao);
            setOpen(false);
        } else {
            toast.error(result.payload || 'Thêm mới thất bại');
        }
    };

    const handleUpdateThongBao = async (payload) => {
        const result = await dispatch(capNhatThongBao(payload));
        if (capNhatThongBao.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Cập nhật thất bại');
        }
    };

    const handleDeleteThongBao = async (id) => {
        const result = await dispatch(xoaThongBao(id));
        if (xoaThongBao.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Xóa thất bại');
        }
    };
    const handleEditClick = (value) => {
        setThongBao({
            id_san: value.id_san || '',
            tieu_de: value.tieu_de || '',
            noi_dung: value.noi_dung || '',
            tinh_trang: value.tinh_trang ?? true,
            id: value.id,
        });
    };
    const handleSendThongBao = async () => {
        const result = await dispatch(guiThongBao(thongBao));
        if (guiThongBao.fulfilled.match(result)) {
            toast.success('Gửi thông báo thành công!');
        } else {
            toast.error('Gửi thông báo thất bại');
        }
    };
    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách các thông báo</h3>
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
                            onClick={() => setThongBao(defaultThongBao)}
                            className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-md shadow-custom-xs hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            Thêm Thông Báo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Thông Báo</DialogTitle>
                            <DialogDescription className="text-gray-600 text-sm">
                                Điền đầy đủ thông tin chi tiết về thông báo mới.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleAddThongBao}>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Sân Thể Thao</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setThongBao({
                                            ...thongBao,
                                            id_san: value,
                                        })
                                    }
                                    value={thongBao.id_san}
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
                                <Label className="text-sm font-medium text-gray-700">Tiêu Đề</Label>
                                <Input
                                    onChange={(e) => setThongBao({ ...thongBao, tieu_de: e.target.value })}
                                    value={thongBao.tieu_de}
                                    placeholder="Nhập tiêu đề"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Nội Dung</Label>
                                <Input
                                    onChange={(e) => setThongBao({ ...thongBao, noi_dung: e.target.value })}
                                    value={thongBao.noi_dung}
                                    placeholder="Nhập nội dung"
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
                                Tiêu Đề
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nội Dung
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
                        {dsthongbao
                            .filter((item) => (selectedSan === null ? item : item.id_san === selectedSan))
                            .map((value, index) => (
                                <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.tieu_de}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.noi_dung}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        <Button
                                            onClick={() => handleUpdateThongBao({ ...value, tinh_trang: !value.tinh_trang })}
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
                                                        Cập Nhật Thông Báo
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
                                                                setThongBao({
                                                                    ...thongBao,
                                                                    id_san: value,
                                                                })
                                                            }
                                                            value={thongBao.id_san}
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
                                                        <Label className="text-sm font-medium text-gray-700">Tiêu Đề</Label>
                                                        <Input
                                                            onChange={(e) => setThongBao({ ...thongBao, tieu_de: e.target.value })}
                                                            value={thongBao.tieu_de}
                                                            placeholder="Nhập tiêu đề"
                                                        />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Nội Dung</Label>
                                                        <Input
                                                            onChange={(e) => setThongBao({ ...thongBao, noi_dung: e.target.value })}
                                                            value={thongBao.noi_dung}
                                                            placeholder="Nhập nội dung"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter className="flex justify-end gap-3 pt-4">
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
                                                            onClick={() => handleUpdateThongBao(thongBao)}
                                                            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200 text-sm shadow-custom-xs"
                                                            type="submit"
                                                        >
                                                            Cập Nhật
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
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Xóa</DialogTitle>
                                                    <DialogDescription>Click xác nhận để xóa thông báo</DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Hủy</Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => handleDeleteThongBao(value.id)} type="submit">
                                                            Xác Nhận
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <FontAwesomeIcon
                                                    onClick={() => handleEditClick(value)}
                                                    className="text-green-400 cursor-pointer hover:text-green-600 transition duration-200 transform hover:scale-110"
                                                    icon={faPaperPlane}
                                                />
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Gửi thông báo</DialogTitle>
                                                    <DialogDescription>Click xác nhận để gửi thông báo</DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Hủy</Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => handleSendThongBao()} type="submit">
                                                            Xác Nhận
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
            <Toaster />
        </div>
    );
};

export default QuanLyThongBao;
