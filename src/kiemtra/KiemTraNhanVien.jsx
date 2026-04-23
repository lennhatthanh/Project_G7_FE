import { kiemTraNhanVien } from '@/redux/nhanVienSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const KiemTraNhanVien = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const checkNhanVien = async () => {
            const result = await dispatch(kiemTraNhanVien());
            if (kiemTraNhanVien.fulfilled.match(result)) {
            } else {
                    navigate('/nhan-vien/dang-nhap' , {state : {thongbao : "Bạn cần đăng nhập"}});

            }
        };

        checkNhanVien();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default KiemTraNhanVien;
