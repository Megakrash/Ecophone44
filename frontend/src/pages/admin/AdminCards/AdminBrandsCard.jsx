import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { GiGearHammer } from "react-icons/gi";

function AdminBrandCard({
  id,
  name,
  isVisible,
  choosenBrandId,
  setChoosenBrandId,
  setChoosenModelId,
  setShowCreateSmartBrand,
  setShowUpdateSmartBrand,
  setShowCreateTabBrand,
  getAllBrand,
}) {
  const isActive = id === choosenBrandId;

  const updateIsVisibleStatut = (bool) => {
    axios
      .put(`${import.meta.env.VITE_PORT_BACKEND}/brandisvisible/${id}`, {
        isVisible: bool,
      })
      .then(() => {
        getAllBrand();
      })
      .catch(() => {
        console.error("Statut is visible not updated");
      });
  };

  const handleChangeIsVisible = () => {
    if (isVisible === 1) {
      updateIsVisibleStatut(0);
    }
    if (isVisible === 0) {
      updateIsVisibleStatut(1);
    }
  };

  return (
    <div
      className={
        isActive ? "adminBrandOrModelCard-activ" : "adminBrandOrModelCard"
      }
    >
      <button
        className="adminBrandOrModelCard_name"
        type="button"
        onClick={() => {
          setChoosenBrandId(id);
          setChoosenModelId(0);
          setShowCreateSmartBrand(false);
          setShowUpdateSmartBrand(false);
          setShowCreateTabBrand(false);
          window.scrollTo(0, 0);
        }}
      >
        <span>{name.toUpperCase()}</span>
      </button>
      <button
        className="adminBrandOrModelCard_update"
        type="button"
        onClick={() => {
          setChoosenBrandId(id);
          setChoosenModelId(0);
          setShowCreateSmartBrand(false);
          setShowUpdateSmartBrand(true);
          setShowCreateTabBrand(false);
          window.scrollTo(0, 0);
        }}
      >
        <GiGearHammer className="fa-hammer" />
      </button>
      <button
        className={
          isVisible === 1
            ? "adminBrandOrModelCard_toogletrue"
            : "adminBrandOrModelCard_tooglefalse"
        }
        type="button"
        aria-label="Change visibility"
        onClick={() => {
          handleChangeIsVisible();
        }}
      />
    </div>
  );
}

export default AdminBrandCard;

AdminBrandCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isVisible: PropTypes.number.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setShowCreateSmartBrand: PropTypes.func.isRequired,
  setShowUpdateSmartBrand: PropTypes.func.isRequired,
  setShowCreateTabBrand: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
};
