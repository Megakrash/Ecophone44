import React from "react";
import C from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 700 },
    items: 1,
    slidesToSlide: 1,
  },
};

const sliderData = [
  {
    id: 1,
    pic: "pub1.png",
  },
  {
    id: 2,
    pic: "pub2.png",
  },
  {
    id: 3,
    pic: "pub3.png",
  },
  {
    id: 4,
    pic: "pub4.png",
  },
];

function Header() {
  const Carousel = C.default ? C.default : C;
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/general/`;
  return (
    <div className="header">
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
    </div>
  );
}

export default Header;
