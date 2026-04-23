import hinhphu from '../assets/img/hinhphu.png';
import nentk from '../assets/img/nentk.png';
import anh1 from '../assets/img/anh1.png';
import anh2 from '../assets/img/anh2.png';
import anh3 from '../assets/img/anh3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faVolleyball,
    faMapLocation,
    faCalendarCheck,
    faTrophy,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Aos from 'aos';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { useDispatch, useSelector } from 'react-redux';
import { dataMonChoi } from '@/redux/monChoiSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
function TrangChu() {
    const text = 'Tìm sân phù hợp với bạn';
    const [displayedText, setDisplayedText] = useState('');
    const [selectedMonChoi, setSelectedMonChoi] = useState(null);
    const [selectedThanhPho, setSelectedThanhPho] = useState(null);
    const [selectedQuan, setSelectedQuan] = useState(null);
    const navigate = useNavigate();
    const dsmonchoi = useSelector((state) => state.monchoi.monchoi);
    const dispatch = useDispatch();
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
    useEffect(() => {
        dispatch(dataMonChoi());
    }, []);
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index - 1]);
            index++;
            if (index >= text.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: false,
        });
    }, []);
    useEffect(() => {
        Aos.refresh();
    }, []);

    const { ref, inView } = useInView({ triggerOnce: false });
    return (
        <div>
            <div
                id="home"
                className="z-0 h-[600px] flex justify-center items-center bg-gradient-to-b from-[#FFF7F2] via-lime-100 to-[#5ED17C] text-[#266107] relative w-full"
            >
                <div className=" absolute p-15 gap-6 ">
                    <div className="flex flex-col items-center gap-5">
                        <span className="text-[70px] font-bold">{displayedText}</span>
                        <span className="text-[17px]">Chúng tôi giúp bạn đặt sân nhanh chóng và gần bạn nhất</span>
                    </div>
                </div>
                <div className="absolute bottom-0 right-2/4">
                    <img src={hinhphu} width={300} className="" alt="" />
                </div>
            </div>
            <div className="shadow-2xl z-10 font-medium absolute rounded-2xl left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[130px] p-4 border border-[#bdddbb] bg-[#bdddbb] flex items-center justify-around">
                <div className="relative text-[#266107]/50 text-[20px]">
                    <select
                        onChange={(e) => setSelectedThanhPho(e.target.value)}
                        className="rounded-xl cursor-pointer outline-none appearance-none bg-[#FFF7F2]  w-60 h-15 p-4"
                        name=""
                        id=""
                    >
                        <option value="1" disabled selected>
                            Vị Trí
                        </option>
                        {tp.map((value, index) => {
                            return (
                                <option key={index} className="text-[#266107]" value={value.name}>
                                    {value.name}
                                </option>
                            );
                        })}
                    </select>
                    <FontAwesomeIcon className="absolute right-5 top-1/2 -translate-y-1/2" icon={faLocationDot}></FontAwesomeIcon>
                </div>
                <div className="relative text-[#266107]/50 text-[20px]">
                    <select
                        onChange={(e) => setSelectedQuan(e.target.value)}
                        className="rounded-xl cursor-pointer outline-none appearance-none bg-[#FFF7F2]  w-60 h-15 p-4"
                        name=""
                        id=""
                    >
                        <option value="1" disabled selected>
                            Quận
                        </option>
                        {tp
                            .find((value) => value.name === selectedThanhPho)
                            ?.districts.map((value, index) => {
                                return (
                                    <option key={index} value={value.name}>
                                        {value.name}
                                    </option>
                                );
                            })}
                    </select>
                    <FontAwesomeIcon className="absolute right-5 top-1/2 -translate-y-1/2" icon={faLocationDot}></FontAwesomeIcon>
                </div>
                <div className="relative text-[#266107]/50 text-[20px]">
                    <select
                        onChange={(e) => setSelectedMonChoi(e.target.value)}
                        value={selectedMonChoi}
                        className="rounded-xl cursor-pointer outline-none appearance-none bg-[#FFF7F2]  w-60 h-15 p-4"
                        name=""
                        id=""
                    >
                        <option value="1" disabled selected>
                            Môn Chơi
                        </option>
                        {dsmonchoi.map((value, index) => {
                            return (
                                <option key={index} className="text-[#266107]" value={value.ten_mon}>
                                    {value.ten_mon}
                                </option>
                            );
                        })}
                    </select>
                    <FontAwesomeIcon className="absolute right-5 top-1/2 -translate-y-1/2" icon={faVolleyball}></FontAwesomeIcon>
                </div>

                <button
                    onClick={() =>
                        navigate('/danh-sach-san', { state: { ten_mon: selectedMonChoi, thanh_pho: selectedThanhPho, quan: selectedQuan } })
                    }
                    className="rounded-xl bg-[#266107] text-[#bdddbb] text-xl w-40 h-15  hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    Tìm ngay
                </button>
            </div>

            <div className="relative z-0 h-[500px] bg-gradient-to-b from-[#5ED17C] via-lime-100 to-[#BAEDB7] ">
                <div
                    data-aos="fade-up"
                    className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2  text-black grid grid-cols-2 gap-4 w-[80%] h-[60%] justify-center items-center"
                >
                    <img className="w-[600px] h-[350px]" src={nentk} alt="" />
                    <div
                        data-aos="fade-up"
                        data-aos-duration="3000"
                        className="font-bold text-[#266107]  w-[80%] h-[60%] text-4xl flex flex-col gap-4 justify-center"
                    >
                        <span>
                            Chúng tôi giúp bạn <br /> tìm sân chơi nhanh chóng
                        </span>
                        <div data-aos="fade-up" ref={ref} data-aos-duration="7000" className="flex justify-between">
                            <div className="grid grid-rows-2">
                                {inView && <CountUp end={800} duration={2} />}
                                <span className="text-[20px]">Sân</span>
                            </div>
                            <div className="grid grid-rows-2">
                                {inView && <CountUp end={7000} duration={2} />}
                                <span className="text-[20px]">Lần Đặt</span>
                            </div>
                            <div className="grid grid-rows-2">
                                {inView && <CountUp end={63} duration={2} />}
                                <span className="text-[20px]">Tỉnh Thành</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="xem_ngay" className="relative z-0 h-[600px] bg-gradient-to-b from-[#BAEDB7]  to-[#BAEDB7]">
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-10"
                >
                    <span className="text-[#266107] text-4xl font-serif font-bold">Search My Sport</span>
                    <div className="flex justify-center gap-10">
                        <div className="w-80 h-100 border-3 shadow-2xl border-black rounded-2xl grid grid-rows-10">
                            <div className="p-5">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.733 1.22299L14.312 2.84999C14.3983 3.09245 14.5345 3.31411 14.7118 3.50065C14.8891 3.68719 15.1036 3.83446 15.3414 3.93294C15.5791 4.03143 15.8349 4.07893 16.0922 4.0724C16.3495 4.06586 16.6025 4.00542 16.835 3.89499L18.395 3.15399C19.958 2.41099 21.589 4.04199 20.846 5.60499L20.105 7.16499C19.9942 7.3974 19.9335 7.6505 19.9269 7.90787C19.9202 8.16523 19.9676 8.42114 20.0661 8.659C20.1646 8.89686 20.312 9.11137 20.4987 9.28863C20.6855 9.46589 20.9073 9.60195 21.15 9.68799L22.777 10.266C24.407 10.846 24.407 13.152 22.777 13.733L21.15 14.312C20.9075 14.3983 20.6859 14.5345 20.4993 14.7118C20.3128 14.8891 20.1655 15.1036 20.067 15.3414C19.9685 15.5791 19.921 15.8349 19.9276 16.0922C19.9341 16.3495 19.9946 16.6025 20.105 16.835L20.846 18.395C21.589 19.958 19.958 21.589 18.395 20.846L16.835 20.105C16.6026 19.9944 16.3496 19.9338 16.0923 19.9271C15.8351 19.9204 15.5792 19.9678 15.3414 20.0662C15.1036 20.1646 14.8891 20.3118 14.7118 20.4983C14.5345 20.6849 14.3983 20.9065 14.312 21.149L13.733 22.777C13.153 24.407 10.847 24.407 10.267 22.777L9.68799 21.149C9.60158 20.9066 9.46531 20.6851 9.28795 20.4986C9.1106 20.3122 8.89611 20.165 8.65835 20.0667C8.42059 19.9683 8.16483 19.9208 7.9076 19.9274C7.65037 19.9341 7.39739 19.9945 7.16499 20.105L5.60499 20.845C4.04199 21.589 2.41099 19.958 3.15399 18.395L3.89499 16.835C4.00576 16.6024 4.06647 16.3492 4.07318 16.0917C4.07989 15.8342 4.03246 15.5781 3.93395 15.3401C3.83545 15.1021 3.68806 14.8874 3.50134 14.71C3.31461 14.5325 3.09271 14.3963 2.84999 14.31L1.22299 13.732C-0.407012 13.152 -0.407012 10.845 1.22299 10.265L2.84999 9.68699C3.09271 9.601 3.31469 9.46502 3.50155 9.28784C3.68842 9.11067 3.83601 8.89624 3.93479 8.65844C4.03357 8.42063 4.08134 8.16473 4.075 7.90731C4.06866 7.64988 4.00836 7.39664 3.89799 7.16399L3.15599 5.60399C2.41299 4.03999 4.04399 2.40899 5.60799 3.15199L7.16799 3.89399C7.40034 4.00427 7.65324 4.06462 7.91035 4.07114C8.16747 4.07765 8.42309 4.03019 8.66074 3.93182C8.89838 3.83345 9.11275 3.68635 9.29004 3.50001C9.46732 3.31367 9.60357 3.09223 9.68999 2.84999L10.268 1.22299C10.846 -0.407012 13.152 -0.407012 13.732 1.22299H13.733Z"
                                        fill="#FF884D"
                                    />
                                </svg>
                            </div>
                            <div className="row-span-5 p-5 flex flex-col gap-3">
                                <span className="text-black text-3xl font-bold">Bóng đá</span>
                                <span className="text-black text-md font-sans">
                                    Khám phá hơn 50 sân bóng chất lượng tại Đà Nẵng, phù hợp cho cả đội nhóm và thi đấu giải
                                </span>
                                <Link to="/danh-sach-san">
                                    <span className="text-black text-[15px] font-bold font-sans cursor-pointer hover:duration-300 hover:translate-x-3">
                                        SEE MORE <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                                    </span>
                                </Link>
                            </div>
                            <div className="row-span-4 p-0">
                                <img src={anh1} className="h-full rounded-br-xl rounded-bl-xl" alt="" />
                            </div>
                        </div>
                        <div className="w-80 h-100 border-3 shadow-2xl border-black rounded-2xl grid grid-rows-10">
                            <div className="p-5">
                                <svg width="35" height="35" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2098_113)">
                                        <path
                                            d="M20.6562 0C20.6562 0 19.8223 17.324 0.65625 20C0.65625 20 17.1092 20.315 20.6562 40C20.6562 40 21.7862 22.982 40.6562 20C40.6562 20 22.7262 17.477 20.6562 0Z"
                                            fill="#8C77EC"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2098_113">
                                            <rect width="40" height="40" fill="white" transform="translate(0.65625)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="row-span-5 p-5 flex flex-col gap-3">
                                <span className="text-black text-3xl font-bold">Tennis</span>
                                <span className="text-black text-md font-sans">
                                    Trải nghiệm hệ thống sân tennis chuẩn quốc tế, với hơn 30 địa điểm khắp thành phố.
                                </span>
                                <Link to="/danh-sach-san">
                                    <span className="text-black text-[15px] font-bold font-sans cursor-pointer hover:duration-300 hover:translate-x-3">
                                        SEE MORE <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                                    </span>
                                </Link>
                            </div>
                            <div className="row-span-4 p-0">
                                <img src={anh2} className="h-full rounded-br-xl rounded-bl-xl" alt="" />
                            </div>
                        </div>
                        <div className="w-80 h-100 border-3 shadow-2xl border-black rounded-2xl grid grid-rows-10">
                            <div className="p-5">
                                <svg width="35" height="35" viewBox="0 0 41 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.0671 0.5C25.4407 0.5 30.5941 2.63463 34.3938 6.43431C38.1935 10.234 40.3281 15.3874 40.3281 20.761V24.641H0.328125V20.239C0.328125 15.0039 2.40776 9.9832 6.10954 6.28142C9.81133 2.57964 14.832 0.5 20.0671 0.5V0.5Z"
                                        fill="#02C27F"
                                    />
                                </svg>
                            </div>
                            <div className="row-span-5 p-5 flex flex-col gap-3">
                                <span className="text-black text-3xl font-bold">Cầu lông</span>
                                <span className="text-black text-md font-sans">
                                    Tìm kiếm và đặt nhanh hơn 40 sân cầu lông trong nhà, lý tưởng cho luyện tập hàng ngày.
                                </span>
                                <Link to="/danh-sach-san">
                                    <span className="text-black text-[15px] font-bold font-sans cursor-pointer hover:duration-300 hover:translate-x-3">
                                        SEE MORE <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                                    </span>
                                </Link>
                            </div>
                            <div className="row-span-4 p-0">
                                <img src={anh3} className="h-full rounded-br-xl rounded-bl-xl" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-0 h-[600px] bg-gradient-to-b from-[#BAEDB7] via-lime-100 to-[#FFF7F2] ">
                <div
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    className="absolute top-10 flex flex-col items-center justify-center w-full text-[#266107]"
                >
                    <span className="font-bold text-5xl">Tại sao nên chọn chúng tôi</span>
                    <br />
                    <br />
                    <span className="text-xl">Đơn vị cung cấp tìm sân</span>
                    <div data-aos="fade-up" data-aos-duration="400000" className="z-30 mt-20 w-full flex justify-center gap-16">
                        <div className="w-[200px] h-[200px] bg-[#8fde89] rounded-2xl shadow-2xl flex flex-col p-5 justify-around">
                            <div className="flex flex-col">
                                <div className="w-[70px] h-[70px] bg-[#FFF7F2] flex items-center justify-center rounded-xl text-gray-700">
                                    <FontAwesomeIcon fontSize={40} icon={faMapLocation}></FontAwesomeIcon>
                                </div>
                            </div>
                            <span className="text-[17px] font-bold">Phủ sóng toàn quốc</span>
                            <span className="text-[12px]">Hệ thống sân thể thao có mặt tại khắp 63 tỉnh thành</span>
                        </div>
                        <div className="w-[200px] h-[200px] bg-[#8fde89] rounded-2xl shadow-2xl flex flex-col p-5 justify-around">
                            <div className="flex flex-col">
                                <div className="w-[70px] h-[70px] bg-[#FFF7F2] flex items-center justify-center rounded-xl text-gray-700">
                                    <FontAwesomeIcon fontSize={40} icon={faCalendarCheck}></FontAwesomeIcon>
                                </div>
                            </div>
                            <span className="text-[17px] font-bold">Dễ dàng đặt sân</span>
                            <span className="text-[12px]">Đặt sân nhanh chóng, đơn giản chỉ với vài thao tác trên web</span>
                        </div>
                        <div className="w-[200px] h-[200px] bg-[#8fde89] rounded-2xl shadow-2xl flex flex-col p-5 justify-around">
                            <div className="flex flex-col">
                                <div className="w-[70px] h-[70px] bg-[#FFF7F2] flex items-center justify-center rounded-xl text-gray-700">
                                    <FontAwesomeIcon fontSize={40} icon={faLock}></FontAwesomeIcon>
                                </div>
                            </div>
                            <span className="text-[17px] font-bold">Bảo mật & tin cậy</span>
                            <span className="text-[12px]">Bảo vệ thông tin người dùng và lịch sử đặt sân tuyệt đối</span>
                        </div>
                        <div className="w-[200px] h-[200px] bg-[#8fde89] rounded-2xl shadow-2xl flex flex-col p-5 justify-around">
                            <div className="flex flex-col">
                                <div className="w-[70px] h-[70px] bg-[#FFF7F2] flex items-center justify-center rounded-xl text-gray-700">
                                    <FontAwesomeIcon fontSize={40} icon={faTrophy}></FontAwesomeIcon>
                                </div>
                            </div>
                            <span className="text-[17px] font-bold">Liên kết tổ chức sự kiện</span>
                            <span className="text-[12px]">Hỗ trợ tổ chức, đặt lịch giải đấu và sự kiện thể thao chuyên nghiệp</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrangChu;
