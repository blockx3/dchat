import UploadFileButton from "./UploadFileButton";

export default function Upload() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white flex flex-col gap-5">
        <label
          htmlFor="file-upload"
          className="bg-[#27219C] hover:bg-[#352fa3] text-3xl font-bold p-5 rounded-xl"
        >
          Choose file
        </label>
        <UploadFileButton />
      </div>
    </div>
  );
}
