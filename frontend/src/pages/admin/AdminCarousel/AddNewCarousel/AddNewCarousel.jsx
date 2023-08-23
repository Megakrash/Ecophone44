import React, { useState } from "react";
import { createNewHeaderPic } from "@components/apiRest/ApiRestHeader";
import PropTypes from "prop-types";

function AddNewCarousel({ getSliderHeader, setShowAddAdvert }) {
  const [newPic, setNewPic] = useState({});
  const [newName, setNewName] = useState("");
  const [isLarge, setIsLarge] = useState(true);
  const [isSmall, setIsSmall] = useState(false);

  const handleLargeChange = () => {
    setIsLarge(true);
    setIsSmall(false);
  };

  const handleSmallChange = () => {
    setIsLarge(false);
    setIsSmall(true);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", newName);
    data.append("file", newPic);
    data.append("isLarge", isLarge);
    data.append("isSmall", isSmall);
    createNewHeaderPic(data, getSliderHeader, setShowAddAdvert);
  };
  return (
    <div className="create addNewCarousel">
      <form
        action=""
        onSubmit={handleUpload}
        className="create_form addNewCarousel_form"
      >
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
        <div className="addNewCarousel_form_toogle">
          <div>
            <input
              type="checkbox"
              id="largeCheckbox"
              checked={isLarge}
              onChange={handleLargeChange}
            />
            <label htmlFor="largeCheckbox">Large</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="smallCheckbox"
              checked={isSmall}
              onChange={handleSmallChange}
            />
            <label htmlFor="smallCheckbox">Regular</label>
          </div>
        </div>
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
