import { useState } from 'react';
import hinh from '../../assets/img/dangky.jpg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { dangKyNguoiDung } from '@/redux/nguoiDungSlice';

function DangKy() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        ho_ten: '',
        email: '',
        mat_khau: '',
        so_dien_thoai: '',
        gioi_tinh: '',
    });
    console.log(user);
    const login = async (e) => {
        e.preventDefault();
        const result = await dispatch(dangKyNguoiDung(user));
        if (dangKyNguoiDung.fulfilled.match(result)) {
            toast.success('Đăng ký thành công!Hãy xác thực tài khoản trên email');
            setTimeout(() => {
                navigate('/nguoi-dung/dang-nhap');
            }, 1000);
        } else {
            console.log(result);

            toast.error(result.payload || 'Đăng ký thất bại');
        }
    };
    return (
        <div className="w-screen h-screen bg-gradient-to-tr from-[#5ED17C] via-lime-100 to-[#FFF7F2]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-3xl w-[800px] h-[550px] bg-white shadow-xl">
                <div className="grid grid-cols-2 h-full">
                    <form className="items-center  text-gray-800 font-medium m-6" onSubmit={login}>
                        <span className="text-2xl font-bold">Sign Up</span>
                        <p className="mt-5 text-gray-700 text-[15px]">Họ Tên</p>
                        <input
                            type="text"
                            value={user.ho_ten}
                            onChange={(e) => setUser({ ...user, ho_ten: e.target.value })}
                            className="border border-gray-300 p-1.5 rounded-lg w-full outline-none ps-3 pe-3"
                            placeholder="Enter your name"
                            required
                        />

                        <p className="mt-3 text-gray-700 text-[15px]">Số Điện Thoại</p>
                        <input
                            type="text"
                            value={user.so_dien_thoai}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    so_dien_thoai: e.target.value,
                                })
                            }
                            className="border border-gray-300 p-1.5 rounded-lg w-full outline-none ps-3 pe-3"
                            placeholder="Enter your phone"
                            required
                        />
                        <p className="mt-3 text-gray-700 text-[15px]">Email</p>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="border border-gray-300 p-1.5 rounded-lg w-full outline-none ps-3 pe-3"
                            placeholder="Enter your email"
                            required
                        />
                        <p className="mt-3 text-gray-700 text-[15px]">Mật Khẩu</p>
                        <input
                            type="password"
                            value={user.mat_khau}
                            onChange={(e) => setUser({ ...user, mat_khau: e.target.value })}
                            className="border border-gray-300 p-1.5 rounded-lg w-full outline-none ps-3 pe-3"
                            placeholder="Enter your password"
                            required
                        />
                        <p className="mt-3 text-gray-700 text-[15px]">Giới Tính</p>
                        <select
                            value={user.gioi_tinh}
                            onChange={(e) => setUser({ ...user, gioi_tinh: e.target.value })}
                            className="appearance-none border border-gray-300 p-1.5 rounded-lg w-full outline-none ps-3 pe-3"
                            name=""
                            id=""
                            required
                        >
                            <option className="" value="" disabled>
                                Giới Tính
                            </option>
                            <option className="" value="Nam">
                                Nam
                            </option>
                            <option className="" value="Nữ">
                                Nữ
                            </option>
                        </select>
                        <div className="flex justify-between text-[12px] mt-5">
                            <div className="flex">
                                <input type="checkbox" />
                                <p className="ms-2">I agree to the terms & policy</p>
                            </div>
                            <div className="flex">
                                <span>Have an account?</span>
                                <Link to={'/nguoi-dung/dang-nhap'} className="text-purple-500 underline">
                                    Đăng Nhập
                                </Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-2 rounded-lg bg-yellow-900 p-1 text-amber-50 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            Đăng Ký
                        </button>
                    </form>
                    <div className="rounded-br-3xl rounded-tr-3xl overflow-hidden">
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

export default DangKy;
