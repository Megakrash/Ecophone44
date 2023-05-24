import React, { useContext, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { GiGearHammer } from "react-icons/gi";
import UserContext from "../../../context/UserContext";

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
  const { userToken } = useContext(UserContext);
  const isActive = id === choosenBrandId;

  const updateIsVisibleStatut = (bool) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brand/${id}`,
        {
          isVisible: bool,
        },
        config
      )
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
      <button
        className="adminBrandOrModelCard_name"
        type="button"
        onClick={() => {
          setChoosenBrandId(id);
          setChoosenModelId(0);
          setShowCreateBrand(false);
          setShowUpdateBrand(false);
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
          setShowCreateBrand(false);
          setShowUpdateBrand(true);
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
  isVisible: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setShowCreateBrand: PropTypes.func.isRequired,
  setShowUpdateBrand: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
};
