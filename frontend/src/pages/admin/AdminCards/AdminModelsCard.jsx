import React from "react";
import api from "@components/apiRest/ApiRest";
import PropTypes from "prop-types";
import { RiDragMove2Fill } from "react-icons/ri";

function AdminModelCard({
  id,
  name,
  isVisible,
  choosenModelId,
  setChoosenModelId,
  setShowCreateModel,
  getAllModelByBrand,
  getModelAndRepairs,
  setShowUpdateBrand,
}) {
  const isActive = id === choosenModelId;

  const updateIsVisibleStatut = (bool) => {
    api
      .put(`/api-token/model/${id}`, {
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
      <RiDragMove2Fill className="fa-hand" />
      <button
        className={
          isActive
            ? "adminBrandOrModelCard_name name-activ"
            : "adminBrandOrModelCard_name"
        }
        type="button"
        onClick={() => {
          setChoosenModelId(id);
          setShowCreateModel(false);
          setShowUpdateBrand(false);
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
      >
        <span className="blink" />
      </button>
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
  setShowUpdateBrand: PropTypes.func.isRequired,
};
