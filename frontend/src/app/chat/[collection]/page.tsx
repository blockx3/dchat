import Content from "../../components/Content";

interface PageProps {
    params: {
        collection?: string
    }
}

export default function Page({params}: PageProps) {
    
    return (
        <div className="bg-[#181C14] h-screen">
            <Content collection={params.collection || ''} />
        </div>
    )
}