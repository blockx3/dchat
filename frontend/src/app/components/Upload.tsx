"use client";

import { useState } from "react";
import { upload } from "../../../actions/user";

export default function Upload() {
  const [file, setFile] = useState<FileList | null>(null);

  const handleUpload = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        
        if (!file || file.length === 0) {
            window.alert("Please Upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file[0]);  // Append the first file (file[0])
        const res = await upload(formData);
        if(res){
            console.log(res);
        }
    };

  return (
    <div className="text-white">
      <input
        accept="application/pdf"
        type="file"
        name="filename"
        id="idFile"
        onChange={(e) => {
          setFile(e.target.files);
        }}
      />
      <button
        type="button"
        onClick={handleUpload}
        className="text-white rounded-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2"
      >
        Submit
      </button>
    </div>
  );
}
