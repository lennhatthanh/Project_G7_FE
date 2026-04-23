import { faEnvelope, faMailReply, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bocongthuong from "../../assets/img/bocongthuong.png";
import logo from "../../assets/img/logo.png";
function Footer() {
    return (
        <div id="lien_he" className="grid grid-cols-4 gap-7 h-[300px] ps-23 pe-23 font-sans bg-[#FFF7F2]  text-[#266107]">
            <div className="flex flex-col items-start gap-3">
                <img className="text-lime-600 w-[60%] "  src={logo} alt="" />
                <span>K7/30 Quang Trung, Thạch Thang, Hải Châu, TP.Đà Nẵng</span>
                <span>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    <a href="mailto:lenguyennhatthanh72@gmail.com" className="ms-3 hover:text-fuchsia-700">lenguyennhatthanh72@gmail.com</a >
                </span>
                <span>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <a href="tel:0905837723" className="ms-3 hover:text-fuchsia-700">+84 875 425 211</a>
                </span>
            </div>
            <div className="flex flex-col items-start gap-3">
                <br />
                <span className="font-bold ">Quy định và chính sách</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Hướng dẫn sử dụng</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Quy chế Hoạt động ứng dụng</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Thông tin về thanh toán</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Chính sách bảo mật thông tin các nhân</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Thông tin chăm sóc khách hàng</span>
            </div>
            <div className="flex flex-col items-start gap-3">
                <br />
                <span className="font-bold">Liên kết nhanh</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Trang chủ</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Dành cho đối tác</span>
                <span className="hover:text-fuchsia-700 cursor-pointer">Tin tức</span>
                </div>
            <div>
                <br />
                <img src={bocongthuong} alt="" />
            </div>
        </div>
    );
}

export default Footer;