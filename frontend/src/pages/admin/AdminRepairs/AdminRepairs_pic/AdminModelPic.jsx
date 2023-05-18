import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";

function AdminModelPic({
  choosenModelId,
  modelPic,
  modelName,
  getModelAndRepairs,
}) {
  const deleteModelPic = () => {
    axios
      .put(
        `${
          import.meta.env.VITE_PORT_BACKEND
        }/modelpic_delete/${choosenModelId}`,
        {
          pic: `${modelPic}`,
        }
      )
      .then(() => {
        getModelAndRepairs();
      })
      .catch(() => {
        console.error("Error delete model pic");
      });
  };

  const uploadNewModelPic = (data) => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/modelpic/${choosenModelId}`,
        data
      )
      .then(() => {
        getModelAndRepairs();
      })
      .catch(() => {
        console.error("Error upload new model pic");
      });
  };

  const handleUploadPic = (file) => {
    const data = new FormData();
    data.append("name", `${modelName}`);
    data.append("file", file);
    uploadNewModelPic(data);
  };

  return (
    <div className="adminModelPic">
      {modelPic === null ? (
        <div className="updateBrand_infos_pic">
          <img
            className="updateBrand_infos_pic_img default-pic"
            src={`${import.meta.env.VITE_PATH_IMAGE}/general/default.jpg`}
            alt="modèle"
          />
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Choisir une image"
            accept=".jpg, .png"
            onChange={(e) => handleUploadPic(e.target.files[0])}
            required
          />
        </div>
      ) : (
        <div className="updateBrand_infos_pic">
          <img
            className="updateBrand_infos_pic_img pic-model"
            src={`${import.meta.env.VITE_PATH_IMAGE}/models/${modelPic}`}
            alt={modelName}
          />
          <button
            className="updateBrand_infos_pic_delete"
            type="button"
            onClick={() => {
              deleteModelPic();
            }}
          >
            <FaTrashAlt className="fa-delete" />
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminModelPic;

AdminModelPic.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
  modelPic: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  modelName: PropTypes.string.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
};
AdminModelPic.defaultProps = {
  modelPic: null,
};
