import React from "react";
import { deleteModel } from "@components/apiRest/ApiRestModel";
import PropTypes from "prop-types";

function AdminDeleteModel({
  setShowDeleteRepair,
  choosenModelId,
  setChoosenModelId,
  getAllModelByBrand,
}) {
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
          onClick={() =>
            deleteModel(choosenModelId, setChoosenModelId, getAllModelByBrand)
          }
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
  getAllModelByBrand: PropTypes.func.isRequired,
};
