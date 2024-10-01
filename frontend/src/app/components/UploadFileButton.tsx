"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { upload } from "../../../actions/user";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function UploadFileButton() {
  const [file, setFile] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUpload = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    
    // If no file is selected
    if (!file || file.length === 0) {
      alert("Please Upload a file.");
      setLoading(false);
      return;
    } else if(file[0].size > 1000000) { // Not more than 1MB
      alert("File is more than 1MB!");
    }

    const formData = new FormData();
    formData.append("file", file[0]); // Append the first file (file[0])
    const res = await upload(formData);
    if (res) {
      router.push(`/chat/${res}`);
    }
    setLoading(false);
  };

  return (
    <>
      <input
        className="hidden"
        id="file-upload"
        accept="application/pdf"
        type="file"
        name="filename"
        onChange={(e) => {
          setFile(e.target.files);
        }}
      />
      {file && (
        <div className="flex justify-center text-red-500">File Loaded</div>
      )}
      {loading ? (
        <Button disabled className="flex text-white rounded-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <div>Please wait</div>
        </Button>
      ) : (
        <Button
          disabled={!file || file.length === 0}
          onClick={handleUpload}
          className="text-white rounded-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2"
        >
          Upload
        </Button>
      )}
    </>
  );
}
