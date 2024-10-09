"use client";
import { useState } from "react";
import { upload } from "../../../actions/user";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const DragDrop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileEnter, setFileEnter] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();

    // Get file extension like 'pdf, docx'
    // TODO ts error

    //@ts-expect-error TODO
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // If no file is selected
    if (!file) {
      alert("Please Upload a file.");
      setLoading(false);
      return;
    } else if (fileExtension !== "pdf") {
      alert("Only pdf");
      setLoading(false);
    } else if (file.size > 1000000) {
      // Not more than 1MB
      alert("File is more than 1MB!");
      setLoading(false);
    } else {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await upload(formData);
        if (res) {
          router.push(`/chat/${res}`);
        }
      } catch (error) {
        console.error("Upload failed", error);
        alert("File upload failed.");
      } finally {
        setLoading(false); // Stop loading after the process is complete
      }
    }
  };

  return (
    <div className="container px-4 max-w-5xl mx-auto">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true); // Set fileEnter to true when dragging over the area
          }}
          onDragLeave={() => {
            setFileEnter(false); // Reset fileEnter when dragging leaves the area
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false); // Reset fileEnter after dropping
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              setFile(files[0]); // Set the file
            }
          }}
          className={`${
            fileEnter ? "bg-red-700" : "bg-slate-500"
          } mx-auto flex flex-col w-full max-w-xs h-72 border-2 border-dashed items-center justify-center`}
        >
          <label
            htmlFor="file"
            className="h-full flex flex-col justify-center text-center text-white"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files[0]) {
                setFile(files[0]);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <button onClick={handleUpload}>Submit</button>
              <button
                onClick={() => setFile(null)}
                className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
              >
                Reset
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
