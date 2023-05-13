import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AdminModelPic from "./repair_model_infos/AdminModelPic";
import AdminToogleModel from "./repair_model_infos/AdminToogleModel";
import AdminRepairList from "./AdminRepairList";
import AdminCreateRepair from "./AdminCreateRepair";

function AdminRepair({ choosenModelId }) {
  const [repairs, setRepairs] = useState([]);
  const [model, setModel] = useState({});
  const [showCreateRepair, setShowCreateRepair] = useState(false);

  const getModelAndRepairs = async () => {
    try {
      const [allRepairs, getModel] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_PORT_BACKEND}/repairs/${choosenModelId}`
        ),
        axios.get(
          `${import.meta.env.VITE_PORT_BACKEND}/model/${choosenModelId}`
        ),
      ]);
      setRepairs(allRepairs.data);
      setModel(getModel.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getModelAndRepairs();
  }, [choosenModelId]);

  return (
    <div className="adminRepair">
      {model.name && (
        <h2 className="adminRepair_title">{model.name.toUpperCase()}</h2>
      )}
      <div className="adminRepair_infos">
        {model.name && model.pic && (
          <AdminModelPic
            choosenModelId={choosenModelId}
            modelPic={model.pic}
            modelName={model.name}
            getModelAndRepairs={getModelAndRepairs}
          />
        )}
        {model && (
          <AdminToogleModel
            choosenModelId={choosenModelId}
            isVisible={model.is_visible}
            getModelAndRepairs={getModelAndRepairs}
          />
        )}
      </div>
      <div className="adminRepair_create">
        <button
          className={
            showCreateRepair === true
              ? "adminBrandList_brand_btn-activ create-repair"
              : "adminBrandList_brand_btn create-repair"
          }
          type="button"
          onClick={() => {
            setShowCreateRepair(!showCreateRepair);
          }}
        >
          AJOUTER UNE REPARATION
        </button>
        {showCreateRepair && (
          <AdminCreateRepair
            choosenModelId={choosenModelId}
            getModelAndRepairs={getModelAndRepairs}
            setShowCreateRepair={setShowCreateRepair}
          />
        )}
      </div>
      {repairs.length >= 1 && (
        <AdminRepairList
          repairs={repairs}
          getModelAndRepairs={getModelAndRepairs}
        />
      )}
    </div>
  );
}

export default AdminRepair;

AdminRepair.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
};
