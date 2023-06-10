import React from "react";
import { useLocation } from "react-router-dom";
import NavbarRepair from "@components/navbar/NavbarRepair";

function Reservation() {
  const location = useLocation();
  const { brandName } = location.state;
  const { modelName } = location.state;
  const { modelPic } = location.state;
  const { totalCardPrice } = location.state;
  // const { selectedRepairs } = location.state;
  return (
    <div>
      <NavbarRepair
        brandName={brandName}
        modelName={modelName}
        modelPic={modelPic}
        price={totalCardPrice}
      />
      <p>{totalCardPrice}</p>
    </div>
  );
}

export default Reservation;
