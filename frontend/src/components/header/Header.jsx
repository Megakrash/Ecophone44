import React, { useEffect, useState } from "react";
import { getHeader } from "@components/apiRest/ApiRestHeader";
import C from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 700 },
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
  return (
    <div className="header">
      {sliderData.length >= 1 && (
        <Carousel
          containerClass=""
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={5000}
        >
          {sliderData.map(({ id, pic }) => {
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
