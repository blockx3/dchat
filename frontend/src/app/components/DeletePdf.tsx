"use client";

import { useState } from "react";
import { deletePdf } from "../../../actions/user";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Delete = {
  collectionName: string;
};

export default function DeletePdf(props: Delete) {
  const { collectionName } = props;
  const router = useRouter();
  const [delLoading, setDelLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setDelLoading(true);
    
    
    const res = await deletePdf(collectionName);
    if (res) {
      
      router.push("/home");
    }
    setDelLoading(false);
  };

  return (
    <>
      {!delLoading ? (
        <Button
          onClick={handleDelete}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete pdf
        </Button>
      ) : (
        <Button
          disabled
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <div className="pl-2">Please wait</div>
        </Button>
      )}
    </>
  );
}
