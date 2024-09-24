"use client";

import { useState } from "react";
import { upload } from "../../../actions/user";
import { useRouter } from "next/navigation";

export default function Upload() {
  const [file, setFile] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUpload = async (e: { preventDefault: () => void }) => {
        setLoading(true);
        e.preventDefault();
        
        if (!file || file.length === 0) {
            window.alert("Please Upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file[0]);  // Append the first file (file[0])
        const res = await upload(formData);
        if(res){
          router.push(`/chat/${res}`);
        }
        setLoading(false);
    };

  return (
    <div className="h-screen w-full flex items-center justify-center">
        <div className="text-white flex flex-col gap-5">
        <label htmlFor="file-upload" className="bg-green-500 hover:scale-110 text-3xl font-bold p-12 rounded-xl">
            Choose file
        </label>
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
            <div className="flex justify-center text-red-500">
              File Loaded
            </div>
          )}
          <button
            type="button"
            onClick={handleUpload}
            className="text-white rounded-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2"
          >
            Upload
          </button>
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}
        </div>
    </div>
  );
}
