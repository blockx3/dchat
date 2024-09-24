'use client'

import { useParams } from "next/navigation";
import Content from "../../components/Content";

export default function Page() {
    const params = useParams();
    let collection = params.collection;
    
    // Ensure collection is a string (convert array to a single string if needed)
    if (Array.isArray(collection)) {
        collection = collection.join('/');
    }

    return (
        <div className="bg-[#181C14] h-screen">
            <Content collection={collection || ''} />
        </div>
    )
}