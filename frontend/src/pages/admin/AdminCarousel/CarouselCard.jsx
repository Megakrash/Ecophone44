import React from "react";
import PropTypes from "prop-types";
import { deleteHeaderPic } from "@components/apiRest/ApiRestHeader";
import { FaTrashAlt } from "react-icons/fa";

function CarouselCard({ sliderData, getSliderHeader }) {
  const picPath = `${import.meta.env.VITE_PATH_IMAGE}header/`;
  return (
    <div className="carouselCard">
      {sliderData.map(({ id, name, pic }) => {
        return (
          <div className="carouselCard_bloc" key={id}>
            <p className="carouselCard_bloc_title">{name}</p>
            <div className="carouselCard_bloc_pic">
              <img
                className="carouselCard_bloc_pic_img"
                src={picPath + pic}
                alt="advert"
              />
              <button
                className="carouselCard_bloc_pic_btn"
                type="button"
                onClick={() => {
                  deleteHeaderPic(id, getSliderHeader);
                }}
                aria-label="Effacer l'image"
              >
                <FaTrashAlt className="fa-delete" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CarouselCard;

CarouselCard.propTypes = {
  sliderData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pic: PropTypes.string.isRequired,
    })
  ).isRequired,
  getSliderHeader: PropTypes.func.isRequired,
};
