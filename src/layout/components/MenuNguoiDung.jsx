import { faArrowUp, faClockRotateLeft, faMagnifyingGlass, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import ButtonLink from '../../components/ButtonLink';
import { Tooltip } from 'react-tooltip';
import { useDispatch } from 'react-redux';
import {  dangXuatNguoiDung } from '@/redux/nguoiDungSlice';
import toast, { Toaster } from 'react-hot-toast';
function Menu({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDangXuat = async () => {
        const result = await dispatch(dangXuatNguoiDung());
        if (dangXuatNguoiDung.fulfilled.match(result)) {
            toast.success('Đăng xuất thành công!');
            setTimeout(() => {
                navigate('/trang-chu');
                localStorage.removeItem('token_nguoidung');
            }, 1000);
        } else {
            toast.error('Đăng xuất thất bại!');
        }
    };
    return (
        <div>
            <div className="relative w-full font-medium items-center">
                <div className="z-100 flex justify-between items-center w-[90%] mt-5 font-serif absolute left-1/2 -translate-x-1/2 rounded-2xl">
                    <img onClick={() => navigate('/trang-chu')} className="text-lime-600 w-[12%] cursor-pointer" src={logo} alt="" />
                    <div className="font-bold font-sans text-lime-700 flex gap-2 h-full">
                        <ButtonLink title="Trang Chủ" />
                        <a href="#lien_he">
                            <ButtonLink title="Liên Hệ" />
                        </a>
                        <Link to="/danh-sach-san">
                            <ButtonLink title="Đặt Ngay" />
                        </Link>
                        <Link to="/su-kien">
                            <ButtonLink title="Sự Kiện" />
                        </Link>
                        <Link to="/map">
                            <ButtonLink title="Map" />
                        </Link>
                    </div>
                    <div className="text-lime-800 text-[20px] ">
                        <FontAwesomeIcon
                            onClick={() => navigate('/nguoi-dung/profile')}
                            data-tooltip-id="tooltip-lichsu"
                            data-tooltip-content="Lịch Sử"
                            className="ms-10 cursor-pointer"
                            icon={faClockRotateLeft}
                        ></FontAwesomeIcon>
                        <Tooltip id="tooltip-lichsu" className="!text-base !px-2 !py-1 !rounded-md" />
                        <FontAwesomeIcon
                            onClick={() => navigate('/nguoi-dung/profile')}
                            data-tooltip-id="tooltip-profile"
                            data-tooltip-content="Profile"
                            className="ms-10 cursor-pointer"
                            icon={faUser}
                        ></FontAwesomeIcon>
                        <Tooltip id="tooltip-profile" className="!text-base !px-2 !py-1 !rounded-md" />
                        <FontAwesomeIcon
                            onClick={() => handleDangXuat()}
                            data-tooltip-id="tooltip-logout"
                            data-tooltip-content="Log Out"
                            className="ms-10 cursor-pointer"
                            icon={faRightFromBracket}
                        ></FontAwesomeIcon>
                        <Tooltip id="tooltip-logout" className="!text-base !px-2 !py-1 !rounded-md" />
                    </div>
                </div>
                {children}
                <a href="#home" className="bg-[#bdddbb] w-15 h-15 rounded-full fixed bottom-5 right-5 cursor-pointer">
                    <FontAwesomeIcon
                        className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30px]"
                        icon={faArrowUp}
                    ></FontAwesomeIcon>
                </a>
            </div>
            <Toaster />
        </div>
    );
}

export default Menu;
