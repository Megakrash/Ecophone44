import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  FaCheck,
  FaTrashAlt,
  FaSkullCrossbones,
  FaSkull,
  FaTimesCircle,
} from "react-icons/fa";

function UpdateBrand({ getAllBrand, brands }) {
  const [brandSelected, setBrandSelected] = useState("");
  const [newName, setNewName] = useState("");
  const [newBrandPic, setNewBrandPic] = useState("");
  const [brandIsVisible, setBrandIsVisible] = useState(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/`;

  const getBrandSelected = (id) => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand/${id}`)
      .then((res) => {
        setBrandSelected(res.data);
        if (res.data[0].is_visible === 1) {
          setBrandIsVisible(true);
        }
        if (res.data[0].is_visible === 0) {
          setBrandIsVisible(false);
        }
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

  const uploadNewBrandPic = (data) => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandpic/${brandSelected[0].id}`,
        data
      )
      .then(() => {
        getBrandSelected(brandSelected[0].id);
      })
      .catch(() => {
        console.error("Error upload new brand pic");
      });
  };

  const handleUploadPic = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", `${brandSelected[0].name}`);
    data.append("file", newBrandPic);
    uploadNewBrandPic(data);
  };

  const updateIsVisibleStatut = (bool) => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandisvisible/${
          brandSelected[0].id
        }`,
        {
          isVisible: bool,
        }
      )
      .catch(() => {
        console.error("Statut is visible not updated");
      });
  };

  useEffect(() => {
    if (brandIsVisible === false) {
      updateIsVisibleStatut(0);
    }
    if (brandIsVisible === true) {
      updateIsVisibleStatut(1);
    }
  }, [brandIsVisible]);

  const deleteBrand = () => {
    axios
      .delete(
        `${import.meta.env.VITE_PORT_BACKEND}/brand/${brandSelected[0].id}`
      )
      .then(() => {
        setBrandSelected("");
        setShowDeleteWarning(false);
        getAllBrand();
      })
      .catch(() => {
        console.error("Error delete brand");
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
          <div className="updateBrand_infos_toogle">
            <button
              className={brandIsVisible ? "toogle-true" : "toogle-false"}
              type="button"
              onClick={() => {
                setBrandIsVisible(!brandIsVisible);
              }}
            >
              {brandIsVisible ? "En ligne" : "Hors ligne"}
            </button>
          </div>
          {brandSelected[0].pic === null ? (
            <div className="updateBrand_infos_pic">
              <img
                className="updateBrand_infos_pic_img"
                src={`${picPath}/general/default.jpg`}
                alt="logo de la marque"
              />
              <form
                action=""
                className="updateBrand_infos_pic_form"
                onSubmit={handleUploadPic}
              >
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Choisir une image"
                  accept=".jpg, .png"
                  onChange={(e) => {
                    setNewBrandPic(e.target.files[0]);
                  }}
                  required
                />

                {newBrandPic !== "" && (
                  <button
                    className="updateBrand_infos_pic_form_submit"
                    type="submit"
                    value="upload"
                  >
                    <FaCheck className="fa-submit" />
                  </button>
                )}
              </form>
            </div>
          ) : (
            <div className="updateBrand_infos_pic">
              <img
                className="updateBrand_infos_pic_img"
                src={`${picPath}/brands/${brandSelected[0].pic}`}
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
                placeholder={brandSelected[0].name}
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
