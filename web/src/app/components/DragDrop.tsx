"use client";
import { useState } from "react";
import { upload } from "../../../actions/user";
import { useRouter } from "next/navigation";
import { CloudUpload, Loader2 } from "lucide-react";
import { LoadingUI } from "./LoadingUI";


export const DragDrop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileEnter, setFileEnter] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: { preventDefault: () => void }) => {
    if (localStorage.getItem("apikey") == null) {
      alert("Submit API Key");
    } else {
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
          // setLoading(false); // Stop loading after the process is complete
        }
      }
    }
  };

  return (
    <div>
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
              fileEnter ? "border-2 border-dashed" : "bg-[#1C1A35]"
            } mx-auto flex flex-col w-full max-w-xs h-72 items-center justify-center`}
          >
            <div className="h-full flex flex-col gap-4 justify-center text-center text-white">
              <div className="flex justify-center">
                <CloudUpload className="h-24 w-28" />
              </div>
              <div>Drag & Drop to Upload File</div>
              <div>OR</div>
              <label htmlFor="file">
                <div className="cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Select File
                </div>
              </label>
            </div>
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
          <div>
            {loading ? (
              <div className="flex flex-col gap-5 h-96 items-center justify-center">
                <LoadingUI />
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <div className="border border-gray-700 bg-[#0E0A24] rounded-lg shadow-xl p-8 flex flex-col items-center space-y-6 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Upload Your File
                </h2>

                <p className="text-gray-400 text-sm mb-6 text-center">
                  Only PDF files are allowed. Make sure your file size is below
                  1MB.
                </p>

                <button
                  onClick={handleUpload}
                  className="w-full bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] hover:from-[#5B21B6] hover:to-[#4338CA] text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Submit
                </button>

                <button
                  onClick={() => setFile(null)}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
