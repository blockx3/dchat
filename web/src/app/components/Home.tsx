'use client'

import Description from "./Home/Description";
import FooterSection from "./Home/FooterSection";
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
      <FooterSection />
    </div>
  );
}
