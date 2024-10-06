import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import Content from "../../components/Content";

interface PageProps {
    params: {
        collection?: string
    }
}

export default async function Page({params}: PageProps) {
    const session = await auth();
    if(!session){
        redirect('/');
    }
    
    return (
        <div className="bg-[#0E0A24] min-h-screen">
            <Content collection={params.collection || ''} />
        </div>
    )
}