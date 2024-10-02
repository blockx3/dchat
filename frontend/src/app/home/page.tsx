import ProfilePic from "../components/ProfilePic";
import SignOut from "../components/SignOut";
import Upload from "../components/Upload";

export default function Home() {
    return (
        <div className="bg-[#181C14] min-h-screen text-white">
            <div className="flex justify-end">
                <div className="flex flex-col gap-2">
                    <ProfilePic />
                    <SignOut />
                </div>
            </div>
            <Upload />
        </div>
    )
}