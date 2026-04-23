import { dataSanOpen } from '@/redux/sanSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dataMonChoi } from '@/redux/monChoiSlice';
const DanhSachSan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const datasan = useSelector((state) => state.san.san_open);
    const location = useLocation();
    const state = location.state || {};
    const dsmonchoi = useSelector((state) => state.monchoi.monchoi);

    const [selectedMonChoi, setSelectedMonChoi] = useState(state.ten_mon || '');
    const [selectedThanhPho, setSelectedThanhPho] = useState(state.thanh_pho || '');
    const [selectedQuan, setSelectedQuan] = useState(state.quan || '');
    useEffect(() => {
        dispatch(dataMonChoi());
        dispatch(dataSanOpen());
    }, []);
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
    const handleBooking = (time, name) => {
        navigate(`/booking?value=${encodeURIComponent(name)}&time=${time}`);
    };

    const viewDetails = (value) => {
        navigate(`/map`, { state: { kinh_do: value.kinh_do, vi_do: value.vi_do, id: value.id } });
    };
    const handleClear = () => {
        setSelectedMonChoi(null);
        setSelectedQuan(null);
        setSelectedThanhPho(null);
    };
    return (
        <div className="font-[Inter] bg-green-50 min-h-screen flex flex-col justify-between">
            <header className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-8 py-5 rounded-b-3xl flex justify-between items-center shadow-md">
                <div className="text-2xl font-extrabold tracking-wide">SânGo</div>
                <div className="text-sm font-medium">⚽ Tìm sân dễ, đá sân vui!</div>
            </header>
            <div className="flex justify-center my-10 px-6">
                <div className="text-black bg-white p-6 rounded-xl shadow-md flex flex-wrap gap-4 items-center justify-center transition-transform">
                    <Select onValueChange={(value) => setSelectedThanhPho(value)}>
                        <SelectTrigger className="w-[180px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400">
                            <SelectValue placeholder="Thành Phố" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={1000} value={null} className="text-[#266107]">
                                Tất Cả
                            </SelectItem>
                            {tp.map((value, index) => (
                                <SelectItem key={index} value={value.name} className="text-[#266107]">
                                    {value.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setSelectedQuan(value)}>
                        <SelectTrigger className="w-[180px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400">
                            <SelectValue placeholder="Quận" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={1000} value={null} className="text-[#266107]">
                                Tất Cả
                            </SelectItem>
                            {tp
                                .find((value) => value.name === selectedThanhPho)
                                ?.districts.map((value, index) => {
                                    return (
                                        <SelectItem key={index} value={value.name}>
                                            {value.name}
                                        </SelectItem>
                                    );
                                })}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setSelectedMonChoi(value)}>
                        <SelectTrigger className="w-[180px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400">
                            <SelectValue placeholder="Môn Chơi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={1000} value={null} className="text-[#266107]">
                                Tất Cả
                            </SelectItem>
                            {dsmonchoi.map((value, index) => {
                                return (
                                    <SelectItem key={index} className="text-[#266107]" value={value.ten_mon}>
                                        {value.ten_mon}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 pb-12">
                {datasan
                    .filter(
                        (item) =>
                            (!selectedMonChoi || item.loai_san === selectedMonChoi) &&
                            (!selectedThanhPho || item.thanh_pho === selectedThanhPho) &&
                            (!selectedQuan || item.huyen === selectedQuan)
                    )
                    .map((value, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                        >
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/images/${value.hinh_anh}`}
                                alt={value.ten_san}
                                className="w-full h-[150px] object-cover"
                            />
                            <div className="p-4 relative">
                                <h3 className="text-lg font-bold text-emerald-700 flex items-center gap-2">🎯 {value.ten_san}</h3>
                                <div className="flex items-center gap-1 mb-1 mt-1 text-yellow-400 text-sm">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(value.rating || 4) ? 'fill-yellow-400' : 'fill-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.912c.969 0 1.371 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.974-2.89a1 1 0 00-1.175 0l-3.974 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.083 10.1c-.783-.57-.38-1.81.588-1.81h4.912a1 1 0 00.95-.69l1.518-4.674z" />
                                        </svg>
                                    ))}
                                    <span className="text-gray-600 ml-2">
                                        {value.rating || 4.3} ({value.reviews || 123} đánh giá)
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">
                                    {value.dia_chi_cu_the}, {value.huyen}, {value.thanh_pho}
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => viewDetails(value)}
                                        className="mt-2 cursor-pointer text-sm bg-emerald-500 text-white px-4 py-1.5 rounded-md hover:bg-emerald-600 transition"
                                    >
                                        Xem chi tiết
                                    </button>
                                    <button
                                        onClick={() => navigate(`/dat-san/${value.id}`)}
                                        className="mt-2 cursor-pointer text-sm bg-emerald-500 text-white px-4 py-1.5 rounded-md hover:bg-emerald-600 transition"
                                    >
                                        Đặt Ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Footer */}
            <footer className="bg-emerald-600 text-white text-center py-6 mt-auto shadow-inner">
                <p className="text-sm">© 2025 SânGo. Đặt sân thông minh, dễ dàng và uy tín.</p>
            </footer>
        </div>
    );
};

export default DanhSachSan;
