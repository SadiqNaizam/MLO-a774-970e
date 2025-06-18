import React from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; // Import autoplay plugin

interface CarouselProps {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
}

const Carousel: React.FC<CarouselProps> = ({ slides, options }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, ...options }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }) // Autoplay every 4 seconds
  ]);

  console.log("Rendering Carousel with", slides.length, "slides");

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No items to display in carousel.</div>;
  }

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide, index) => (
          <div className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0 p-2" key={index}>
            {slide}
          </div>
        ))}
      </div>
      {/* Optional: Add Prev/Next buttons and Dots if needed */}
    </div>
  );
};

export default Carousel;