import UploadFileButton from "./UploadFileButton";

export default function Upload() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white flex flex-col gap-5">
        <label
          htmlFor="file-upload"
          className="bg-green-500 hover:scale-110 text-3xl font-bold p-12 rounded-xl"
        >
          Choose file
        </label>
        <UploadFileButton />
      </div>
    </div>
  );
}
