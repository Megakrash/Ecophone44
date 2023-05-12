import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

function AdminToogleRepair({ repairId, isVisible, getModelAndRepairs }) {
  const updateIsVisibleStatut = (bool) => {
    axios
      .put(`${import.meta.env.VITE_PORT_BACKEND}/repairisvisible/${repairId}`, {
        isVisible: bool,
      })
      .then(() => {
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
    <div className="adminToogleModel">
      <button
        className={isVisible === 1 ? "toogle-model-true" : "toogle-model-false"}
        type="button"
        onClick={() => {
          handleChangeIsVisible();
        }}
      >
        {isVisible === 1 ? "En ligne" : "Hors ligne"}
      </button>
    </div>
  );
}

export default AdminToogleRepair;

AdminToogleRepair.propTypes = {
  repairId: PropTypes.number.isRequired,
  isVisible: PropTypes.number.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
};
