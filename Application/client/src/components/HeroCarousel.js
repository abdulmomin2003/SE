// client/src/components/HeroCarousel.js
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../styles/HeroCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Example list of image URLs
const heroImages = [
  "/Basketball.jpg",
  "/cricket.jpg",
  "/snooker.jpg",
  "/football.jpeg",
  "/table-tennis.jpg",
  "/volleyball.jpg",
];

function HeroCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(1);

  // Function to calculate slides based on screen width
  const updateSlidesToShow = () => {
    const width = window.innerWidth;

    if (width >= 1400) {
      setSlidesToShow(4); // Show 4 images for very large screens
    } else if (width >= 1024) {
      setSlidesToShow(3); // Show 3 images for desktops
    } else if (width >= 768) {
      setSlidesToShow(2); // Show 2 images for tablets
    } else {
      setSlidesToShow(1); // Show 1 image for mobile
    }
  };

  useEffect(() => {
    updateSlidesToShow(); // Initial check
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: slidesToShow, // Dynamically adjust
    slidesToScroll: 1,
    fade: slidesToShow === 1, // Enable fade only for single-image view
    arrows: true,
  };

  return (
    <div className="hero-carousel-container">
      <Slider {...settings}>
        {heroImages.map((imgUrl, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={imgUrl}
              alt={`Hero ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
      <div className="hero-overlay">
        <h1>Discover the Best Sports Facilities</h1>
        <p>Book the perfect facility for your game or training session</p>
      </div>
    </div>
  );
}

export default HeroCarousel;
