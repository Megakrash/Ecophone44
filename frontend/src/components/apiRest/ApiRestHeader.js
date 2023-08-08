import api from "./ApiRest";
import { apiRequest } from "./ApiRest";

// Header.jsx - Function to get Carousel data
export const getHeader = (setSliderData) =>
  apiRequest("get", "/api/header", null, setSliderData);

// AddNewCarousel.jsx - Add new pic for header
export const createNewHeaderPic = (data, getSliderHeader, setShowAddAdvert) => {
  api
    .post(`/api-token/header`, data)
    .then(() => {
      getSliderHeader();
      setShowAddAdvert(false);
    })
    .catch(() => {
      console.error("Error database");
    });
};

//CarouselCard.jsx - Delete pic header
export const deleteHeaderPic = (id, getSliderHeader) => {
  api
    .delete(`/api-token/header/${id}`)
    .then(() => {
      getSliderHeader();
    })
    .catch(() => {
      console.error("Error database");
    });
};
