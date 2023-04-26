import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function CreateBrand({ setShowCreateBrand, getAllBrand }) {
  const [newBrandPic, setNewBrandPic] = useState({});
  const [newBrandName, setNewBrandName] = useState("");

  function clearFile() {
    setNewBrandPic({});
  }

  const createNewBrand = (data) => {
    axios
      .post(`${import.meta.env.VITE_PORT_BACKEND}/brand`, data)
      .then(() => {
        setShowCreateBrand(false);
        clearFile();
        getAllBrand();
      })
      .catch(() => {
        console.error("Error create new brand");
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", newBrandName);
    data.append("file", newBrandPic);
    createNewBrand(data);
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
          accept=".jpg"
          onChange={(e) => {
            setNewBrandPic(e.target.files[0]);
          }}
          required
        />
        <label htmlFor="name" className="createBrand_form_label">
          Choisir le nom de la marque
        </label>
        <input
          className="createBrand_form_input"
          type="text"
          placeholder="Entrez le nom de la nouvelle marque"
          onChange={(e) => setNewBrandName(e.target.value)}
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

export default CreateBrand;

CreateBrand.propTypes = {
  setShowCreateBrand: PropTypes.func.isRequired,
  getAllBrand: PropTypes.func.isRequired,
};
