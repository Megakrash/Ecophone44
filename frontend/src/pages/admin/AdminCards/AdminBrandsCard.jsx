import React, { useCallback } from "react";
import api from "@components/apiRest/ApiRest";
import PropTypes from "prop-types";
import { GiGearHammer } from "react-icons/gi";
import { RiDragMove2Fill } from "react-icons/ri";

function AdminBrandCard({
  id,
  isVisible,
  name,
  choosenBrandId,
  setChoosenBrandId,
  setChoosenModelId,
  setShowCreateBrand,
  setShowUpdateBrand,
  getAllBrand,
}) {
  const isActive = id === choosenBrandId;

  const updateIsVisibleStatut = (bool) => {
    api
      .put(`/api-token/brand/${id}`, {
        isVisible: bool,
      })
      .then(() => {
        getAllBrand();
      })
      .catch(() => {
        console.error("Statut is visible not updated");
      });
  };

  const handleChangeIsVisible = useCallback(() => {
    updateIsVisibleStatut(isVisible === 1 ? 0 : 1);
  }, [isVisible, updateIsVisibleStatut]);

  return (
    <div
      className={
        isActive ? "adminBrandOrModelCard-activ" : "adminBrandOrModelCard"
      }
    >
      <RiDragMove2Fill className="fa-hand" />
      <button
        className={
          isActive
            ? "adminBrandOrModelCard_name name-activ"
            : "adminBrandOrModelCard_name"
        }
        type="button"
        onClick={() => {
          setChoosenBrandId(id);
          setChoosenModelId(0);
          setShowCreateBrand(false);
          setShowUpdateBrand(false);
          window.scrollTo(0, 0);
        }}
      >
        {name.toUpperCase()}
      </button>
      <button
        className="adminBrandOrModelCard_update"
        type="button"
        onClick={() => {
          setChoosenBrandId(id);
          setChoosenModelId(0);
          setShowCreateBrand(false);
          setShowUpdateBrand(true);
          window.scrollTo(0, 0);
        }}
      >
        <GiGearHammer
          className={isActive ? "fa-hammer hammer-activ" : "fa-hammer"}
        />
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
      >
        <span className="blink" />
      </button>
    </div>
  );
}

export default AdminBrandCard;

AdminBrandCard.propTypes = {
  id: PropTypes.number.isRequired,
  isVisible: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setShowCreateBrand: PropTypes.func.isRequired,
  setShowUpdateBrand: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
};
