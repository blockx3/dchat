import Image from "next/image";
import { auth } from "../../../auth"


export default async function ProfilePic() {
    const session = await auth();
    
    return (
        <>
            <Image
                className="rounded-full"
                src={`${session?.user?.image}`}
                height={40}
                width={40}
                alt="image"
            />
        </>
    )
}