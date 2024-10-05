"use client"

import { useRouter } from "next/navigation"
// import { SheetSide } from "./SheetSide";
import DeletePdf from "./DeletePdf";

interface Collection {
    id: string,
    CollectionName: string,
    userID: string
}

interface CollectionListProps {
    list: Collection[]
}

export default function CollectionList({list}: CollectionListProps) {
    const router = useRouter();
    function handleClick(CollectionName: string) {
        router.push(`/chat/${CollectionName}`);
    }
    return (
        <div className="text-white flex flex-col gap-3">
            {/* <SheetSide /> */}
            {list.map((collection) => (
                <div key={collection.id} className="flex">
                    <button onClick={()=>handleClick(collection.CollectionName)} className="bg-gray-400 p-4">
                        {collection.CollectionName}
                    </button>
                    <div>
                        <DeletePdf collectionName={collection.CollectionName} />
                    </div>
                </div>
            ))}
        </div>
    )
}