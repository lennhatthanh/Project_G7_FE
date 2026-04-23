import { useDispatch } from 'react-redux';
import hinh from '../../assets/img/dangnhap.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dangNhapAdmin } from '@/redux/adminSlice';
import toast, { Toaster } from 'react-hot-toast';

function DangNhap() {
    const location = useLocation();
    useEffect(() => {
        if (location.state !== null) {
            if (location.state.status) {
                toast.success(location.state.thongbao);
            } else
            toast.error(location.state.thongbao);
        }
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        email: '',
        mat_khau: '',
    });
    const handleDangNhap = async () => {
        const result = await dispatch(dangNhapAdmin(admin));
        if (dangNhapAdmin.fulfilled.match(result)) {
            navigate('/admin/quan-ly-chu-san');
        }
    };
    return (
        <div className="w-screen h-screen bg-gradient-to-tr from-[#5ED17C]/50 via-lime-100 to-[#FFF7F2]/50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-3xl w-[80%] max-w-[800px] h-auto md:h-[500px] bg-white shadow-xl ">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="flex justify-center items-center text-gray-800 font-medium m-6">
                        <div className="w-full">
                            <span className="text-2xl font-bold">Admin</span>
                            <p className="mt-5 text-gray-700 text-[15px]">Enter your account</p>
                            <p className="mt-3 text-gray-700 text-[15px]">Email</p>
                            <input
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        email: e.target.value,
                                    })
                                }
                                value={admin.email}
                                type="email"
                                className="border border-gray-300 p-1.5 rounded-lg w-full outline-none ps-3 pe-3"
                                placeholder="Your Email"
                                name=""
                            />
                            <p className="mt-3 text-gray-700 text-[15px]">Mật Khẩu</p>
                            <input
                                onChange={(e) =>
                                    setAdmin({
                                        ...admin,
                                        mat_khau: e.target.value,
                                    })
                                }
                                value={admin.mat_khau}
                                type="password"
                                className="border border-gray-300 p-1.5 rounded-lg w-full outline-none ps-3 pe-3"
                                placeholder="Your password"
                                name=""
                            />

                            <button
                                onClick={() => handleDangNhap()}
                                className="w-full mt-10 rounded-lg bg-yellow-900 p-1 text-amber-50 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                Đăng Nhập
                            </button>
                        </div>
                    </div>
                    <div className="rounded-b-3xl hidden md:block md:rounded-tr-3xl overflow-hidden">
                        <img
                            className="h-full w-full object-cover rounded-br-3xl rounded-tr-3xl shadow-2xl shadow-black"
                            src={hinh}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default DangNhap;
