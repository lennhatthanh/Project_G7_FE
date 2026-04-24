import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { data, useNavigate, useParams } from 'react-router-dom';
import { dataChiTietSan } from '@/redux/sanSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThanhToan } from '@/redux/datSanSlice';
import toast, { Toaster } from 'react-hot-toast';
import { kiemTraNguoiDung } from '@/redux/nguoiDungSlice';
import { dataDichVuOpenId } from '@/redux/dichVuSlice';
import { kiemTraMaGiamGia } from '@/redux/maGiamGiaSlice';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const DatSan = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [nguoiDung, setNguoiDung] = useState(null);
    console.log('nd', nguoiDung);

    const [isActive, setIsActive] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
    const navigate = useNavigate();
    console.log('Test', selectedDate > new Date().toLocaleDateString('en-CA'));

    console.log(new Date().getHours());
    console.log(new Date().getHours() > Number('12:00'.split(':')[0]));

    const [selectedCourt, setSelectedCourt] = useState(null);
    const [selectedTime, setSelectedTime] = useState([]);
    const [maGiamGia, setMaGiamGia] = useState('');
    const [activeTab, setActiveTab] = useState('book');
    const [giaTriGiam, setGiaTriGiam] = useState(0);
    const dssan = useSelector((state) => state.san.san_chi_tiet);
    const dsdatsan = useSelector((state) => state.san.san_dat_san);
    const dsdichvu = useSelector((state) => state.dichvu.dichvuopenbyid);
    const [datsan, setDatSan] = useState([]);
    const prevSelectedSanRef = useRef(null);

    useEffect(() => {
        dispatch(dataDichVuOpenId(id));
    }, []);
    const kiemTraMa = async () => {
        const result = await dispatch(kiemTraMaGiamGia({ magiamgia: maGiamGia, id_san: id }));
        if (kiemTraMaGiamGia.fulfilled.match(result)) {
            if (Object.keys(result.payload).length !== 0) {
                setGiaTriGiam(result.payload.data.gia_tri_giam);
                toast.success('Áp mã thành công');
                console.log(giaTriGiam);
                setMaGiamGia('');
            } else {
                toast.error('Mã đã hết hạn hoặc không tồn tại');
            }
        } else {
            toast.error(result.payload.message);
        }
    };
    const monChoiUnique = dssan
        .filter((item, index, self) => index === self.findIndex((t) => t.id_mon_choi === item.id_mon_choi))
        .map((item) => ({ id_mon_choi: item.id_mon_choi, ten_mon: item.ten_mon }));
    const [selectedSan, setSelectedSan] = useState(null);
    const [allOperatingHours, setAllOperatingHours] = useState([]);
    useEffect(() => {
        const handleCheckNguoiDung = async () => {
            const result = await dispatch(kiemTraNguoiDung());
            if (kiemTraNguoiDung.fulfilled.match(result)) {
                setNguoiDung(result.payload.data);
                setIsActive(true);
            } else {
                setNguoiDung(null);
                setIsActive(false);
            }
        };
        handleCheckNguoiDung();
    }, []);
    useEffect(() => {
        if (dssan.length > 0) {
            const monChoiUnique = dssan
                .filter((item, index, self) => index === self.findIndex((t) => t.id_mon_choi === item.id_mon_choi))
                .map((item) => ({ id_mon_choi: item.id_mon_choi, ten_mon: item.ten_mon }));
            setSelectedGame(monChoiUnique[0].id_mon_choi);
        }
        if (dssan[0]?.gio_mo_cua && dssan[0]?.gio_dong_cua) {
            const startHour = parseInt(dssan[0].gio_mo_cua.split(':')[0]);
            const endHour = parseInt(dssan[0].gio_dong_cua.split(':')[0]);

            const hours = [];
            for (let i = startHour; i < endHour; i++) {
                hours.push(`${i < 10 ? '0' : ''}${i}:00`);
            }

            setAllOperatingHours(hours);
        }
        const newdata = dssan.filter((item) => item.id_mon_choi === monChoiUnique[0].id_mon_choi) || [];

        if (newdata.length > 0) {
            setSelectedSan(newdata[0].id);
        }
    }, [dssan]);
    const result = [];

    dsdatsan.forEach((item) => {
        const ngay = item.ngay_dat.split('T')[0];
        const key = `${item.so_san}-${ngay}`;

        const existing = result.find((i) => i.so_san === item.so_san && i.ngay === ngay);

        if (existing) {
            existing.gio_dat.push(item.gio_dat);
        } else {
            result.push({
                so_san: item.so_san,
                gia_san: item.gia_san,
                mo_ta: item.mo_ta,
                ten_mon: item.ten_mon,
                id_mon_choi: item.id_mon_choi,
                id: item.id,
                ngay: ngay,
                gio_dat: [item.gio_dat],
            });
        }
    });
    const tongTienTatCaSan = datsan.reduce((total, dat) => {
        const san = dssan.find((s) => s.id === dat.id_vi_tri_dat_san);
        const giaSan = Number(san?.gia_san || 0);
        return total + giaSan * dat.gio_dat.length;
    }, 0);
    useEffect(() => {
        dispatch(dataChiTietSan(id));
    }, [dispatch, id]);
    useEffect(() => {
        const prevSelectedSan = prevSelectedSanRef.current;
        const chon = result.filter((item) => item.id === selectedSan && item.id_mon_choi === selectedGame && item.ngay === selectedDate);
        setSelectedCourt(chon[0]);
        if (selectedTime.length > 0 && !datsan.some((item) => item.id_vi_tri_dat_san === prevSelectedSan)) {
            setDatSan([...datsan, { ngay_dat: selectedDate, id_vi_tri_dat_san: prevSelectedSan, gio_dat: selectedTime }]);
        }
        setSelectedTime([]);
        prevSelectedSanRef.current = selectedSan;
    }, [selectedDate, selectedGame, selectedSan]);
    console.log(datsan);
    useEffect(() => {
        setDatSan([]);
    }, [selectedDate]);
    const handleBookNow = async () => {
        console.log('Test', selectedDate, selectedTime, selectedSan);
    };

    const handleThanhToan = async () => {
        let giasan = 0;
        if (giaTriGiam === 0) {
            giasan = tongTienTatCaSan;
        } else if (giaTriGiam > 100) {
            giasan = tongTienTatCaSan - giaTriGiam;
        } else {
            giasan = (tongTienTatCaSan * (100 - giaTriGiam)) / 100;
        }
        try {
            const updated = datsan.map((item) => ({
                ...item,
                id_san: id,
                gia_san: giasan,
                gia_san_cu_the: dssan.find((value) => value.id === item.id_vi_tri_dat_san).gia_san,
                ...nguoiDung,
            }));
            const action = await dispatch(ThanhToan(updated));
            if (ThanhToan.fulfilled.match(action)) {
                toast.success('Đang chuyển đến trang chuyển tiền!');
                setTimeout(() => {
                    const checkoutUrl = action.payload;
                    window.location.href = checkoutUrl;
                }, 1000);
            } else {
                toast.error(action.payload || 'Không thể tạo thanh toán');
            }
        } catch (err) {
            toast.error('Lỗi không xác định khi thanh toán');
        }
    };

    return dssan.length > 0 ? (
        <div className="font-sans bg-gray-50 text-gray-800 min-h-screen relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-0 left-0 z-20 bg-white/90 rounded-br-4xl cursor-pointer hover:scale-110 shadow-md w-12 h-12 flex items-center justify-center text-green-600 hover:bg-green-100 transition"
            >
                <FontAwesomeIcon className="text-2xl" icon={faArrowLeft} />
            </button>
            <div className="relative h-40 w-full overflow-hidden shadow-xl">
                <img
                    src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/06/hinh-nen-bong-da-thumb.jpg"
                    alt="Sân bóng đá"
                    className="h-full w-full object-cover object-center transform scale-105 transition-transform duration-500 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <h1 className="text-white text-5xl font-extrabold drop-shadow-lg mb-2">{dssan[0].ten_san}</h1>
                    <p className="text-white/90 text-lg">{dssan[0].dia_chi_cu_the + ', ' + dssan[0].huyen + ', ' + dssan[0].thanh_pho}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-center border-b border-gray-200 mb-8 sticky top-0 bg-gray-50 z-10 py-4">
                    <button
                        onClick={() => setActiveTab('book')}
                        className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
                            activeTab === 'book' ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-gray-600 hover:text-emerald-700'
                        }`}
                    >
                        Đặt giờ sân & Dịch vụ
                    </button>
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`ml-8 px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
                            activeTab === 'details'
                                ? 'text-emerald-700 border-b-2 border-emerald-700'
                                : 'text-gray-600 hover:text-emerald-700'
                        }`}
                    >
                        Chi tiết sân
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews_map')}
                        className={`ml-8 px-6 py-3 text-lg font-semibold transition-colors duration-200 ${
                            activeTab === 'reviews_map'
                                ? 'text-emerald-700 border-b-2 border-emerald-700'
                                : 'text-gray-600 hover:text-emerald-700'
                        }`}
                    >
                        Đánh giá & Bản đồ
                    </button>
                </div>

                {activeTab === 'book' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex flex-col w-full lg:w-1/3 gap-8">
                            <section className="bg-white rounded-3xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tùy chọn đặt sân</h2>
                                <div className="flex flex-col gap-4 mb-6">
                                    <div>
                                        <Label htmlFor="game-select" className="block text-gray-700 text-sm font-medium mb-2">
                                            Chọn môn thể thao
                                        </Label>
                                        <Select
                                            value={selectedGame}
                                            onValueChange={(e) => {
                                                setSelectedGame(e);
                                                setSelectedSan(dssan.filter((item) => item.id_mon_choi === e)[0].id);
                                            }}
                                            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Sân Thể Thao" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {monChoiUnique.map((value, index) => (
                                                    <SelectItem key={index} value={value.id_mon_choi}>
                                                        {value.ten_mon}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="date-select" className="block text-gray-700 text-sm font-medium mb-2">
                                            Chọn ngày
                                        </Label>
                                        <input
                                            id="date-select"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toLocaleDateString('en-CA')}
                                            className="w-full border border-gray-300 rounded-xl px-2 py-2 text-base"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white rounded-3xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-emerald-600 mb-6">Tiện ích & Dịch vụ</h2>
                                <div className="flex flex-wrap gap-3 text-sm">
                                    {dsdichvu.length > 0 ? (
                                        dsdichvu.map((value, index) => (
                                            <span
                                                key={index}
                                                className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-all"
                                            >
                                                {value.ten_dich_vu}
                                            </span>
                                        ))
                                    ) : (
                                        <div> Không có dịch vụ!</div>
                                    )}
                                </div>
                            </section>
                        </div>

                        <div className="flex flex-col w-full lg:w-2/3">
                            <section className="bg-white rounded-3xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Chọn Sân</h2>
                                <label htmlFor="court-select" className="block text-gray-700 text-sm font-medium mb-2">
                                    Chọn sân cụ thể
                                </label>
                                <Select
                                    value={selectedSan}
                                    onValueChange={(value) => setSelectedSan(value)}
                                    className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sân Thể Thao" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dssan
                                            .filter((item) => item.id_mon_choi === selectedGame)
                                            .map((san, index) => (
                                                <SelectItem key={index} value={san.id}>
                                                    Sân số {san.so_san}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                {selectedCourt ? (
                                    <div className="bg-white border border-gray-200 mt-5 rounded-2xl p-6 flex flex-col shadow-sm">
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-4">
                                            {allOperatingHours.map((time) => {
                                                const isBooked =
                                                    selectedCourt.gio_dat.includes(time + ':00') ||
                                                    (selectedDate <= new Date().toLocaleDateString('en-CA') &&
                                                        new Date().getHours() >= Number(time.split(':')[0]));
                                                const san = datsan.find((item) => item.id_vi_tri_dat_san === selectedSan);
                                                const selectedTimeOfSan = san?.gio_dat ?? selectedTime;
                                                const isSelected = selectedTimeOfSan.includes(time);
                                                return (
                                                    <button
                                                        key={time}
                                                        onClick={() => {
                                                            setGiaTriGiam(0);

                                                            const updatedTimes = selectedTimeOfSan.includes(time)
                                                                ? selectedTimeOfSan.filter((t) => t !== time)
                                                                : [...selectedTimeOfSan, time];

                                                            setSelectedTime(updatedTimes);

                                                            setDatSan((prev) => {
                                                                const index = prev.findIndex(
                                                                    (item) => item.id_vi_tri_dat_san === selectedSan
                                                                );

                                                                if (index !== -1) {
                                                                    if (updatedTimes.length === 0) {
                                                                        return prev.filter(
                                                                            (item) => item.id_vi_tri_dat_san !== selectedSan
                                                                        );
                                                                    } else {
                                                                        const clone = [...prev];
                                                                        clone[index] = {
                                                                            ...clone[index],
                                                                            gio_dat: updatedTimes,
                                                                        };
                                                                        return clone;
                                                                    }
                                                                } else {
                                                                    if (updatedTimes.length === 0) return prev;
                                                                    return [
                                                                        ...prev,
                                                                        {
                                                                            ngay_dat: selectedDate,
                                                                            id_vi_tri_dat_san: selectedSan,
                                                                            gio_dat: updatedTimes,
                                                                        },
                                                                    ];
                                                                }
                                                            });
                                                        }}
                                                        disabled={isBooked}
                                                        className={`
                              flex flex-col items-center justify-center
                              p-3 border rounded-md text-sm font-medium
                              transition-all duration-200 ease-in-out
                              ${
                                  isSelected
                                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                      : isBooked
                                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70'
                                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                              }
                            `}
                                                    >
                                                        <span className="font-semibold">{time}</span>
                                                        {isBooked ? (
                                                            <span className="text-xs mt-1">Đã đặt</span>
                                                        ) : (
                                                            <span className="text-xs mt-1">Trống</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white border border-gray-200 mt-5 rounded-2xl p-6 flex flex-col shadow-sm">
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 mb-4">
                                            {allOperatingHours.map((time) => {
                                                const isBooked =
                                                    false ||
                                                    (selectedDate <= new Date().toLocaleDateString('en-CA') &&
                                                        new Date().getHours() >= Number(time.split(':')[0]));
                                                const san = datsan.find((item) => item.id_vi_tri_dat_san === selectedSan);
                                                const selectedTimeOfSan = san?.gio_dat ?? selectedTime;
                                                const isSelected = selectedTimeOfSan.includes(time);
                                                return (
                                                    <button
                                                        key={time}
                                                        onClick={() => {
                                                            setGiaTriGiam(0);

                                                            const updatedTimes = selectedTimeOfSan.includes(time)
                                                                ? selectedTimeOfSan.filter((t) => t !== time)
                                                                : [...selectedTimeOfSan, time];

                                                            setSelectedTime(updatedTimes);

                                                            setDatSan((prev) => {
                                                                const index = prev.findIndex(
                                                                    (item) => item.id_vi_tri_dat_san === selectedSan
                                                                );

                                                                if (index !== -1) {
                                                                    if (updatedTimes.length === 0) {
                                                                        return prev.filter(
                                                                            (item) => item.id_vi_tri_dat_san !== selectedSan
                                                                        );
                                                                    } else {
                                                                        const clone = [...prev];
                                                                        clone[index] = {
                                                                            ...clone[index],
                                                                            gio_dat: updatedTimes,
                                                                        };
                                                                        return clone;
                                                                    }
                                                                } else {
                                                                    if (updatedTimes.length === 0) return prev;
                                                                    return [
                                                                        ...prev,
                                                                        {
                                                                            ngay_dat: selectedDate,
                                                                            id_vi_tri_dat_san: selectedSan,
                                                                            gio_dat: updatedTimes,
                                                                        },
                                                                    ];
                                                                }
                                                            });
                                                        }}
                                                        disabled={isBooked}
                                                        className={`
                              flex flex-col items-center justify-center
                              p-3 border rounded-md text-sm font-medium
                              transition-all duration-200 ease-in-out
                              ${
                                  isSelected
                                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                      : isBooked
                                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70'
                                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                              }
                            `}
                                                    >
                                                        <span className="font-semibold">{time}</span>
                                                        {isBooked ? (
                                                            <span className="text-xs mt-1">Đã đặt</span>
                                                        ) : (
                                                            <span className="text-xs mt-1">Trống</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </section>
                            <section className="bg-white rounded-3xl shadow-xl p-8 mt-5">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Giá Sân</h2>
                                <Table className="min-w-full divide-y divide-gray-100 w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-300">
                                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Tên Môn
                                            </TableHead>
                                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Số Sân
                                            </TableHead>
                                            <TableHead className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Giá Sân
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dssan.map((value, index) => (
                                            <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                                <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                                    {value.ten_mon}
                                                </TableCell>
                                                <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                                    {value.so_san}
                                                </TableCell>
                                                <TableCell className="px-6 py-3 whitespace-nowrap text-sm font-normal text-gray-800 text-center">
                                                    {typeof value.gia_san === 'number' ? value.gia_san.toLocaleString() + ' đ' : '0 đ'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </section>
                        </div>
                        <div className="flex flex-col w-full lg:w-1/3">
                            <section className="bg-white rounded-3xl shadow-xl p-8 text-base">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh Sách Đặt Sân</h2>
                                {selectedTime.length > 0 || datsan.length > 0 ? (
                                    <div className="text-end">
                                        {datsan.length > 0 ? (
                                            <div className="max-h-90 overflow-auto">
                                                {datsan
                                                    .slice()
                                                    .reverse()
                                                    .map((value, index) => {
                                                        return (
                                                            <>
                                                                <div className="min-h-5 w-[40%] mb-2 mt-2 flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">
                                                                    Sân số{' '}
                                                                    {dssan.find((item) => item.id === value.id_vi_tri_dat_san).so_san}
                                                                </div>
                                                                <div className="space-y-3 overflow-auto">
                                                                    {value.gio_dat.map((time, index) => (
                                                                        <div
                                                                            className="min-h-5 flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium"
                                                                            key={index}
                                                                        >
                                                                            <span>{time}</span>
                                                                            <button
                                                                                onClick={() => {
                                                                                    setDatSan((prev) => {
                                                                                        const updated = prev
                                                                                            .map((ds) => {
                                                                                                if (
                                                                                                    ds.id_vi_tri_dat_san ===
                                                                                                    value.id_vi_tri_dat_san
                                                                                                ) {
                                                                                                    const newTimes = ds.gio_dat.filter(
                                                                                                        (t) => t !== time
                                                                                                    );
                                                                                                    return newTimes.length > 0
                                                                                                        ? { ...ds, gio_dat: newTimes }
                                                                                                        : null;
                                                                                                }
                                                                                                return ds;
                                                                                            })
                                                                                            .filter(Boolean);

                                                                                        if (value.id_vi_tri_dat_san === selectedSan) {
                                                                                            const stillExists = updated.find(
                                                                                                (d) => d.id_vi_tri_dat_san === selectedSan
                                                                                            );
                                                                                            if (!stillExists) {
                                                                                                setSelectedTime([]);
                                                                                            }
                                                                                        }

                                                                                        return updated;
                                                                                    });
                                                                                }}
                                                                                className="text-red-500 hover:text-red-700 transition"
                                                                                title="Xoá giờ này"
                                                                            >
                                                                                ✕
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        );
                                                    })}
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <p className="text-sm text-gray-600 mt-4">
                                            Tổng giờ: {datsan.reduce((total, current) => current.gio_dat.length + total, 0)}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-4">Mã Giảm Giá</p>
                                        <div className="flex mt-3 gap-2">
                                            <Input value={maGiamGia} onChange={(e) => setMaGiamGia(e.target.value)} className=""></Input>
                                            <Button onClick={kiemTraMa} className="bg-emerald-600 hover:bg-emerald-700">
                                                Áp Dụng
                                            </Button>
                                        </div>
                                        <div className="text-sm text-gray-600 mt-4">
                                            {giaTriGiam === 0 ? (
                                                <></>
                                            ) : giaTriGiam > 100 ? (
                                                <div className="flex justify-between">
                                                    <div>Giảm Giá</div>
                                                    <div>{'-' + giaTriGiam.toLocaleString() + 'đ'}</div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between">
                                                    <div>Giảm Giá</div>
                                                    <div>
                                                        {(() => {
                                                            const giamGiaTien = (tongTienTatCaSan * giaTriGiam) / 100;
                                                            return '-' + giamGiaTien.toLocaleString() + ' đ';
                                                        })()}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <p>Tổng Tiền: </p>
                                                <div>{tongTienTatCaSan.toLocaleString() + 'đ'}</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>Thành Tiền: </div>
                                                <div>
                                                    {(() => {
                                                        if (giaTriGiam === 0) {
                                                            return tongTienTatCaSan.toLocaleString() + ' đ';
                                                        } else if (giaTriGiam > 100) {
                                                            return (tongTienTatCaSan - giaTriGiam).toLocaleString() + ' đ';
                                                        } else {
                                                            return ((tongTienTatCaSan * (100 - giaTriGiam)) / 100).toLocaleString() + ' đ';
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            className="bg-emerald-600 hover:bg-emerald-700 mt-3 cursor-pointer"
                                                            onClick={handleBookNow}
                                                            disabled={!selectedTime}
                                                        >
                                                            Đặt Ngay
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        {!isActive ? (
                                                            <div>
                                                                <DialogHeader>
                                                                    <DialogTitle>Xác Nhận Thông Tin</DialogTitle>
                                                                    <DialogDescription>
                                                                        Hãy kiểm tra lại thông tin trước khi chuyển khoản
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="grid gap-4 py-4">
                                                                    <div className="flex flex-col gap-4">
                                                                        <Label className="text-xl font-bold text-gray-700">Họ Tên: </Label>
                                                                        <Input
                                                                            value={nguoiDung?.ho_ten}
                                                                            onChange={(e) =>
                                                                                setNguoiDung({ ...nguoiDung, ho_ten: e.target.value })
                                                                            }
                                                                            className="text-xl font-medium text-gray-700"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-4">
                                                                        <Label className="text-xl font-bold text-gray-700">Email: </Label>
                                                                        <Input
                                                                            value={nguoiDung?.email}
                                                                            onChange={(e) =>
                                                                                setNguoiDung({ ...nguoiDung, email: e.target.value })
                                                                            }
                                                                            className="text-xl font-medium text-gray-700"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-4">
                                                                        <Label className="text-xl font-bold text-gray-700">
                                                                            Số Điện Thoại:{' '}
                                                                        </Label>
                                                                        <Input
                                                                            value={nguoiDung?.so_dien_thoai}
                                                                            onChange={(e) =>
                                                                                setNguoiDung({
                                                                                    ...nguoiDung,
                                                                                    so_dien_thoai: e.target.value,
                                                                                })
                                                                            }
                                                                            className="text-xl font-medium text-gray-700"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <DialogHeader>
                                                                    <DialogTitle>Xác Nhận Đặt Sân</DialogTitle>
                                                                    <DialogDescription>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-red-500">Lưu ý!</span>
                                                                            <span>- Chụp lại nội dung thanh toán để xác nhận</span>
                                                                            <span>- Hãy kiểm tra sân đã đặt trước khi chuyển khoản</span>
                                                                        </div>
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                            </div>
                                                        )}

                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Hủy</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button
                                                                    className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                                                                    onClick={() => handleThanhToan()}
                                                                >
                                                                    Thanh Toán
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-sm font-medium text-gray-500">Chưa chọn giờ đặt</div>
                                )}
                            </section>
                        </div>
                    </div>
                )}

                {activeTab === 'details' && (
                    <div className="max-w-3xl mx-auto">
                        <section className="bg-white rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chi tiết sân</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {dssan[0].ten_san} là địa điểm lý tưởng cho các trận đấu bóng đá 5-7 người. Với cỏ nhân tạo cao cấp, không
                                gian thoáng đãng và hệ thống chiếu sáng hiện đại, sân đảm bảo mang lại trải nghiệm tuyệt vời cho mọi buổi
                                tập luyện hoặc thi đấu giao hữu. Sân được trang bị đầy đủ tiện nghi, sẵn sàng phục vụ nhu cầu của bạn.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                                    <li>Thiết kế phù hợp cho 5-a-side đến 7-a-side</li>
                                    <li>Cỏ nhân tạo bền và chất lượng cao</li>
                                    <li>Không gian thoáng, bao quanh bởi rào an toàn</li>
                                    <li>Hệ thống chiếu sáng đạt chuẩn</li>
                                </ul>
                                <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                                    <li>Chỗ đậu xe rộng rãi và trạm xe buýt gần</li>
                                    <li>Đặt sân nhanh chóng, thanh toán tự động</li>
                                    <li>Giờ giấc linh hoạt, đa dạng loại hình</li>
                                    <li>Dịch vụ hỗ trợ khách hàng chuyên nghiệp</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'reviews_map' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2">
                            <section className="bg-white rounded-3xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Đánh giá người dùng</h2>
                                <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex flex-col hover:shadow-lg transition-all mb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-semibold text-gray-700">4.7/5 sao</p>
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    className={`w-6 h-6 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.912c.969 0 1.371 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.974-2.89a1 1 0 00-1.175 0l-3.974 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.083 10.1c-.783-.57-.38-1.81.588-1.81h4.912a1 1 0 00.95-.69l1.518-4.674z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">Dựa trên 120 lượt đánh giá</p>
                                    <p className="text-base text-gray-800 italic leading-relaxed">
                                        “Sân đẹp, dịch vụ ổn định, dễ đặt. Cơ sở vật chất rất tốt, nhân viên thân thiện. Chắc chắn sẽ quay
                                        lại!”
                                    </p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex flex-col hover:shadow-lg transition-all mb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-semibold text-gray-700">5.0/5 sao</p>
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    className={`w-6 h-6 text-yellow-500`}
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.912c.969 0 1.371 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.974-2.89a1 1 0 00-1.175 0l-3.974 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.083 10.1c-.783-.57-.38-1.81.588-1.81h4.912a1 1 0 00.95-.69l1.518-4.674z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">Hoàng Trần - 2 ngày trước</p>
                                    <p className="text-base text-gray-800 italic leading-relaxed">
                                        “Thật sự rất hài lòng với trải nghiệm ở đây. Sân đẹp, không gian thoải mái, và đặc biệt là việc đặt
                                        giờ rất tiện lợi.”
                                    </p>
                                </div>
                                <button className="mt-6 w-full px-6 py-3 bg-gray-100 text-emerald-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-sm">
                                    Xem tất cả đánh giá
                                </button>
                            </section>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <section className="bg-white rounded-3xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Bản đồ sân</h2>
                                {dssan && dssan[0] && dssan[0].vi_do && dssan[0].kinh_do ? (
                                    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg transition hover:scale-[1.01] duration-300">
                                        <iframe
                                            src={`https://www.google.com/maps?q=${dssan[0].vi_do},${dssan[0].kinh_do}&output=embed`}
                                            className="w-full h-full border-0"
                                            allowFullScreen=""
                                            loading="lazy"
                                            title="Vị trí sân"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="bg-gray-100 p-6 rounded-xl text-center text-gray-600">
                                        <p>Không có thông tin bản đồ cho sân này.</p>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                )}
            </div>

            <footer className="bg-emerald-700 text-white text-center py-8 rounded-t-3xl mt-12 shadow-inner">
                <p className="text-base">© 2025 SânGo - Đặt sân thông minh, dễ dàng và nhanh chóng.</p>
                <p className="text-sm mt-2">Được thiết kế cho CDIO4</p>
            </footer>
            <Toaster></Toaster>
        </div>
    ) : (
        <h2>Loading</h2>
    );
};

export default DatSan;
