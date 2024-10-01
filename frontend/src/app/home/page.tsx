import SignOut from "../components/SignOut";
import Upload from "../components/Upload";

export default function Home() {
    return (
        <div className="bg-[#181C14] h-screen text-white">
            <SignOut />
            <Upload />
        </div>
    )
}