import Footer from "../components/Footer";
import Menu from "../components/MenuNguoiDung"
function LayoutNguoiDung({ children }) {
    return (
        <div>
            <Menu>{children}</Menu>
            <Footer></Footer>
        </div>
    );
}

export default LayoutNguoiDung;