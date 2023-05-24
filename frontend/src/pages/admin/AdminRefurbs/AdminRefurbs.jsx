import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaCheck, FaPen, FaChevronCircleLeft } from "react-icons/fa";
import AdminToogle from "../AdminToogle/AdminToogle";
import AdminModelPic from "../AdminRepairs/AdminRepairs_pic/AdminModelPic";
import AdminDeleteModel from "../AdminRepairs/AdminRepairs_delete/AdminDeleteModel";
import UserContext from "../../../context/UserContext";

function AdminRefurbs({
  choosenModelId,
  setChoosenModelId,
  getAllModelByBrand,
  model,
  getModelAndRepairs,
}) {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [showDeleteRepair, setShowDeleteRepair] = useState(false);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    setNewName(model.name);
    setNewDesc(model.text);
    setNewPrice(model.price);
    setShowUpdateName(false);
    setShowDeleteRepair(false);
  }, [model.text, model.price, model.name]);

  const updateModel = (property) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    // let apiPath = "";
    let data = {};

    switch (property) {
      case "name":
        // apiPath = "/modelname";
        data = { name: newName };
        break;
      case "text":
        // apiPath = "/modeltext";
        data = { text: newDesc };
        break;
      case "price":
        // apiPath = "/modelprice";
        data = { price: newPrice };
        break;
      default:
        console.error("Invalid property");
        return;
    }

    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/model/${choosenModelId}`,
        data,
        config
      )
      .then(() => {
        getModelAndRepairs();
        getAllModelByBrand();
        setShowUpdateName(false);
      })
      .catch(() => {
        console.error(`${property} not updated`);
      });
  };

  const handleUpdate = (property) => (e) => {
    e.preventDefault();
    updateModel(property);
  };

  return (
    <div className="adminRefurbs">
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
              onSubmit={handleUpdate("name")}
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
        <form
          onSubmit={handleUpdate("text")}
          className="updateBrand_infos_name"
        >
          <label
            className="updateBrand_infos_name_label label-refurb"
            htmlFor="name"
          >
            Description
          </label>
          <div className="updateBrand_infos_name_update">
            <textarea
              className="updateBrand_infos_name_update_input area-refurb"
              type="text"
              id="name"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              required
            />
            <button
              className="updateBrand_infos_name_update_submit"
              type="submit"
            >
              <FaCheck className="fa-submit" />
            </button>
          </div>
        </form>
        <form
          onSubmit={handleUpdate("price")}
          className="updateBrand_infos_name"
        >
          <label
            className="updateBrand_infos_name_label label-refurb"
            htmlFor="name"
          >
            Prix
          </label>
          <div className="updateBrand_infos_name_update">
            <input
              className="updateBrand_infos_name_update_input"
              type="text"
              id="name"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
            />
            <button
              className="updateBrand_infos_name_update_submit"
              type="submit"
            >
              <FaCheck className="fa-submit" />
            </button>
          </div>
        </form>
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
            getAllModelByBrand={getAllModelByBrand}
          />
        )}
      </div>
    </div>
  );
}

export default AdminRefurbs;

AdminRefurbs.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
  model: PropTypes.shape({
    brand_id: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    index_id: PropTypes.number.isRequired,
    is_visible: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    pic: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
};
