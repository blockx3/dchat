import Image from "next/image";
import ProfileDropdown from "../components/ProfileDropdown";
// import Upload from "../components/Upload";
import logo from "../../../public/logo.png"
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { DragDrop } from "../components/DragDrop";
import SetApi from "../components/SetApi";

export default async function Page() {
    const session = await auth();
    if(!session) {
        redirect('/');
    }
    return (
        <div className="bg-[#0E0A24] min-h-screen text-white flex flex-col gap-20">
            <div className="flex py-7 px-2 justify-between shadow-2xl">
                <Image 
                    src={logo}
                    alt="logo"
                    height={41}
                    width={91}
                />
                <ProfileDropdown />
            </div>
            {/* <Upload /> */}
            <DragDrop />
            <SetApi />
        </div>
    )
}