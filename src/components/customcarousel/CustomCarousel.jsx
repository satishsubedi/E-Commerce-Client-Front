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
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  console.log(plugin.current);

  return (
    <div className="flex justify-center  h-screen ">
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
                  className="w-full h-screen object-cover"
                />
              </div>
              {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="bg-black bg-opacity-60 text-white px-6 py-3 rounded-lg shadow text-center">
                  <h3 className="text-xl font-semibold">Best Seller</h3>
                  <p className="text-sm mt-1">
                    Your bottom-center caption here
                  </p>
                </div>
              </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-7 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" />
        <CarouselNext className="absolute right-7 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
