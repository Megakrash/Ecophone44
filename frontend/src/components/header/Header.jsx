import React, { useEffect, useState } from "react";
import { getHeader } from "@components/apiRest/ApiRestHeader";
import C from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 370 },
    items: 1,
    slidesToSlide: 1,
  },
};

function Header() {
  const Carousel = C.default ? C.default : C;
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/header/`;
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    getHeader(setSliderData);
  }, []);

  // Check window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth < 700;

  const filteredSliderData = sliderData.filter((item) => {
    if (isMobile) {
      return item.pic.includes("_small");
    }
    return item.pic.includes("_large");
  });

  return (
    <div className="header">
      {filteredSliderData.length >= 1 && (
        <Carousel
          containerClass=""
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={5000}
        >
          {filteredSliderData.map(({ id, pic }) => {
            return (
              <img
                key={id}
                className="header_img"
                src={picPath + pic}
                alt="Ecophone 44"
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
}

export default Header;
