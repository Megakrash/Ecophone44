import React, { useState, useEffect } from "react";
import api from "@components/apiRest/ApiRest";
import PropTypes from "prop-types";
import { FaCheck, FaPen, FaChevronCircleLeft } from "react-icons/fa";
import AdminToogle from "../AdminToogle/AdminToogle";
import AdminModelPic from "../AdminRepairs/AdminRepairs_pic/AdminModelPic";
import AdminDeleteModel from "../AdminRepairs/AdminRepairs_delete/AdminDeleteModel";

function AdminRefurbs({
  choosenModelId,
  setChoosenModelId,
  getAllModelByBrand,
  name,
  text,
  price,
  isVisible,
  pic,
  getModelAndRepairs,
}) {
  const [newName, setNewName] = useState("");
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [newText, setNewText] = useState("");
  const [showUpdateText, setShowUpdateText] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [showUpdatePrice, setShowUpdatePrice] = useState(false);
  const [showDeleteRepair, setShowDeleteRepair] = useState(false);

  useEffect(() => {
    if (text !== null && price !== null && name !== null) {
      setNewName(name);
      setNewText(text);
      setNewPrice(price);
    }
    setShowUpdateName(false);
    setShowDeleteRepair(false);
  }, [text, price, name]);

  const updateModel = (property) => {
    let data = {};

    switch (property) {
      case "name":
        data = { name: newName };
        break;
      case "text":
        data = { text: newText };
        break;
      case "price":
        data = { price: newPrice };
        break;
      default:
        console.error("Invalid property");
        return;
    }

    api
      .put(`/api-token/model/${choosenModelId}`, data)
      .then(() => {
        getModelAndRepairs();
        getAllModelByBrand();
        setShowUpdateName(false);
        setShowUpdateText(false);
        setShowUpdatePrice(false);
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
      {newName !== "" && (
        <div className="adminRepair_name">
          {showUpdateName === false ? (
            <>
              <h2 className="adminRepair_name_title">
                {newName.toUpperCase()}
              </h2>
              <button
                className="adminRepair_name_btn"
                type="button"
                onClick={() => setShowUpdateName(!showUpdateName)}
                aria-label="Update"
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
                aria-label="Update name"
              >
                <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
              </button>
              <button className="adminRepair_name_update_btn" type="submit">
                <FaCheck
                  className="adminRepair_name_update_btn_fa"
                  aria-label="Update name"
                />
              </button>
            </form>
          )}
          <div className="adminRepair_name_toogle">
            <AdminToogle
              id={choosenModelId}
              type={2}
              isVisible={isVisible}
              getBrandOrModelAndRepairs={getModelAndRepairs}
              getAllModelByBrand={getAllModelByBrand}
            />
          </div>
        </div>
      )}
      <div className="adminRepair_infos">
        <AdminModelPic
          choosenModelId={choosenModelId}
          modelPic={pic}
          modelName={name}
          getModelAndRepairs={getModelAndRepairs}
        />

        {showUpdateText === false ? (
          <div className="adminUpdateRepair_bloc">
            <p className="adminUpdateRepair_bloc_text text-refurb">{newText}</p>
            <button
              className="adminUpdateRepair_bloc_btn"
              type="button"
              onClick={() => setShowUpdateText(!showUpdateText)}
              aria-label="Text update"
            >
              <FaPen className="adminUpdateRepair_bloc_btn_fa" />
            </button>
          </div>
        ) : (
          <form
            action=""
            onSubmit={handleUpdate("text")}
            className="adminUpdateRepair_form"
          >
            <textarea
              className="adminUpdateRepair_form_bloc_input repair-area input-refurb"
              type="text"
              value={newText}
              placeholder={text}
              onChange={(e) => setNewText(e.target.value)}
              aria-label="Update name"
              required
            />
            <button
              className="adminRepair_name_update_btn"
              type="button"
              onClick={() => setShowUpdateText(false)}
              aria-label="Submit Update name"
            >
              <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
            </button>
            <button
              className="adminRepair_name_update_btn"
              type="submit"
              aria-label="submit"
            >
              <FaCheck className="adminRepair_name_update_btn_fa" />
            </button>
          </form>
        )}

        {showUpdatePrice === false ? (
          <div className="adminUpdateRepair_bloc">
            <p className="adminRepairCard_infos_text_euros price-refurb">
              {newPrice.toUpperCase()}
              {newPrice === "nc" ? "" : ".00€"}
            </p>
            <button
              className="adminUpdateRepair_bloc_btn"
              type="button"
              onClick={() => setShowUpdatePrice(!showUpdatePrice)}
              aria-label="Price update"
            >
              <FaPen className="adminUpdateRepair_bloc_btn_fa" />
            </button>
          </div>
        ) : (
          <form
            action=""
            onSubmit={handleUpdate("price")}
            className="adminUpdateRepair_form"
          >
            <input
              className="adminUpdateRepair_form_input input-refurb"
              type="text"
              value={newPrice}
              placeholder={price}
              onChange={(e) => setNewPrice(e.target.value)}
              aria-label="Update price"
              required
            />
            <button
              className="adminRepair_name_update_btn"
              type="button"
              onClick={() => setShowUpdatePrice(false)}
              aria-label="Submit Update price"
            >
              <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
            </button>
            <button
              className="adminRepair_name_update_btn"
              type="submit"
              aria-label="Submit Update price"
            >
              <FaCheck className="adminRepair_name_update_btn_fa" />
            </button>
          </form>
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
  name: PropTypes.string,
  text: PropTypes.string,
  price: PropTypes.string,
  isVisible: PropTypes.number,
  pic: PropTypes.string,
  getModelAndRepairs: PropTypes.func.isRequired,
};

AdminRefurbs.defaultProps = {
  name: undefined,
  text: undefined,
  price: undefined,
  isVisible: undefined,
  pic: undefined,
};
