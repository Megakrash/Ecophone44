import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { getHeader } from "@components/apiRest/ApiRestHeader";
import AddNewCarousel from "./AddNewCarousel/AddNewCarousel";
import CarouselCard from "./CarouselCard";

function AdminCarousel() {
  const [showAddAdvert, setShowAddAdvert] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  // Get the sliderData header
  const getSliderHeader = () => {
    getHeader(setSliderData);
  };

  useEffect(() => {
    getSliderHeader();
  }, []);
  return (
    <div className="adminCarousel">
      <div className="adminCarousel_add">
        <button
          className={
            showAddAdvert
              ? "adminManage_left_panel1_btn-activ"
              : "adminManage_left_panel1_btn"
          }
          type="button"
          onClick={() => {
            setShowAddAdvert(!showAddAdvert);
          }}
        >
          <FaPlusCircle className="fa-plus" />
          AJOUTER UNE PUB
        </button>
      </div>

      {showAddAdvert === true && (
        <AddNewCarousel
          getSliderHeader={getSliderHeader}
          setShowAddAdvert={setShowAddAdvert}
        />
      )}
      {sliderData.length >= 1 && (
        <CarouselCard
          getSliderHeader={getSliderHeader}
          sliderData={sliderData}
        />
      )}
    </div>
  );
}

export default AdminCarousel;
