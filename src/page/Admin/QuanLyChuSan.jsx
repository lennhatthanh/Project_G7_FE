import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pageSlice from '../../redux/pageSlice';
import { capNhatChuSan, dataChuSan, themChuSan, xoaChuSan } from '../../redux/chuSanSlice';
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
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';

const QuanLyChuSan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(pageSlice.actions.setName('Quản Lý Chủ Sân'));
    }, []);
    const defaultChuSan = {
        ho_ten: '',
        email: '',
        mat_khau: '',
        so_dien_thoai: '',
        gioi_tinh: '',
        tinh_trang: true,
    };
    const [chusan, setChusan] = useState(defaultChuSan);

    const dschusan = useSelector((state) => state.chuSan.chu_san);

    const handleAddChuSan = async () => {
        const result = await dispatch(themChuSan(chusan));
        if (themChuSan.fulfilled.match(result)) {
            toast.success(result.payload.message || 'Thêm mới thành công');
        } else {
            toast.error(result.payload || 'Thêm mới thất bại');
        }
        setChusan({});
    };
    const handleDeleteChuSan = async (id) => {
        const result = await dispatch(xoaChuSan(id));
        if (xoaChuSan.fulfilled.match(result)) {
            toast.success(result.payload.message || 'Xóa thành công');
        } else {
            toast.error(result.payload || 'Xóa thất bại');
        }
    };
    const handleUpdateChuSan = async (payload) => {
        const result = await dispatch(capNhatChuSan(payload));
        if (capNhatChuSan.fulfilled.match(result)) {
            toast.success(result.payload.message || 'Cập nhật thành công');
        } else {
            toast.error(result.payload || 'Cập nhật thất bại');
        }
    };
    const handleEditClick = (value) => {
        setChusan({
            ho_ten: value.ho_ten,
            email: value.email,
            mat_khau: value.mat_khau,
            so_dien_thoai: value.so_dien_thoai,
            gioi_tinh: value.gioi_tinh,
            tinh_trang: true,
            id: value.id,
        });
    };
    useEffect(() => {
        if (!dschusan || dschusan.length === 0) {
            dispatch(dataChuSan());
        }
    }, []);

    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách các chủ sân</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setChusan({})}
                            className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-md shadow-custom-xs hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            Thêm Chủ Sân
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        showCloseButton={false}
                        className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Chủ Sân</DialogTitle>
                            <DialogDescription className="text-gray-600 text-sm">
                                Điền đầy đủ thông tin chi tiết về chủ sân mới.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Họ Tên</Label>
                                <Input
                                    onChange={(e) =>
                                        setChusan({
                                            ...chusan,
                                            ho_ten: e.target.value,
                                        })
                                    }
                                    value={chusan.ho_ten}
                                    placeholder="Nhập họ tên"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Email</Label>
                                <Input
                                    onChange={(e) =>
                                        setChusan({
                                            ...chusan,
                                            email: e.target.value,
                                        })
                                    }
                                    value={chusan.email}
                                    type="email"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Mật Khẩu</Label>
                                <Input
                                    onChange={(e) =>
                                        setChusan({
                                            ...chusan,
                                            mat_khau: e.target.value,
                                        })
                                    }
                                    value={chusan.mat_khau}
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Số Điện Thoại</Label>
                                <Input
                                    onChange={(e) =>
                                        setChusan({
                                            ...chusan,
                                            so_dien_thoai: e.target.value,
                                        })
                                    }
                                    value={chusan.so_dien_thoai}
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Giới Tính</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setChusan({
                                            ...chusan,
                                            gioi_tinh: value,
                                        })
                                    }
                                    value={chusan.gioi_tinh}
                                >
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Giới Tính" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Nam">Nam</SelectItem>
                                        <SelectItem value="Nữ">Nữ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter className="flex justify-end gap-3 pt-4">
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
                                    onClick={() => handleAddChuSan()}
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
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table className="min-w-full divide-y divide-gray-100">
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Họ Tên
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mật Khẩu
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Số Điện Thoại
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Giới Tính
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tình Trạng
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Chức Năng
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-100">
                        {dschusan.map((value, index) => {
                            return (
                                <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.ho_ten}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.email}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        ...
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.so_dien_thoai}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.gioi_tinh}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        <Button
                                            onClick={() => handleUpdateChuSan({ ...value, tinh_trang: !value.tinh_trang })}
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
                                                        Cập Nhật Chủ Sân
                                                    </DialogTitle>
                                                    <DialogDescription className="text-gray-600 text-sm">
                                                        Chỉnh sửa thông tin chi tiết và xác nhận thay đổi.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Họ Tên</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setChusan({
                                                                    ...chusan,
                                                                    ho_ten: e.target.value,
                                                                })
                                                            }
                                                            value={chusan.ho_ten}
                                                            placeholder="Nhập họ tên"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Email</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setChusan({
                                                                    ...chusan,
                                                                    email: e.target.value,
                                                                })
                                                            }
                                                            value={chusan.email}
                                                            type="email"
                                                            placeholder="Nhập email"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Mật Khẩu</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setChusan({
                                                                    ...chusan,
                                                                    mat_khau: e.target.value,
                                                                })
                                                            }
                                                            value={chusan.mat_khau}
                                                            placeholder="Nhập mật khẩu"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Số Điện Thoại</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setChusan({
                                                                    ...chusan,
                                                                    so_dien_thoai: e.target.value,
                                                                })
                                                            }
                                                            value={chusan.so_dien_thoai}
                                                            placeholder="Nhập số điện thoại"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Giới Tính</Label>
                                                        <Select
                                                            onValueChange={(value) =>
                                                                setChusan({
                                                                    ...chusan,
                                                                    gioi_tinh: value,
                                                                })
                                                            }
                                                            value={chusan.gioi_tinh}
                                                        >
                                                            <SelectTrigger className="w-[100%]">
                                                                <SelectValue placeholder="Giới Tính" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Nam">Nam</SelectItem>
                                                                <SelectItem value="Nữ">Nữ</SelectItem>
                                                            </SelectContent>
                                                        </Select>
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
                                                            onClick={() => handleUpdateChuSan(chusan)}
                                                            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200 text-sm shadow-custom-xs"
                                                        >
                                                            Cập Nhật
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <FontAwesomeIcon className="text-red-400 cursor-pointer" icon={faTrash} />
                                            </DialogTrigger>
                                            <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Xóa</DialogTitle>
                                                    <DialogDescription>Xóa dữ liệu ở đây. Click xác nhận để xóa dữ liệu</DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button className="cursor-pointer" variant="outline">
                                                            Hủy
                                                        </Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button
                                                            onClick={() => handleDeleteChuSan(value.id)}
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

export default QuanLyChuSan;
