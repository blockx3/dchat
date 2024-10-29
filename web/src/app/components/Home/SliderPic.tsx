'use client'

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function SliderPic() {
  const message = "Welcome-To-dchat";
  const characters = Array.from(message); // Convert string to an array of characters

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
      {characters.map((char, index) => (
          <CarouselItem key={index} className="basis-1/4 md:basis-1/5 lg:basis-1/6">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center pb-0">
                  <span className="text-3xl md:text-7xl text-white font-semibold">{char}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
