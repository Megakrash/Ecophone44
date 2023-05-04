import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

function UpdateBrand({
  getAllBrand,
  brands,
  setShowUpdateSmartBrand,
  setShowUpdateTabBrand,
}) {
  const [brandSelected, setBrandSelected] = useState("");
  const [newName, setNewName] = useState("");
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/marques/`;

  const getBrandSelected = (id) => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand/${id}`)
      .then((res) => {
        setBrandSelected(res.data);
      })
      .catch(() => {
        console.error("Error the get the brand selected");
      });
  };

  const updateBrand = () => {
    axios
      .put(`${import.meta.env.VITE_PORT_BACKEND}/brandname/${brandSelected}`, {
        name: `${newName}`,
      })
      .then(() => {
        getAllBrand();
        setShowUpdateSmartBrand(false);
        setShowUpdateTabBrand(false);
      })
      .catch(() => {
        console.error("Name not updated");
      });
  };

  const handleChange = (e) => {
    getBrandSelected(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateBrand();
  };

  return (
    <div className="updateBrand">
      <div className="updateBrand_choose">
        <p className="updateBrand_choose_title">Choisir la marque à modifier</p>
        <select className="updateBrand_choose_select" onChange={handleChange}>
          <option value="">---</option>
          {brands.map((infos) => {
            return (
              <option key={infos.id} value={infos.id}>
                {infos.name}
              </option>
            );
          })}
        </select>
      </div>
      {brandSelected !== "" && (
        <form onSubmit={handleUpdate} className="updateBrand_form">
          <img
            src={`${picPath}+${brandSelected[0].pic}`}
            alt="logo de la marque"
          />
          <label className="updateBrand_form_label" htmlFor="name">
            Modifier le nom de la marque
          </label>
          <input
            className="updateBrand_form_input"
            type="text"
            id="name"
            value={newName}
            placeholder={brandSelected[0].name}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <button className="updateBrand_form_submit" type="submit">
            <FaCheck />
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateBrand;

UpdateBrand.propTypes = {
  getAllBrand: PropTypes.func.isRequired,
  setShowUpdateSmartBrand: PropTypes.func.isRequired,
  setShowUpdateTabBrand: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_smart: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
