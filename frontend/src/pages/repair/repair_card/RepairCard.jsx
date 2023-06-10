import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

function RepairCard({
  picIcon,
  name,
  price,
  handleTotalPrice,
  handleRepairSelect,
  handleRepairDeselect,
}) {
  const [selected, setSelected] = useState(false);
  const picPath = `${import.meta.env.VITE_PATH_IMAGE}icons/`;

  const handleClick = () => {
    setSelected(!selected);
    handleTotalPrice(price, !selected);
    if (selected) {
      handleRepairDeselect(name);
    } else {
      handleRepairSelect(name, price);
    }
  };

  return (
    <button
      className={!selected ? "repairCard" : "repairCard card-selected"}
      type="button"
      onClick={handleClick}
    >
      <div className="repairCard_bloc">
        <img
          className="repairCard_bloc_img"
          src={picPath + picIcon}
          alt={name}
        />
        <p className="repairCard_bloc_name"> {name.toUpperCase()}</p>
      </div>
      <div className="repairCard_price">
        <p
          className={
            !selected
              ? "repairCard_bloc_name"
              : " repairCard_bloc_name activ-price"
          }
        >
          {price}.00€
        </p>
        <div
          className={
            !selected
              ? "repairCard_price_checkbox"
              : "repairCard_price_checkbox activ-checkbox"
          }
        >
          {selected && <FaCheck className="fa-checkbox" />}
        </div>
      </div>
    </button>
  );
}

export default RepairCard;

RepairCard.propTypes = {
  picIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleTotalPrice: PropTypes.func.isRequired,
  handleRepairSelect: PropTypes.func.isRequired,
  handleRepairDeselect: PropTypes.func.isRequired,
};
