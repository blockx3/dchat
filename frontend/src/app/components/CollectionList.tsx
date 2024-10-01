"use client"

import { useRouter } from "next/navigation"

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
            {list.map((collection) => (
                <button onClick={()=>handleClick(collection.CollectionName)} className="bg-gray-400 p-4" key={collection.id}>
                    <div>
                        {collection.CollectionName}
                    </div>
                </button>
            ))}
        </div>
    )
}