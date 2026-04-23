import { useState } from "react";
import MenuAdmin from "../components/MenuAdmin";
import HeaderAdmin from "../components/HeaderAdmin";


function LayoutAdmin({ children }) {
    const [name, setName] = useState("");
    return (
        <div className="w-screen text-[#266107] bg-gray-100">
            <div className="grid grid-cols-6">
                <div className="col-start-1 col-end-2 relative">
                    <MenuAdmin setName={setName} />
                </div>
                <div className="col-start-2 col-end-7 m-10">
                    <HeaderAdmin/>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LayoutAdmin;
