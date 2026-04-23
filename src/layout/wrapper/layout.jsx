import Footer from "../components/Footer";
import Menu from "../components/Menu"
function layout({ children }) {
    return (
        <div>
            <Menu>{children}</Menu>
            <Footer></Footer>
        </div>
    );
}

export default layout;