import SignOut from "./SignOut";
// import DeletePdf from "./DeletePdf";
import UploadButton from "./UploadButton";
import InputBox from "./InputBox";
import { auth } from "../../../auth";
import { prisma } from "../lib/prisma";
// import CollectionList from "./CollectionList";
import { SheetSide } from "./SheetSide";


export default async function Content(collection: { collection: string }) {
  const collectionName = collection.collection;
  const session = await auth();

  const user = await prisma.user.findUnique({
      where: {
          email: session?.user?.email || ""
      },
      include:{
           Collection:true
      }
  })

  const list = user?.Collection || [];
  

  return (
    <div className="">
      {/* <CollectionList list={list} /> */}
      <SheetSide list={list} />
      <div>
        <div className="flex justify-end">
          <div className="flex flex-col gap-2">
            <SignOut />
            {/* <DeletePdf collectionName={collectionName} /> */}
            <UploadButton />
          </div>
        </div>
        <div className="flex flex-col max-w-2xl mx-auto p-4 bg-[#3C3D37] shadow-lg rounded-xl">
          <InputBox
            collectionName={collectionName}
          />
        </div>
      </div>
    </div>
  );
}
