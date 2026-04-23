import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faUserTie,
    faFutbol,
    faCalendarAlt,
    faChartLine,
    faMapMarkedAlt,
    faCogs,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import pageSlice from '../../redux/pageSlice';
import logo from '@/assets/img/logo.png';
import { dangXuatAdmin } from '@/redux/adminSlice';
const menuSections = [
    {
        title: 'QUẢN LÝ',
        items: [
            { name: 'Chủ Sân', path: '/admin/quan-ly-chu-san', icon: faUserTie },
            { name: 'Môn Chơi', path: '/admin/quan-ly-mon-choi', icon: faFutbol },
        ],
    },
    {
        title: 'THÔNG TIN & BÁO CÁO',
        items: [
            { name: 'Bản Đồ Sân', path: '/map', icon: faMapMarkedAlt },
        ],
    },
];

const isActive = (path) => {
    const location = window.location.pathname;
    return location.startsWith(path);
};

const MenuAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDangXuat = async () => {
        const result = await dispatch(dangXuatAdmin());
        if (dangXuatAdmin.fulfilled.match(result)) {
            navigate('/admin/dang-nhap', {state : {thongbao : "Đăng xuất thành công", status: true}});
            localStorage.removeItem("token_admin");
        }
    };
    return (
        <aside className="fixed left-0 top-0 h-full w-[270px] bg-white text-gray-900 shadow-lg flex flex-col py-8 px-6">
            <div className="flex items-center justify-center mb-10 pb-4 border-b border-gray-300">
                <img src={logo} alt="Logo" className="w-[150px] object-contain" style={{ filter: 'contrast(130%) brightness(120%)' }} />
            </div>
            <nav className="w-full flex-grow overflow-y-auto">
                <ul className="space-y-3">
                    {menuSections.map((section, idx) => (
                        <li key={idx}>
                            <h4 className="text-xs font-semibold text-gray-600 uppercase mb-3">{section.title}</h4>
                            <ul>
                                {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out group
                                                ${
                                                    isActive(item.path)
                                                        ? 'bg-green-600 text-white transform translate-x-1'
                                                        : 'text-gray-600 hover:bg-green-200 hover:text-gray-800'
                                                }
                                            `}
                                            onClick={() => dispatch(pageSlice.actions.setName(item.name))}
                                        >
                                            <FontAwesomeIcon
                                                icon={item.icon}
                                                className={`w-5 h-5 mr-3 ${
                                                    isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-gray-700'
                                                }`}
                                            />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-300">
                <Link
                    onClick={() => handleDangXuat()}
                    className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-600 hover:text-white"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
                    Đăng xuất
                </Link>
            </div>
        </aside>
    );
};

export default MenuAdmin;
