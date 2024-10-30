'use client'

import { useToast } from "@/hooks/use-toast";

export default function RemoveApi() {
    const {toast} = useToast();
    function handleClick() {
        toast({
            title: "API Key Removed"
        })
        localStorage.removeItem("apikey");
    }
    return (
        <button onClick={handleClick}>
            Remove API
        </button>
    )
}