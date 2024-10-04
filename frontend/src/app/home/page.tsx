import Image from "next/image";
import ProfileDropdown from "../components/ProfileDropdown";
import Upload from "../components/Upload";
import logo from "../../../public/logo.png"

export default function Home() {
    return (
        <div className="bg-[#181C14] min-h-screen text-white">
            <div className="flex py-7 px-2 justify-between">
                <Image 
                    src={logo}
                    alt="logo"
                    height={41}
                    width={91}
                />
                <ProfileDropdown />
            </div>
            <Upload />
        </div>
    )
}