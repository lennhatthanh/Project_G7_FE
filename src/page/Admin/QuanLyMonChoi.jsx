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
import { faPenToSquare, faTrashCan, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { capNhatMonChoi, dataMonChoi, themMonChoi, xoaMonChoi } from '@/redux/monChoiSlice';
import toast, { Toaster } from 'react-hot-toast';

const QuanLyMonChoi = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pageSlice.actions.setName('Quản Lý Môn Chơi'));
    }, [dispatch]);

    const [monChoi, setMonChoi] = useState({
        ten_mon: '',
        mo_ta: '',
        tinh_trang: true,
    });

    const dsmonchoi = useSelector((state) => state.monchoi.monchoi);

    useEffect(() => {
        dispatch(dataMonChoi());
    }, [dispatch]);

    const handleDelMonChoi = async (id) => {
        const result = await dispatch(xoaMonChoi(id));
        if (xoaMonChoi.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Xóa thất bại');
        }
    };

    const handleUpdateMonChoi = async (payload) => {
        const result = await dispatch(capNhatMonChoi(payload));
        if (capNhatMonChoi.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Cập nhật thất bại');
        }
    };

    const handleAddMonChoi = async () => {
        const result = await dispatch(themMonChoi(monChoi));
        if (themMonChoi.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setMonChoi({
                ten_mon: '',
                mo_ta: '',
                tinh_trang: true,
            });
        } else {
            toast.error(result.payload?.message || 'Thêm mới thất bại');
        }
    };

    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách các môn thể thao</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setMonChoi({ ten_mon: '', mo_ta: '', tinh_trang: true })}
                            className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-md shadow-custom-xs hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            Thêm Môn Chơi
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Môn Chơi</DialogTitle>
                            <DialogDescription className="text-gray-600 text-sm">
                                Điền đầy đủ thông tin chi tiết về môn chơi mới.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-1">
                                <Label htmlFor="add_ten_mon" className="text-sm font-medium text-gray-700">
                                    Tên Môn
                                </Label>
                                <Input
                                    id="add_ten_mon"
                                    onChange={(e) => setMonChoi({ ...monChoi, ten_mon: e.target.value })}
                                    value={monChoi.ten_mon}
                                    placeholder="Ví dụ: Bóng đá, Bơi lội..."
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-200"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="add_mo_ta" className="text-sm font-medium text-gray-700">
                                    Mô Tả
                                </Label>
                                <Input
                                    id="add_mo_ta"
                                    onChange={(e) => setMonChoi({ ...monChoi, mo_ta: e.target.value })}
                                    value={monChoi.mo_ta}
                                    placeholder="Mô tả ngắn gọn về môn thể thao này..."
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-200"
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
                                    type="submit"
                                    onClick={handleAddMonChoi}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition duration-200 text-sm shadow-custom-xs"
                                >
                                    Lưu Môn Chơi
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table className="min-w-full divide-y divide-gray-100">
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                STT
                            </TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tên Môn
                            </TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mô Tả
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tình Trạng
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thao Tác
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-100">
                        {dsmonchoi.map((value, index) => (
                            <TableRow key={value.id || index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">
                                    {value.ten_mon}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-sm text-gray-600 max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal cursor-pointer transition-colors duration-150">
                                    {value.mo_ta}
                                </TableCell>
                                <TableCell className="px-6 py-3 whitespace-nowrap text-center">
                                    <Button
                                        onClick={() => handleUpdateMonChoi({ ...value, tinh_trang: !value.tinh_trang })}
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
                                                className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200 transform hover:scale-110"
                                                icon={faPenToSquare}
                                                title="Chỉnh sửa"
                                                onClick={() =>
                                                    setMonChoi({
                                                        ten_mon: value.ten_mon,
                                                        mo_ta: value.mo_ta,
                                                        id: value.id,
                                                        tinh_trang: value.tinh_trang,
                                                    })
                                                }
                                            />
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
                                                    Cập Nhật Môn Chơi
                                                </DialogTitle>
                                                <DialogDescription className="text-gray-600 text-sm">
                                                    Chỉnh sửa thông tin chi tiết và xác nhận thay đổi.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-1">
                                                    <Label htmlFor="edit_ten_mon" className="text-sm font-medium text-gray-700">
                                                        Tên Môn
                                                    </Label>
                                                    <Input
                                                        id="edit_ten_mon"
                                                        onChange={(e) => setMonChoi({ ...monChoi, ten_mon: e.target.value })}
                                                        value={monChoi.ten_mon || ''}
                                                        placeholder="Nhập tên môn"
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="edit_mo_ta" className="text-sm font-medium text-gray-700">
                                                        Mô Tả
                                                    </Label>
                                                    <Input
                                                        id="edit_mo_ta"
                                                        onChange={(e) => setMonChoi({ ...monChoi, mo_ta: e.target.value })}
                                                        value={monChoi.mo_ta || ''}
                                                        placeholder="Nhập mô tả"
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
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
                                                <Button
                                                    type="submit"
                                                    onClick={() => handleUpdateMonChoi(monChoi)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200 text-sm shadow-custom-xs"
                                                >
                                                    Cập Nhật
                                                </Button>
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
                                                <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Xác Nhận Xóa</DialogTitle>
                                                <DialogDescription className="text-gray-600 text-sm">
                                                    Bạn có chắc chắn muốn xóa môn chơi "
                                                    <span className="font-semibold text-gray-800">{value.ten_mon}</span>" không?
                                                    <br />
                                                    Hành động này <strong className="text-red-600">không thể hoàn tác</strong>.
                                                </DialogDescription>
                                            </DialogHeader>
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
                                                        type="button"
                                                        onClick={() => handleDelMonChoi(value.id)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition duration-200 text-sm shadow-custom-xs"
                                                    >
                                                        Xác Nhận Xóa
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
            <Toaster position="top-center" reverseOrder={false} gutter={12} />
        </div>
    );
};

export default QuanLyMonChoi;
