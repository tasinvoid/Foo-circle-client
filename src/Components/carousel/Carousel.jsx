// src/components/MySwiper.js
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./carousel.module.css"; // We'll create this custom CSS file

// Import your background images
import bg1 from "../../assets/delicious-indian-food-tray.jpg";
import bg2 from "../../assets/mixed-fried-meat-with-pomegranate-sauce.jpg";
import bg3 from "../../assets/top-view-table-full-delicious-food-composition.jpg";
import { ThemeContext } from "../../contexts/ThemeContext";

const Carousel = () => {
  const { theme } = useContext(ThemeContext);
  console.log(theme);
  const slides = [
    {
      id: 1,
      backgroundImage: bg1,
      title: "Share Food, Spread Joy",
    },
    {
      id: 2,
      backgroundImage: bg2,
      title: "Fighting Food Waste, Together",
    },
    {
      id: 3,
      backgroundImage: bg3,
      title: " Connecting Communities Through Food",
    },
  ];

  return (
    <div className="swiper-container-wrapper h-[300px] my-10 mx-auto max-w-[1700px] w-full z-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="swiper-container"
        style={{ height: "100%", borderRadius: "16px", overflow: "hidden" }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            style={{
              backgroundImage: `linear-gradient(rgba(17, 24, 39, ${
                theme === "dark" ? "0.5" : "0.1"
              }), rgba(17, 24, 39, ${
                theme === "dark" ? "0.5" : "0.1"
              })), url(${slide.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#F3F4F6",
              position: "relative",
            }}
          >
            <div
              className={`absolute inset-0 ${
                theme === "dark"
                  ? "bg-gray-950 opacity-40 backdrop-blur-sm"
                  : "bg-white opacity-20 backdrop-blur-sm"
              }`}
            ></div>
            <h2
              className={`relative z-10 text-3xl md:text-4xl font-bold drop-shadow-lg 
                         animate-fade-in-up transition-all duration-1000 ease-out ${
                           theme === "dark"
                             ? "text-indigo-400"
                             : "text-indigo-600"
                         }`}
            >
              {slide.title}
            </h2>
            <p
              className={`relative z-10 text-lg mt-4 text-center px-4 md:px-10 ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              {slide.description}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;