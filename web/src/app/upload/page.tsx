import Image from "next/image";
import ProfileDropdown from "../components/ProfileDropdown";
// import Upload from "../components/Upload";
import logo from "../../../public/logo.png"
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { DragDrop } from "../components/DragDrop";

export default async function Page() {
    const session = await auth();
    if(!session) {
        redirect('/');
    }
    return (
        <div className="bg-[#0E0A24] min-h-screen text-white">
            <div className="flex py-7 px-2 justify-between">
                <Image 
                    src={logo}
                    alt="logo"
                    height={41}
                    width={91}
                />
                <ProfileDropdown />
            </div>
            <DragDrop />
            {/* <Upload /> */}
        </div>
    )
}