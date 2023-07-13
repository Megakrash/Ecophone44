import React, { useState, useEffect } from "react";
import {
  getBrandSelectedById,
  updateBrandName,
  deleteBrandPic,
  uploadNewBrandPic,
  deleteBrand,
} from "@components/apiRest/ApiRestBrand";
import PropTypes from "prop-types";
import {
  FaCheck,
  FaTrashAlt,
  FaSkullCrossbones,
  FaSkull,
  FaTimesCircle,
} from "react-icons/fa";
import AdminToogle from "../AdminToogle/AdminToogle";

function UpdateBrand({
  getAllBrand,
  getAllModelByBrand,
  choosenBrandId,
  setChoosenBrandId,
  setShowUpdateBrand,
}) {
  // Stock selected brand infos
  const [brandSelected, setBrandSelected] = useState("");
  const [newName, setNewName] = useState("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const getBrandSelected = () => {
    getBrandSelectedById(choosenBrandId, setBrandSelected);
  };

  useEffect(() => {
    if (choosenBrandId) {
      getBrandSelected();
      setNewName("");
    }
  }, [choosenBrandId, getAllBrand]);

  const handleUpdateName = (e) => {
    e.preventDefault();
    updateBrandName(brandSelected, newName, getAllBrand);
  };

  const handleUploadPic = (file) => {
    const data = new FormData();
    data.append("name", `${brandSelected.name}`);
    data.append("file", file);
    uploadNewBrandPic(brandSelected, getBrandSelected, data);
  };

  return (
    <div className="updateBrand">
      {brandSelected !== "" && (
        <div className="updateBrand_infos">
          <div className="updateBrand_infos_toogle">
            <AdminToogle
              id={brandSelected.id}
              type={1}
              isVisible={brandSelected.is_visible}
              getBrandOrModelAndRepairs={getAllBrand}
              getAllModelByBrand={getAllModelByBrand}
            />
          </div>
          {brandSelected.pic === null ? (
            <div className="updateBrand_infos_pic">
              <img
                className="updateBrand_infos_pic_img"
                src={`${import.meta.env.VITE_PATH_IMAGE}/general/default.jpg`}
                alt="logo de la marque"
              />
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Choisir une image"
                accept=".jpg, .png"
                onChange={(e) => {
                  handleUploadPic(e.target.files[0]);
                }}
                required
              />
            </div>
          ) : (
            <div className="updateBrand_infos_pic">
              <img
                className="updateBrand_infos_pic_img"
                src={`${import.meta.env.VITE_PATH_IMAGE}/brands/${
                  brandSelected.pic
                }`}
                alt="logo de la marque"
              />
              <button
                className="updateBrand_infos_pic_delete"
                type="button"
                onClick={() => {
                  deleteBrandPic(brandSelected, getBrandSelected);
                }}
              >
                <FaTrashAlt className="fa-delete" />
              </button>
            </div>
          )}
          <form onSubmit={handleUpdateName} className="updateBrand_infos_name">
            <label className="updateBrand_infos_name_label" htmlFor="name">
              Modifier le nom de la marque
            </label>
            <div className="updateBrand_infos_name_update">
              <input
                className="updateBrand_infos_name_update_input"
                type="text"
                id="name"
                value={newName}
                placeholder={brandSelected.name}
                onChange={(e) => setNewName(e.target.value)}
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
          {showDeleteWarning === false ? (
            <button
              className="updateBrand_infos_delete"
              type="button"
              onClick={() => {
                setShowDeleteWarning(true);
              }}
            >
              SUPPRIMER LA MARQUE
            </button>
          ) : (
            <div className="updateBrand_infos_confirm">
              <div className="updateBrand_infos_confirm_fa">
                <FaSkullCrossbones className="fa-crossbones" />
                <FaSkullCrossbones className="fa-crossbones" />
                <FaSkullCrossbones className="fa-crossbones" />
              </div>
              <p className="updateBrand_infos_confirm_text">
                Dude ?! T'es sur ???
              </p>
              <p className="updateBrand_infos_confirm_text">
                Cela va supprimer la marque ainsi que tous les modèles, les
                images et les réparations liés à cette marque !
              </p>
              <button
                className="updateBrand_infos_confirm_delete"
                type="button"
                onClick={() => {
                  deleteBrand(
                    brandSelected,
                    setBrandSelected,
                    setChoosenBrandId,
                    setShowUpdateBrand,
                    getAllBrand
                  );
                }}
              >
                <FaSkull className="fabig-delete" />
              </button>
              <button
                className="updateBrand_infos_confirm_cancel"
                type="button"
                onClick={() => {
                  setShowDeleteWarning(false);
                }}
              >
                <FaTimesCircle className="fabig-cancel" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UpdateBrand;

UpdateBrand.propTypes = {
  getAllBrand: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
  setShowUpdateBrand: PropTypes.func.isRequired,
};
