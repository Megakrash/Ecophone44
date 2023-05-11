import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AdminModelPic from "./AdminModelPic";
import AdminToogleModel from "./AdminToogleModel";
import AdminRepairList from "./AdminRepairList";

function AdminRepair({ choosenModelId }) {
  const [repairs, setRepairs] = useState([]);
  const [model, setModel] = useState({});

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
      {model.name && <h2>{model.name.toUpperCase()}</h2>}
      <div className="adminRepair_infos">
        {model && (
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
      {repairs.length >= 1 && <AdminRepairList repairs={repairs} />}
    </div>
  );
}

export default AdminRepair;

AdminRepair.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
};
