import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slide1 from "../../assets/Slide1img.png";
import Slide3 from "../../assets/Russia.jpg";
import Slide2 from "../../assets/exchange.png";
import './Services.css'; 

export default function Services() {
  const slides = [
    {
      title: "Earn BONUS rewards every time you pay bills with us!",
      description: "Don't wait! Earn valuable rewards by completing easy task today!",
      image: Slide1,
    },
    {
      title: "Transfer money to your local bank anytime, at lower rates.",
      description: "Send and exchange money effortlessly to Ghana, Nigeria, Cameroon, Kenya, Canada, United Kingdom, United States and Russia with ease!",
      image: Slide2,
    },
    {
      title: "Fly to any destination at a cheaper rate.!",
      description: "Why wait? Begin your journey and fly to new destinations for less.",
      image: Slide3,
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
    <div className="bg-white h-full w-full flex flex-col gap-5 items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
      <main className="bg-white w-full h-auto max-w-full rounded-3xl overflow-hidden relative">
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
            <div key={index} className="carousel-slide h-auto flex flex-col md:flex-row items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="md:w-1/2 flex flex-col justify-center mb-6 md:mb-0 text-black ">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg sm:text-[15px] md:text-[lg] lg:text-[19px] font-medium">{slide.description}</p>
              </div>
              <div className="md:w-1/2 flex justify-center items-center">
                <img src={slide.image} alt={`Slide ${index + 1} image`} className="w-full max-w-md object-contain"/>
              </div>
            </div>
          ))}
        </Carousel>
      </main>
    </div>
  );
}
