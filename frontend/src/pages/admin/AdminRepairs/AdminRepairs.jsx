import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaCheck, FaPen, FaChevronCircleLeft } from "react-icons/fa";
import AdminModelPic from "./AdminRepairs_pic/AdminModelPic";
import AdminToogle from "../AdminToogle/AdminToogle";
import AdminRepairsList from "./AdminRepairs_list/AdminRepairsList";
import AdminCreateRepair from "./AdminRepairs_create/AdminCreateRepair";
import AdminDeleteModel from "./AdminRepairs_delete/AdminDeleteModel";
import UserContext from "../../../context/UserContext";

function AdminRepair({
  choosenModelId,
  setChoosenModelId,
  setChoosenBrandId,
  getAllModelByBrand,
  model,
  repairs,
  getModelAndRepairs,
}) {
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [newName, setNewName] = useState("");
  const [showDeleteRepair, setShowDeleteRepair] = useState(false);
  const [showCreateRepair, setShowCreateRepair] = useState(false);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    setNewName(model.name);
    setShowDeleteRepair(false);
    setShowCreateRepair(false);
    setShowUpdateName(false);
  }, [model.name]);

  const updateModelName = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/model/${choosenModelId}`,
        {
          name: `${newName}`,
        },
        config
      )
      .then(() => {
        getModelAndRepairs();
        getAllModelByBrand();
        setShowUpdateName(false);
      })
      .catch(() => {
        console.error("Name not updated");
      });
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    updateModelName();
  };

  return (
    <div className="adminRepair">
      {model.name && (
        <div className="adminRepair_name">
          {showUpdateName === false ? (
            <>
              <h2 className="adminRepair_name_title">
                {model.name.toUpperCase()}
              </h2>
              <button
                className="adminRepair_name_btn"
                type="button"
                onClick={() => setShowUpdateName(!showUpdateName)}
              >
                <FaPen className="adminRepair_name_btn_fa" />
              </button>
            </>
          ) : (
            <form
              className="adminRepair_name_update"
              onSubmit={handleUpdateName}
            >
              <input
                className="adminRepair_name_update_input"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
              <button
                className="adminRepair_name_update_btn"
                type="button"
                onClick={() => setShowUpdateName(false)}
              >
                <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
              </button>
              <button className="adminRepair_name_update_btn" type="submit">
                <FaCheck className="adminRepair_name_update_btn_fa" />
              </button>
            </form>
          )}
          <div className="adminRepair_name_toogle">
            {model && (
              <AdminToogle
                id={choosenModelId}
                type={2}
                isVisible={model.is_visible}
                getBrandOrModelAndRepairs={getModelAndRepairs}
                getAllModelByBrand={getAllModelByBrand}
              />
            )}
          </div>
        </div>
      )}
      <div className="adminRepair_infos">
        {model.name && (
          <AdminModelPic
            choosenModelId={choosenModelId}
            modelPic={model.pic}
            modelName={model.name}
            getModelAndRepairs={getModelAndRepairs}
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
            setShowCreateRepair(false);
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
            getAllModelByBrand={getAllModelByBrand}
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
            setShowDeleteRepair(false);
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
        <AdminRepairsList
          repairs={repairs}
          getModelAndRepairs={getModelAndRepairs}
          getAllModelByBrand={getAllModelByBrand}
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
  getAllModelByBrand: PropTypes.func.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  model: PropTypes.shape({
    brand_id: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    index_id: PropTypes.number.isRequired,
    is_visible: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pic: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
  repairs: PropTypes.arrayOf(
    PropTypes.shape({
      picIcon: PropTypes.string.isRequired,
      iconId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      marque: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      picModel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
      ]),
      price: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};
