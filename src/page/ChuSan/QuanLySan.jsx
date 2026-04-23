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
import { Textarea } from '@/components/ui/textarea';
import { capNhatSan, dataSan, themSan, xoaSan } from '@/redux/sanSlice';
import { Link } from 'react-router-dom';
import { dataMonChoi } from '@/redux/monChoiSlice';
import toast, { Toaster } from 'react-hot-toast';

const QuanLySan = () => {
    const tp = [
        {
            name: 'Hà Nội',
            districts: [
                { name: 'Ba Đình' },
                { name: 'Hoàn Kiếm' },
                { name: 'Đống Đa' },
                { name: 'Cầu Giấy' },
                { name: 'Thanh Xuân' },
                { name: 'Hà Đông' },
                { name: 'Nam Từ Liêm' },
                { name: 'Bắc Từ Liêm' },
            ],
        },
        {
            name: 'Hồ Chí Minh',
            districts: [
                { name: 'Quận 1' },
                { name: 'Quận 3' },
                { name: 'Quận 5' },
                { name: 'Quận 7' },
                { name: 'Quận 10' },
                { name: 'Bình Thạnh' },
                { name: 'Gò Vấp' },
                { name: 'Thủ Đức' },
            ],
        },
        {
            name: 'Đà Nẵng',
            districts: [
                { name: 'Hải Châu' },
                { name: 'Thanh Khê' },
                { name: 'Sơn Trà' },
                { name: 'Ngũ Hành Sơn' },
                { name: 'Liên Chiểu' },
                { name: 'Cẩm Lệ' },
                { name: 'Hòa Vang' },
            ],
        },
        {
            name: 'Cần Thơ',
            districts: [{ name: 'Ninh Kiều' }, { name: 'Bình Thủy' }, { name: 'Cái Răng' }, { name: 'Thốt Nốt' }, { name: 'Phong Điền' }],
        },
        {
            name: 'Hải Phòng',
            districts: [
                { name: 'Hồng Bàng' },
                { name: 'Ngô Quyền' },
                { name: 'Lê Chân' },
                { name: 'Kiến An' },
                { name: 'Đồ Sơn' },
                { name: 'Thủy Nguyên' },
            ],
        },
    ];
    const defaultSan = {
        ten_san: '',
        loai_san: '',
        thanh_pho: '',
        huyen: '',
        dia_chi_cu_the: '',
        gio_mo_cua: '',
        gio_dong_cua: '',
        mo_ta: '',
        hinh_anh: '',
        kinh_do: '',
        vi_do: '',
        tinh_trang: '',
    };
    const [thanhpho, setThanhPho] = useState('');
    const [san, setSan] = useState(defaultSan);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(pageSlice.actions.setName('Quản Lý Sân'));
    }, []);
    const dssan = useSelector((state) => state.san.san);
    const dsmonchoi = useSelector((state) => state.monchoi.monchoi);

    const handleAddSan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in san) {
            if (key === 'hinh_anh') formData.append('hinh_anh', san[key]);
            else formData.append(key, san[key]);
        }
        const result = await dispatch(themSan(formData));
        if (themSan.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setOpen(false);
        } else {
            toast.error(result.payload.message || 'Thêm mới thất bại');
        }
    };

    const handleUpdateSan = async (payload) => {
        const formData = new FormData();
        for (const key in payload) {
            if (key === 'hinh_anh') formData.append('hinh_anh', payload[key]);
            else formData.append(key, payload[key]);
        }
        const result = await dispatch(capNhatSan(formData));
        if (capNhatSan.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message || 'Cập Nhật thất bại');
        }
    };
    const handleDeleteSan = async (id) => {
        const result = await dispatch(xoaSan(id));
        if (xoaSan.fulfilled.match(result)) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload || 'Xóa thất bại');
        }
    };
    useEffect(() => {
        dispatch(dataSan());
        dispatch(dataMonChoi());
    }, []);
    const handleEditClick = (value) => {
        setSan({
            ten_san: value.ten_san,
            loai_san: value.loai_san,
            thanh_pho: value.thanh_pho,
            huyen: value.huyen,
            dia_chi_cu_the: value.dia_chi_cu_the,
            gio_mo_cua: value.gio_mo_cua,
            gio_dong_cua: value.gio_dong_cua,
            mo_ta: value.mo_ta,
            hinh_anh: value.hinh_anh,
            kinh_do: value.kinh_do,
            vi_do: value.vi_do,
            id: value.id,
            tinh_trang: value.tinh_trang,
        });
        console.log(value);
    };
    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách các sân thể thao</h3>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setSan(defaultSan)}
                            className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-md shadow-custom-xs hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            Thêm Sân Thể Thao
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        showCloseButton={false}
                        className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100 h-[85%] overflow-auto"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Thêm Mới Sân Thể Thao</DialogTitle>
                            <DialogDescription className="text-gray-600 text-sm">
                                Điền đầy đủ thông tin chi tiết về sân thể thao mới.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="grid gap-4 py-4" onSubmit={handleAddSan}>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Tên Sân</Label>
                                <Input
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            ten_san: e.target.value,
                                        })
                                    }
                                    value={san.ten_san}
                                    placeholder="Nhập tên sân"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Môn Chơi</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setSan({
                                            ...san,
                                            loai_san: value,
                                        })
                                    }
                                    value={san.loai_san}
                                    required
                                >
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Môn Chơi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dsmonchoi.map((value, index) => {
                                            return (
                                                <SelectItem key={index} value={value.ten_mon}>
                                                    {value.ten_mon}
                                                </SelectItem>
                                            );
                                        })}
                                        <SelectItem key={2000} value="Phức Hợp">
                                            Phức Hợp
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Thành Phố</Label>
                                <Select
                                    onValueChange={(value) =>
                                        setSan({
                                            ...san,
                                            thanh_pho: value,
                                        })
                                    }
                                    value={san.thanh_pho}
                                    required
                                >
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Thành Phố" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tp.map((value, index) => {
                                            return (
                                                <SelectItem key={index} value={value.name}>
                                                    {value.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Huyện</Label>
                                <Select onValueChange={(value) => setSan({ ...san, huyen: value })} value={san.huyen} required>
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Huyện" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tp
                                            .find((value) => value.name === san.thanh_pho)
                                            ?.districts.map((value, index) => {
                                                return (
                                                    <SelectItem key={index} value={value.name}>
                                                        {value.name}
                                                    </SelectItem>
                                                );
                                            })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Địa Chỉ Cụ Thể</Label>
                                <Input
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            dia_chi_cu_the: e.target.value,
                                        })
                                    }
                                    value={san.dia_chi_cu_the}
                                    placeholder="Nhập địa chỉ"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Giờ Mở Cửa</Label>
                                <Input
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            gio_mo_cua: e.target.value,
                                        })
                                    }
                                    type="time"
                                    value={san.gio_mo_cua}
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Giờ Đóng Cửa</Label>
                                <Input
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            gio_dong_cua: e.target.value,
                                        })
                                    }
                                    type="time"
                                    value={san.gio_dong_cua}
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Mô Tả</Label>
                                <Textarea
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            mo_ta: e.target.value,
                                        })
                                    }
                                    type=""
                                    value={san.mo_ta}
                                    placeholder="Nhập mô tả"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Hình Ảnh</Label>
                                <Input
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            hinh_anh: e.target.files[0],
                                        })
                                    }
                                    type="file"
                                    placeholder=""
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Kinh Độ</Label>
                                <Input
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            kinh_do: e.target.value,
                                        })
                                    }
                                    value={san.kinh_do}
                                    placeholder="Nhập kinh độ"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-700">Vĩ Độ</Label>
                                <Input
                                    onChange={(e) =>
                                        setSan({
                                            ...san,
                                            vi_do: e.target.value,
                                        })
                                    }
                                    value={san.vi_do}
                                    placeholder="Nhập vĩ độ"
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
            <div className="overflow-auto rounded-lg border border-gray-200">
                <Table className="min-w-full divide-y divide-gray-100">
                    <TableHeader>
                        <TableRow className="bg-gray-300">
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                #
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Tên Sân
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Loại Sân
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thành Phố
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Huyện
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Địa Chỉ Cụ Thể
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Giờ Mở Cửa
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Giờ Đóng Cửa
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mô Tả
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Hình Ảnh
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Kinh Độ
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Vĩ Độ
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
                        {dssan.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.ten_san}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.loai_san}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.thanh_pho}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.huyen}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.dia_chi_cu_the}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.gio_mo_cua}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.gio_dong_cua}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.mo_ta}
                                    </TableCell>

                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        <Dialog className="max-ưư">
                                            <DialogTrigger>
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/uploads/images/${value.hinh_anh}`}
                                                    className="w-30 h-15 cursor-pointer hover:scale-115"
                                                    alt=""
                                                />
                                            </DialogTrigger>
                                            <DialogContent
                                                showCloseButton={false}
                                                className="sm:max-w-[750px] max-h-[750px] bg-amber-200/0 border-none shadow-none p-0"
                                            >
                                                <DialogHeader>
                                                    <DialogDescription>
                                                        <img
                                                            src={`${import.meta.env.VITE_API_URL}/uploads/images/${value.hinh_anh}`}
                                                            className="w-full h-full shadow-2xl"
                                                            alt=""
                                                        />
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.kinh_do}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        {value.vi_do}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                        <Button
                                            onClick={() => {
                                                handleUpdateSan({ ...value, tinh_trang: !value.tinh_trang });
                                            }}
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
                                                className="max-w-md p-6 bg-white rounded-xl shadow-custom-md border border-gray-100 h-[85%] overflow-auto"
                                            >
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
                                                        Cập Nhật Sân Thể Thao
                                                    </DialogTitle>
                                                    <DialogDescription className="text-gray-600 text-sm">
                                                        Chỉnh sửa thông tin chi tiết và xác nhận thay đổi.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Tên Sân</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    ten_san: e.target.value,
                                                                })
                                                            }
                                                            value={san.ten_san}
                                                            placeholder="Nhập tên sân"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Môn Chơi</Label>
                                                        <Select
                                                            onValueChange={(value) =>
                                                                setSan({
                                                                    ...san,
                                                                    loai_san: value,
                                                                })
                                                            }
                                                            value={san.loai_san}
                                                        >
                                                            <SelectTrigger className="w-[100%]">
                                                                <SelectValue placeholder="Môn Chơi" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {dsmonchoi.map((value, index) => {
                                                                    return (
                                                                        <SelectItem key={index} value={value.ten_mon}>
                                                                            {value.ten_mon}
                                                                        </SelectItem>
                                                                    );
                                                                })}
                                                                <SelectItem key={2000} value="Phức Hợp">
                                                                    Phức Hợp
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Thành Phố</Label>
                                                        <Select
                                                            onValueChange={(value) =>
                                                                setSan({
                                                                    ...san,
                                                                    thanh_pho: value,
                                                                })
                                                            }
                                                            value={san.thanh_pho}
                                                        >
                                                            <SelectTrigger className="w-[100%]">
                                                                <SelectValue placeholder="Thành Phố" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {tp.map((value, index) => {
                                                                    return (
                                                                        <SelectItem key={index} value={value.name}>
                                                                            {value.name}
                                                                        </SelectItem>
                                                                    );
                                                                })}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Huyện</Label>
                                                        <Select
                                                            onValueChange={(value) => setSan({ ...san, huyen: value })}
                                                            defaultValue={san.huyen}
                                                        >
                                                            <SelectTrigger className="w-[100%]">
                                                                <SelectValue placeholder="Huyện" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {tp
                                                                    .find((value) => value.name === san.thanh_pho)
                                                                    ?.districts.map((value, index) => {
                                                                        return (
                                                                            <SelectItem key={index} value={value.name}>
                                                                                {value.name}
                                                                            </SelectItem>
                                                                        );
                                                                    })}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Địa Chỉ Cụ Thể</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    dia_chi_cu_the: e.target.value,
                                                                })
                                                            }
                                                            value={san.dia_chi_cu_the}
                                                            placeholder="Nhập mật khẩu"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Giờ Mở Cửa</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    gio_mo_cua: e.target.value,
                                                                })
                                                            }
                                                            type="time"
                                                            value={san.gio_mo_cua}
                                                            placeholder="Nhập mật khẩu"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Giờ Đóng Cửa</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    gio_dong_cua: e.target.value,
                                                                })
                                                            }
                                                            type="time"
                                                            value={san.gio_dong_cua}
                                                            placeholder="Nhập mật khẩu"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Mô Tả</Label>
                                                        <Textarea
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    mo_ta: e.target.value,
                                                                })
                                                            }
                                                            type=""
                                                            value={san.mo_ta}
                                                            placeholder="Nhập mô tả"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Hình Ảnh</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    hinh_anh: e.target.files[0],
                                                                })
                                                            }
                                                            type="file"
                                                            placeholder="Nhập mật khẩu"
                                                        />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Kinh Độ</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    kinh_do: e.target.value,
                                                                })
                                                            }
                                                            value={san.kinh_do}
                                                            placeholder="Nhập kinh độ"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-sm font-medium text-gray-700">Vĩ Độ</Label>
                                                        <Input
                                                            onChange={(e) =>
                                                                setSan({
                                                                    ...san,
                                                                    vi_do: e.target.value,
                                                                })
                                                            }
                                                            value={san.vi_do}
                                                            placeholder="Nhập vĩ độ"
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
                                                            onClick={() => handleUpdateSan(san)}
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
                                                    <DialogTitle className="text-xl font-bold text-gray-800 mb-2">Xác Nhận Xóa</DialogTitle>
                                                    <DialogDescription className="text-gray-600 text-sm">
                                                        Bạn có chắc chắn muốn xóa môn chơi "
                                                        <span className="font-semibold text-gray-800">{value.ten_mon}</span>" không?
                                                        <br />
                                                        Hành động này <strong className="text-red-600">không thể hoàn tác</strong>.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <DialogClose asChild>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="px-4 py-2 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition duration-200 text-sm font-medium"
                                                            >
                                                                Hủy bỏ
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button
                                                            onClick={() => handleDeleteSan(value.id)}
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

export default QuanLySan;
