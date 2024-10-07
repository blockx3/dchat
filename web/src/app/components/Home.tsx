import Description from "./Home/Description";
import Hero from "./Home/Hero";
import Navbar from "./Home/Navbar";
import SliderPic from "./Home/SliderPic";

export default function Home() {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      <div className="container flex flex-col gap-11">
        {/* Description */}
        <Description />

        {/* Cards */}
        <SliderPic />
      </div>
    </div>
  );
}
