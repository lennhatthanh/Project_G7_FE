import { kiemTraChuSan } from '@/redux/chuSanSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const KiemTraChuSan = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const checkChuSan = async () => {
            const result = await dispatch(kiemTraChuSan());
            if (kiemTraChuSan.fulfilled.match(result)) {
            } else {
                    navigate('/chu-san/dang-nhap' , {state : {thongbao : "Bạn cần đăng nhập"}});

            }
        };

        checkChuSan();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default KiemTraChuSan;
