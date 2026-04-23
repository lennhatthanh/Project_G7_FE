import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const HeaderAdmin = () => {
    const pageName = useSelector((state) => state.page.name);
    const userName = 'John Doe';
    return (
        <header className="w-full h-[70px] bg-white shadow-lg flex justify-between items-center px-8 rounded-md mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">{pageName}</h1>
            <div className="flex items-center space-x-4">
                <div className="relative p-2.5 rounded-full text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                    <FontAwesomeIcon icon={faBell} className="text-lg transition-transform group-hover:scale-105" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="p-2.5 rounded-full text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                    <FontAwesomeIcon icon={faCog} className="text-lg" />
                </div>

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full overflow-hidden">
                        <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{userName}</span>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
