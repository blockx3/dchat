import { SheetSide } from "@/app/components/SheetSide";
import { auth } from "../../../../auth";
import { prisma } from "../../lib/prisma";

export async function Sidebar() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
    include: {
      Collection: true,
    },
  });

  const list = user?.Collection || [];
  const collectionName = list[0]?.CollectionName;

  return (
    <>
      {collectionName === undefined ? (
        <div></div>
      ) : (
        <SheetSide list={list} collectionName={collectionName} />
      )}
    </>
  );
}
