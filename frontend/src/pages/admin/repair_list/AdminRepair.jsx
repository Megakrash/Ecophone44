import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaCheck, FaPen } from "react-icons/fa";
import AdminModelPic from "./repair_model_infos/AdminModelPic";
import AdminToogle from "../toogle_isVisible/AdminToogle";
import AdminRepairList from "./AdminRepairList";
import AdminCreateRepair from "./AdminCreateRepair";
import AdminDeleteModel from "./AdminDeleteModel";

function AdminRepair({ choosenModelId, setChoosenModelId, setChoosenBrandId }) {
  const [repairs, setRepairs] = useState([]);
  const [model, setModel] = useState({});
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [newName, setNewName] = useState("");
  const [showToogle, setShowToogle] = useState(false);
  const [showDeleteRepair, setShowDeleteRepair] = useState(false);
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
      setShowToogle(true);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getModelAndRepairs();
  }, [choosenModelId]);

  const updateModelName = () => {
    axios
      .put(`${import.meta.env.VITE_PORT_BACKEND}/modelname/${choosenModelId}`, {
        name: `${newName}`,
      })
      .then(() => {
        getModelAndRepairs();
        setShowUpdateName(false);
      })
      .catch(() => {
        console.error("Name not updated");
      });
  };

  return (
    <div className="adminRepair">
      {model.name && (
        <div className="adminRepair_name">
          <h2 className="adminRepair_name_title">{model.name.toUpperCase()}</h2>
          <button
            className="adminRepair_name_btn"
            type="button"
            onClick={() => setShowUpdateName(!showUpdateName)}
          >
            <FaPen className="adminRepair_name_btn_fa" />
          </button>
          {showUpdateName === true && (
            <>
              <input
                className="adminRepair_name_input"
                type="text"
                placeholder={model.name}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                className="adminRepair_name_btn"
                type="button"
                onClick={() => updateModelName()}
              >
                <FaCheck className="adminRepair_name_btn_fa" />
              </button>
            </>
          )}
        </div>
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
        {model && showToogle && (
          <AdminToogle
            id={choosenModelId}
            type={2}
            isVisible={model.is_visible}
            getBrandOrModelAndRepairs={getModelAndRepairs}
          />
        )}
      </div>
      <div className="adminRepair_create">
        <button
          className={
            showDeleteRepair === true
              ? "adminBrandList_brand_btn-activ create-repair"
              : "adminBrandList_brand_btn create-repair"
          }
          type="button"
          onClick={() => {
            setShowDeleteRepair(!showDeleteRepair);
          }}
        >
          SUPPRIMER CE MODELE
        </button>
        {showDeleteRepair && (
          <AdminDeleteModel
            choosenModelId={choosenModelId}
            setShowDeleteRepair={setShowDeleteRepair}
            setChoosenModelId={setChoosenModelId}
            setChoosenBrandId={setChoosenBrandId}
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
  setChoosenModelId: PropTypes.func.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
};
