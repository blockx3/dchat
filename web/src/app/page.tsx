import { auth } from "../../auth";
import SignIn from "./components/SignIn";

export default async function Home() {
  const session = await auth();
  return (
    <div className="bg-[#0E0A24] h-screen text-white flex flex-col items-center justify-center ">
      <SignIn />
      {session?.user?.name}
    </div>
  );
}
