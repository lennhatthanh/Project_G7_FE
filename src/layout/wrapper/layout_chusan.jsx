import { useState } from "react";
import MenuChuSan from "../components/MenuChuSan";
import HeaderChuSan from "../components/HeaderChuSan";

function LayoutChuSan({ children }) {
    return (
        <div className="w-screen text-[#266107] bg-gray-100">
            <div className="grid grid-cols-6">
                <div className="col-start-1 col-end-2 relative">
                    <MenuChuSan  />
                </div>
                <div className="col-start-2 col-end-7 m-10">
                    <HeaderChuSan />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LayoutChuSan;
