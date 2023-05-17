import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

function AdminToogle({
  id,
  type,
  isVisible,
  getBrandOrModelAndRepairs,
  getAllModelByBrand,
}) {
  const updateIsVisibleStatut = (bool) => {
    let endpoint = "";
    if (type === 1) {
      endpoint = `/brandisvisible/${id}`;
    } else if (type === 2) {
      endpoint = `/modelisvisible/${id}`;
    } else if (type === 3) {
      endpoint = `/repairisvisible/${id}`;
    }

    axios
      .put(`${import.meta.env.VITE_PORT_BACKEND}${endpoint}`, {
        isVisible: bool,
      })
      .then(() => {
        getBrandOrModelAndRepairs();
        getAllModelByBrand();
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
    <div className="adminToogle">
      <button
        className={isVisible === 1 ? "toogle-true" : "toogle-false"}
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

export default AdminToogle;

AdminToogle.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  isVisible: PropTypes.number.isRequired,
  getBrandOrModelAndRepairs: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
};
