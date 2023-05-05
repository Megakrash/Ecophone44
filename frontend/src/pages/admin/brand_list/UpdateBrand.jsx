import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaCheck, FaTrashAlt } from "react-icons/fa";

function UpdateBrand({ getAllBrand, brands }) {
  const [brandSelected, setBrandSelected] = useState("");
  const [newName, setNewName] = useState("");
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/`;

  const getBrandSelected = (id) => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand/${id}`)
      .then((res) => {
        setBrandSelected(res.data);
      })
      .catch(() => {
        console.error("Error to get the brand selected");
      });
  };

  const handleChangeSelect = (e) => {
    getBrandSelected(e.target.value);
  };

  const updateBrandName = () => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandname/${brandSelected[0].id}`,
        {
          name: `${newName}`,
        }
      )
      .then(() => {
        getAllBrand();
      })
      .catch(() => {
        console.error("Name not updated");
      });
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    updateBrandName();
  };

  const deleteBrandPic = () => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandpic_delete/${
          brandSelected[0].id
        }`,
        {
          pic: `${brandSelected[0].pic}`,
        }
      )
      .then(() => {
        getBrandSelected(brandSelected[0].id);
      })
      .catch(() => {
        console.error("Error delete brand pic");
      });
  };

  return (
    <div className="updateBrand">
      <div className="updateBrand_select">
        <p className="updateBrand_select_title">Choisir la marque à modifier</p>
        <select
          className="updateBrand_select_option"
          onChange={handleChangeSelect}
        >
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
        <div className="updateBrand_infos">
          {brandSelected[0].pic === null ? (
            <div className="updateBrand_infos_pic">
              <img
                className="updateBrand_infos_pic_img"
                src={`${picPath}/general/default.jpg`}
                alt="logo de la marque"
              />
            </div>
          ) : (
            <div className="updateBrand_infos_pic">
              <img
                className="updateBrand_infos_pic_img"
                src={`${picPath}/marques/${brandSelected[0].pic}`}
                alt="logo de la marque"
              />
              <button
                className="updateBrand_infos_pic_delete"
                type="button"
                onClick={() => {
                  deleteBrandPic();
                }}
              >
                <FaTrashAlt className="fa-delete" />
              </button>
            </div>
          )}

          <div className="updateBrand_infos_toogle" />
          <form onSubmit={handleUpdateName} className="updateBrand_infos_name">
            <label className="updateBrand_form_label" htmlFor="name">
              Modifier le nom de la marque
            </label>
            <input
              className="updateBrand_infos_form_input"
              type="text"
              id="name"
              value={newName}
              placeholder={brandSelected[0].name}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <button className="updateBrand_infos_form_submit" type="submit">
              <FaCheck />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateBrand;

UpdateBrand.propTypes = {
  getAllBrand: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      index_id: PropTypes.number.isRequired,
      is_smart: PropTypes.number.isRequired,
      is_visible: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pic: PropTypes.string,
    })
  ).isRequired,
};
