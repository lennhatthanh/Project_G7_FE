import { faArrowUp, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import ButtonLink from '../../components/ButtonLink';
function Menu({ children }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="relative w-full font-medium items-center">
                <div className="z-100 flex justify-between items-center w-[90%] mt-5 font-serif absolute left-1/2 -translate-x-1/2 rounded-2xl">
                    <img className="text-lime-600 w-[12%] "  src={logo} alt="" />
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
                        <button className="bg-lime-700 text-white text-[15px] rounded-xl px-6 py-2 ms-10 hover:bg-lime-800 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                            <Link to="/nguoi-dung/dang-nhap">Đăng Nhập</Link>
                        </button>
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
        </div>
    );
}

export default Menu;
