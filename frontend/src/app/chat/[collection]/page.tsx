import Content from "../../components/Content";

interface PageProps {
    params: {
        collection?: string
    }
}

export default function Page({params}: PageProps) {
    
    return (
        <div className="bg-[#0E0A24] min-h-screen">
            <Content collection={params.collection || ''} />
        </div>
    )
}