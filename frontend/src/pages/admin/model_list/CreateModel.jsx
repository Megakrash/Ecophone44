import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function CreateModel({
  setShowCreateModel,
  getAllModelByBrand,
  choosenBrandId,
}) {
  const [newModelPic, setNewModelPic] = useState({});
  const [newModelName, setNewModelName] = useState("");

  function clearFile() {
    setNewModelPic({});
  }

  const createNewModel = (data) => {
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/model`, data)
      .then(() => {
        setShowCreateModel(false);
        clearFile();
        getAllModelByBrand();
      })
      .catch(() => {
        console.error("Error create new brand");
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", newModelName);
    data.append("file", newModelPic);
    data.append("marqueId", choosenBrandId);
    createNewModel(data);
  };

  return (
    <div className="createBrand">
      <form action="" onSubmit={handleUpload} className="createBrand_form">
        <label htmlFor="picture" className="createBrand_form_label">
          Choisir une image
        </label>
        <input
          className="createBrand_form_input"
          type="file"
          id="file"
          name="file"
          placeholder="Choisir une image"
          accept=".jpg, .png"
          onChange={(e) => {
            setNewModelPic(e.target.files[0]);
          }}
          required
        />
        <label htmlFor="name" className="createBrand_form_label">
          Choisir le nom du modèle
        </label>
        <input
          className="createBrand_form_input"
          type="text"
          placeholder="Entrez le nom du nouveau modèle"
          onChange={(e) => setNewModelName(e.target.value)}
          required
        />
        <button
          className="createBrand_form_submit"
          type="submit"
          value="upload"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default CreateModel;

CreateModel.propTypes = {
  setShowCreateModel: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
};
