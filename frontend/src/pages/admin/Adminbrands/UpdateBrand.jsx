import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  FaCheck,
  FaTrashAlt,
  FaSkullCrossbones,
  FaSkull,
  FaTimesCircle,
} from "react-icons/fa";
import AdminToogle from "../AdminToogle/AdminToogle";
import UserContext from "../../../context/UserContext";

function UpdateBrand({
  getAllBrand,
  getAllModelByBrand,
  choosenBrandId,
  setChoosenBrandId,
  setShowUpdateSmartBrand,
}) {
  // Stock selected brand infos
  const [brandSelected, setBrandSelected] = useState("");
  const [newName, setNewName] = useState("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  // Get the userToken & create config for headers Authorization
  const { userToken } = useContext(UserContext);
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  // Get brand selected infos
  const getBrandSelected = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand/${choosenBrandId}`)
      .then((res) => {
        setBrandSelected(res.data);
        setNewName("");
      })
      .catch(() => {
        console.error("Error to get the brand selected");
      });
  };

  useEffect(() => {
    getBrandSelected();
  }, [choosenBrandId, getAllBrand]);

  // Patch the new brand name
  const updateBrandName = () => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandname/${brandSelected.id}`,
        {
          name: `${newName}`,
        },
        config
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

  // Delete the brand pic then patch the name in brands table to null
  const deleteBrandPic = () => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandpic_delete/${
          brandSelected.id
        }`,
        {
          pic: `${brandSelected.pic}`,
        },
        config
      )
      .then(() => {
        getBrandSelected(brandSelected.id);
      })
      .catch(() => {
        console.error("Error delete brand pic");
      });
  };

  // Post new brand pic then patch name in brands table
  const uploadNewBrandPic = (data) => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandpic/${brandSelected.id}`,
        data,
        config
      )
      .then(() => {
        getBrandSelected(brandSelected.id);
      })
      .catch(() => {
        console.error("Error upload new brand pic");
      });
  };

  const handleUploadPic = (file) => {
    const data = new FormData();
    data.append("name", `${brandSelected.name}`);
    data.append("file", file);
    uploadNewBrandPic(data);
  };

  // Delete the brand & all his models & repairs
  const deleteBrand = () => {
    axios
      .delete(
        `${import.meta.env.VITE_PORT_BACKEND}/brand/${brandSelected.id}`,
        config
      )
      .then(() => {
        setBrandSelected("");
        setChoosenBrandId(0);
        setShowUpdateSmartBrand(false);
        getAllBrand();
      })
      .catch(() => {
        console.error("Error delete brand");
      });
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
                  deleteBrandPic();
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
                  deleteBrand();
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
  setShowUpdateSmartBrand: PropTypes.func.isRequired,
};
