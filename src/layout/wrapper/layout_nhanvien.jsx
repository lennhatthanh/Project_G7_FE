import { useState } from "react";
import MenuChuSan from "../components/MenuChuSan";
import HeaderChuSan from "../components/HeaderChuSan";

function LayoutNhanVien({ children }) {
    return (
        <div className="w-screen text-[#266107] bg-gray-100">
            <div className="grid grid-cols-1">
                <div className=" m-10">
                    <HeaderChuSan />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LayoutNhanVien;
