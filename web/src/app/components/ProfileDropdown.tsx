import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import ProfilePic from "./ProfilePic"
import SignOut from "./SignOut"
import UploadButton from "./UploadButton"
import RemoveApi from "./RemoveApi"
  

export default function ProfileDropdown() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <ProfilePic />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-white bg-[#0E0A24]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <SignOut />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UploadButton />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <RemoveApi />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}