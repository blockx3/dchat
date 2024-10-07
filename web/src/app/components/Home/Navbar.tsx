import Image from "next/image";
import logo from "../../../../public/logo.png"
import SignIn from "../SignIn";

export default function Navbar(){
    return (
        <div className="flex justify-between pt-2 sticky top-0 z-50 bg-[#0E0A24] shadow-2xl">
            <Image
                src={logo}
                alt="logo"
                width={110}
                height={90}
            />
            <div className="p-2">
                <SignIn />
            </div>
        </div>
    )
}