import SignIn from "./components/SignIn";

export default async function Home() {
  return (
    <div className="bg-[#0E0A24] h-screen text-white flex flex-col items-center justify-center ">
      <SignIn />
    </div>
  );
}
