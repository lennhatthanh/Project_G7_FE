import RouterNguoiDung from './router/routerNguoiDung';
import RouterChuSan from './router/routerChuSan';
import RouterAdmin from './router/routerAdmin';
import RouterNhanVien from './router/routerNhanVien';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KhongKiemTra from './kiemtra/KhongKiemTra';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to={'/trang-chu'} />}></Route>
                    {RouterNguoiDung.map((route, index) => {
                        let Layout = route.layout;
                        let KiemTra = route.kiemtra;
                        const Content = route.component;
                        if (Layout === null) {
                            Layout = LayoutClient;
                        }
                        if (KiemTra === undefined) {
                            KiemTra = KhongKiemTra;
                        }
                        return (
                            <Route
                                index={index}
                                path={route.path}
                                element={
                                    <KiemTra>
                                        <Layout>
                                            <Content></Content>
                                        </Layout>
                                    </KiemTra>
                                }
                            ></Route>
                        );
                    })}
                    {RouterChuSan.map((route, index) => {
                        let Layout = route.layout;
                        let KiemTra = route.kiemtra;
                        const Content = route.component;
                        if (Layout === null) {
                            Layout = LayoutClient;
                        }
                        if (KiemTra === undefined) {
                            KiemTra = KhongKiemTra;
                        }
                        return (
                            <Route
                                index={index}
                                path={route.path}
                                element={
                                    <KiemTra>
                                        <Layout>
                                            <Content></Content>
                                        </Layout>
                                    </KiemTra>
                                }
                            ></Route>
                        );
                    })}
                    {RouterAdmin.map((route, index) => {
                        let Layout = route.layout;
                        let KiemTra = route.kiemtra;
                        const Content = route.component;
                        if (Layout === null) {
                            Layout = LayoutClient;
                        }
                        if (KiemTra === undefined) {
                            KiemTra = KhongKiemTra;
                        }
                        return (
                            <Route
                                index={index}
                                path={route.path}
                                element={
                                    <KiemTra>
                                        <Layout>
                                            <Content></Content>
                                        </Layout>
                                    </KiemTra>
                                }
                            ></Route>
                        );
                    })}
                    {RouterNhanVien.map((route, index) => {
                        let Layout = route.layout;
                        let KiemTra = route.kiemtra;
                        const Content = route.component;
                        if (Layout === null) {
                            Layout = LayoutClient;
                        }
                        if (KiemTra === undefined) {
                            KiemTra = KhongKiemTra;
                        }
                        return (
                            <Route
                                index={index}
                                path={route.path}
                                element={
                                    <KiemTra>
                                        <Layout>
                                            <Content></Content>
                                        </Layout>
                                    </KiemTra>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
