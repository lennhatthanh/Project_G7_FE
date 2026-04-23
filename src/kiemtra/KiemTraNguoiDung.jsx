import { kiemTraNguoiDung } from '@/redux/nguoiDungSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const KiemTraNguoiDung = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const checkNguoiDung = async () => {
            const result = await dispatch(kiemTraNguoiDung());
            if (kiemTraNguoiDung.fulfilled.match(result)) {
            } else {
                navigate('/nguoi-dung/dang-nhap', {state : {thongbao : "Bạn cần đăng nhập"}});
            }
        };

        checkNguoiDung();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default KiemTraNguoiDung;
