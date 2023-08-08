import React, { useState } from "react";
import { createNewHeaderPic } from "@components/apiRest/ApiRestHeader";
import PropTypes from "prop-types";

function AddNewCarousel({ getSliderHeader, setShowAddAdvert }) {
  const [newPic, setNewPic] = useState({});
  const [newName, setNewName] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", newName);
    data.append("file", newPic);
    createNewHeaderPic(data, getSliderHeader, setShowAddAdvert);
  };

  return (
    <div className="create addNewCarousel">
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
          Choisir le nom
        </label>
        <input
          className="create_form_input"
          type="text"
          placeholder="Entrer le nom de la pub"
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

export default AddNewCarousel;

AddNewCarousel.propTypes = {
  getSliderHeader: PropTypes.func.isRequired,
  setShowAddAdvert: PropTypes.func.isRequired,
};
