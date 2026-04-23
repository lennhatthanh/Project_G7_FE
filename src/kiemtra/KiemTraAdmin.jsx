import { kiemTraAdmin } from '@/redux/adminSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const KiemTraAdmin = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const checkAdmin = async () => {
            const result = await dispatch(kiemTraAdmin());
            if (kiemTraAdmin.fulfilled.match(result)) {
            } else {
                navigate('/admin/dang-nhap', {state : {thongbao : "Bạn cần đăng nhập"}});
            }
        };

        checkAdmin();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default KiemTraAdmin;
