import React, { useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UserContext from "../../../../context/UserContext";

function AdminDeleteModel({
  setShowDeleteRepair,
  choosenModelId,
  setChoosenModelId,
  setChoosenBrandId,
}) {
  const { userToken } = useContext(UserContext);
  const deleteModel = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .delete(
        `${import.meta.env.VITE_PORT_BACKEND}/model/${choosenModelId}`,
        config
      )
      .then(() => {
        setChoosenBrandId(0);
        setChoosenModelId(0);
      })
      .catch(() => {
        console.error("Model not deleted");
      });
  };

  return (
    <div className="adminDeleteModel">
      <p className="adminDeleteModel_title">
        Êtes-vous sur de vouloir supprimer ce modèle, sa photo ainsi que toutes
        ses réparations ?
      </p>
      <div className="adminDeleteModel_choice">
        <button
          className="adminDeleteModel_choice_btn yes"
          type="button"
          onClick={() => deleteModel()}
        >
          OUI
        </button>
        <button
          className="adminDeleteModel_choice_btn no"
          type="button"
          onClick={() => setShowDeleteRepair(false)}
        >
          NON
        </button>
      </div>
    </div>
  );
}

export default AdminDeleteModel;

AdminDeleteModel.propTypes = {
  setShowDeleteRepair: PropTypes.func.isRequired,
  choosenModelId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
};
