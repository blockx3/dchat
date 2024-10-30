import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApiLimitCross() {
  return (
    <div className="bg-[#0E0A24] min-h-screen flex flex-col">
      <div className="p-4">
        <Link href="/upload" className="text-white">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex-grow flex justify-center items-center text-center text-white">
        <div className="border rounded-xl p-14">
          <div className="text-7xl pb-4">404</div>
          <div className="md:text-3xl text-xl">
            Exceeded API usage limit<br/> or <br/> Invalid API key.
          </div>
        </div>
      </div>
    </div>
  );
}
