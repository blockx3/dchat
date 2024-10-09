import Description from "./Home/Description";
import Footer from "./Home/Footer";
import Hero from "./Home/Hero";
import Navbar from "./Home/Navbar";
import SliderPic from "./Home/SliderPic";
import { ThreeD } from "./Home/ThreeD";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      <div className="container flex flex-col gap-11">
        {/* Description */}
        <Description />

        {/* Cards */}
        <SliderPic />
        <ThreeD />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
