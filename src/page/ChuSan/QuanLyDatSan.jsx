import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pageSlice from '../../redux/pageSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from 'react-hot-toast';
import { dataSanChuSanOpen, dataSanOpen } from '@/redux/sanSlice';
import { dataDatSan } from '@/redux/chuSanSlice';
import { dataViTriSanNhanVien } from '@/redux/viTriSanSlice';

const QuanLyDatSan = () => {
    const dispatch = useDispatch();
    const [selectedSan, setSelectedSan] = useState(null);
    useEffect(() => {
        dispatch(pageSlice.actions.setName('Quản Lý Đặt Sân'));
    }, []);
    
    const dsdatsan = useSelector((state) => state.nhanvien.datsan) || [];
    const dssan = useSelector((state) => state.san.san);
    console.log('datsan', dsdatsan);
    
   
    const [timKiem, setTimKiem] = useState('');
    console.log(timKiem);
    useEffect(() => {
        dispatch(dataSanChuSanOpen());
        dispatch(dataDatSan());
        dispatch(dataViTriSanNhanVien());
    }, []);

   
    return (
        <div className="flex-1 bg-white rounded-xl shadow-custom-light p-6 md:p-8 border border-gray-100 min-h-[calc(100vh-64px-2rem-1.5rem)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Danh sách đặt sân</h3>
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
                <div className="flex gap-2">
                    <Label className="text-lg" >
                        Tìm Kiếm
                    </Label>
                    <Input value={timKiem} onChange={(e) => setTimKiem(e.target.value)} className="w-40" />
                </div>      
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table className="min-w-full divide-y divide-gray-100">
                    <TableHeader>
                        <TableRow className="bg-gray-300">
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Họ Tên
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Số Điện Thoại
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Giờ Đặt
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Ngày Đặt
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mã Đặt
                            </TableHead>
                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thành Tiền
                            </TableHead>
                            
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dsdatsan
                            .filter(item => (selectedSan === null ? item : item.id_san === selectedSan))
                            .filter((item) => {
                                if (!timKiem) return true;
                                return item.so_dien_thoai.includes(timKiem) || item.ho_ten.includes(timKiem);
                            })
                            .map((value, index) => {
                                return (
                                    <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.ho_ten}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.so_dien_thoai}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.gio_dat}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.ngay_dat.substring(0, 10)}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.orderCode}
                                        </TableCell>
                                        <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                            {value.thanh_tien}
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

export default QuanLyDatSan;
