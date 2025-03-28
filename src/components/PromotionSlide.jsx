import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function PromotionSlide() {
  const slides = [
    {
      description: "What are you waiting for? Start collecting your valuable rewards for completing simple tasks.",
    },
    {
      description: "What are you waiting for? Start collecting your valuable rewards for completing simple tasks.",
    },
    {
      description: "What are you waiting for? Start collecting your valuable rewards for completing simple tasks.",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="bg-white dark:bg-black h-full w-full flex flex-col gap-5 items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
      <main className="bg-white dark:bg-[#333] w-full h-auto max-w-full rounded-3xl overflow-hidden relative">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite={true}
          showDots={true}
          customTransition="all 0.5s ease-in-out"
          containerClass="carousel-container"
          itemClass="carousel-item"
          dotListClass="custom-dot-list"
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-slide h-auto flex flex-col md:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-8">
              <div className="md:w-1/2 flex flex-col justify-center mb-6 md:mb-0 text-black dark:text-white">
                <p className="text-lg w-full text-[10px] md:text-[lg] lg:text-[14px] font-medium">{slide.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
       
      </main>
    </div>
  );
}
