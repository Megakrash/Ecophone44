import React, { useState } from "react";
import PropTypes from "prop-types";

function RepairCard({ picIcon, name, price, setTotalCardPrice }) {
  const [selected, setSelected] = useState(false);
  const picPath = `${import.meta.env.VITE_PATH_IMAGE}icons/`;

  return (
    <button
      className={!selected ? "repairCard" : "repairCard card-selected"}
      type="button"
      onClick={() => {
        setSelected(true);
        setTotalCardPrice(Number(price));
      }}
    >
      <div className="repairCard_bloc">
        <img
          className="repairCard_bloc_img"
          src={picPath + picIcon}
          alt={name}
        />
        <p className="repairCard_bloc_name"> {name.toUpperCase()}</p>
      </div>
      <p className="repairCard_bloc_name">{price}.00€</p>
    </button>
  );
}

export default RepairCard;

RepairCard.propTypes = {
  picIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  setTotalCardPrice: PropTypes.func.isRequired,
};
