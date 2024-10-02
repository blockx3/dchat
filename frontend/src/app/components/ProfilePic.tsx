import Image from "next/image";
import { auth } from "../../../auth"


export default async function ProfilePic() {
    const session = await auth();
    
    return (
        <div>
            <Image
                className="rounded-full"
                src={`${session?.user?.image}`}
                height={50}
                width={50}
                alt="image"
            />
        </div>
    )
}