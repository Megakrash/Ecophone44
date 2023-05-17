import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

function AdminModelCard({
  id,
  name,
  isVisible,
  choosenModelId,
  setChoosenModelId,
  setShowCreateModel,
  getAllModelByBrand,
  getModelAndRepairs,
}) {
  const isActive = id === choosenModelId;

  const updateIsVisibleStatut = (bool) => {
    axios
      .put(`${import.meta.env.VITE_PORT_BACKEND}/modelisvisible/${id}`, {
        isVisible: bool,
      })
      .then(() => {
        getAllModelByBrand();
        getModelAndRepairs();
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
          setChoosenModelId(id);
          setShowCreateModel(false);
          window.scrollTo(0, 0);
        }}
      >
        {name.toUpperCase()}
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

export default AdminModelCard;

AdminModelCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isVisible: PropTypes.number.isRequired,
  choosenModelId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setShowCreateModel: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
};
