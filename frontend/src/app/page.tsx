import { auth } from "../../auth";
import SignIn from "./components/SignIn";

export default async function Home() {
  const session = await auth();
  return (
    <div className="bg-[#181C14] h-screen text-white">
      <SignIn />
      {session?.user?.name}
    </div>
  );
}
