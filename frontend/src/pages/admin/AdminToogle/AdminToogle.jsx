import React, { useCallback } from "react";
import api from "@components/apiRest/ApiRest";
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
      endpoint = `/brand/${id}`;
    } else if (type === 2) {
      endpoint = `/model/${id}`;
    } else if (type === 3) {
      endpoint = `/repairisvisible/${id}`;
    }

    api
      .put(`${endpoint}`, {
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

  const handleChangeIsVisible = useCallback(() => {
    updateIsVisibleStatut(isVisible === 1 ? 0 : 1);
  }, [isVisible, updateIsVisibleStatut]);

  return (
    <div className="adminToogle">
      <button
        className={isVisible === 1 ? "toogle-true" : "toogle-false"}
        type="button"
        onClick={() => {
          handleChangeIsVisible();
        }}
      >
        {isVisible === 1 ? "EN LIGNE" : "HORS LIGNE"}
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
