import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UserContext from "../../../context/UserContext";

function CreateBrandOrModel({
  setShowCreateSmartBrand,
  setShowCreateTabBrand,
  setShowCreateModel,
  showCreateModel,
  getAllBrandOrAllModelsByBrand,
  smartOrTab,
  brandOrModel,
  choosenBrandId,
}) {
  const [newPic, setNewPic] = useState({});
  const [newName, setNewName] = useState("");
  const { userToken } = useContext(UserContext);

  const createNewBrandOrModel = (data) => {
    const endpoint = brandOrModel === 1 ? "/brand" : "/model";
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}${endpoint}`, data, config)
      .then(() => {
        if (brandOrModel === 1) {
          setShowCreateSmartBrand(false);
          setShowCreateTabBrand(false);
          getAllBrandOrAllModelsByBrand();
        } else {
          setShowCreateModel(!showCreateModel);
          getAllBrandOrAllModelsByBrand();
        }
      })
      .catch(() => {
        console.error(
          `Error create new ${brandOrModel === 1 ? "brand" : "model"}`
        );
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", newName);
    data.append("file", newPic);
    if (brandOrModel === 1) {
      data.append("isSmart", smartOrTab);
    }
    if (brandOrModel === 2) {
      data.append("brandId", choosenBrandId);
    }
    createNewBrandOrModel(data);
  };

  return (
    <div className="create">
      <form action="" onSubmit={handleUpload} className="create_form">
        <label htmlFor="picture" className="create_form_label">
          Choisir une image
        </label>
        <input
          className="create_form_input"
          type="file"
          id="file"
          name="file"
          placeholder="Choisir une image"
          accept=".jpg, .png"
          onChange={(e) => {
            setNewPic(e.target.files[0]);
          }}
          required
        />
        <label htmlFor="name" className="create_form_label">
          {`Choisir le nom ${
            brandOrModel === 1 ? "de la marque" : "du modèle"
          }`}
        </label>
        <input
          className="create_form_input"
          type="text"
          placeholder={`Entrer le nom ${
            brandOrModel === 1 ? "de la marque" : "du modèle"
          }`}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <button className="create_form_submit" type="submit" value="upload">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default CreateBrandOrModel;

CreateBrandOrModel.propTypes = {
  setShowCreateSmartBrand: PropTypes.func.isRequired,
  setShowCreateTabBrand: PropTypes.func.isRequired,
  setShowCreateModel: PropTypes.func.isRequired,
  showCreateModel: PropTypes.bool.isRequired,
  getAllBrandOrAllModelsByBrand: PropTypes.func.isRequired,
  smartOrTab: PropTypes.number.isRequired,
  brandOrModel: PropTypes.number.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
};
