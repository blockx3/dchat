import InputBox from "./InputBox";
import { auth } from "../../../auth";
import { prisma } from "../lib/prisma";
import { SheetSide } from "./SheetSide";
import Image from "next/image";
import logo from "../../../public/logo.png"
import ProfileDropdown from "./ProfileDropdown";


export default async function Content(collection: { collection: string }) {
  const collectionName = collection.collection;
  const session = await auth();
  const userName = session?.user?.name;

  const user = await prisma.user.findUnique({
      where: {
          email: session?.user?.email || ""
      },
      include:{
           Collection:true
      }
  })

  const history = await prisma.conversationHistory.findMany({
    where: {
        collectionName: collectionName
    }
  })

  const list = user?.Collection || [];  

  return (
    <>
      <div className="flex py-7 px-2 justify-between sticky top-0 z-50 bg-[#0E0A24]">
        <SheetSide list={list} collectionName={collectionName} />
        <Image 
          src={logo}
          alt="logo"
          height={41}
          width={91}
        />
        <ProfileDropdown />
      </div>
      <div className="md:flex md:justify-center">
          <InputBox
            collectionName={collectionName}
            history={history}
            userName={userName}
          />
      </div>
    </>
  );
}
