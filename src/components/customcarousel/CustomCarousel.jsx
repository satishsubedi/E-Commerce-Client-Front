import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { assets } from "../../assets/asset";

const CustomCarousel = () => {
  const plugin = React.useRef(

    Autoplay({ delay: 1000, stopOnInteraction: false })

  );
  console.log(plugin.current);

  return (
    <div className="flex justify-center h-[400px] ">
      <Carousel
        className="w-full "
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="w-full relative">
              <div>
                <img
                  src={assets.lb1}
                  alt="Description"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <CarouselPrevious className="static cursor-pointer" />
          <CarouselNext className="static cursor-pointer" />
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
