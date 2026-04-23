import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { layThongKeSuKien, layThongKeDatSan, layThongKeDoanhThu } from '@/redux/thongKeSlice';
import pageSlice from '@/redux/pageSlice';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const ThongKe = () => {
    const dispatch = useDispatch();

    const thongKeSuKien = useSelector((state) => state.thongke.suKien.data);
    const thongKeDatSan = useSelector((state) => state.thongke.datSan.data) || [];
    const thongKeDoanhThu = useSelector((state) => state.thongke.doanhThu.data);

    useEffect(() => {
        dispatch(pageSlice.actions.setName('Báo Cáo Thống Kê'));
        dispatch(layThongKeSuKien());
        dispatch(layThongKeDatSan());
        dispatch(layThongKeDoanhThu());
    }, [dispatch]);
    const dataPieChart = thongKeDatSan.map((item) => ({
        ...item,
        luot_dat: Number(item.luot_dat),
    }));
    return (
        <div className="flex-1 bg-muted p-6 md:p-8 min-h-[calc(100vh-64px-2rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm border rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Số người tham gia mỗi sự kiện</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Array.isArray(thongKeSuKien) && thongKeSuKien.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={thongKeSuKien}>
                                    <XAxis dataKey="ten_su_kien" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="so_nguoi" fill="#82ca9d" radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-muted-foreground">Không có dữ liệu để hiển thị</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="shadow-sm border rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Tỷ lệ đặt sân theo sân thể thao</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Array.isArray(thongKeDatSan) && thongKeDatSan.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={dataPieChart} dataKey="luot_dat" nameKey="ten_san" cx="50%" cy="50%" outerRadius={100} label>
                                        {thongKeDatSan.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-muted-foreground">Không có dữ liệu để hiển thị</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="shadow-sm border rounded-2xl md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Doanh thu theo sân thể thao</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Array.isArray(thongKeDoanhThu) && thongKeDoanhThu.length > 0 ? (
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={thongKeDoanhThu}>
                                    <XAxis dataKey="ten_san" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} VND`, 'Tổng Tiền']} />
                                    <Legend
                                        payload={[
                                            {
                                                value: 'Tổng Tiền',
                                                type: 'square',
                                                id: 'tong_tien',
                                                color: '#8884d8',
                                            },
                                        ]}
                                    />
                                    <Bar dataKey="tong_tien" fill="#8884d8" radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-muted-foreground">Không có dữ liệu để hiển thị</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ThongKe;
