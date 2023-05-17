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
import AdminToogle from "../AdminToogle/AdminToogle";

function UpdateBrand({ getAllBrand, brands, getAllModelByBrand }) {
  const [brandSelectId, setBrandSelectId] = useState(null);
  const [brandSelected, setBrandSelected] = useState("");
  const [newName, setNewName] = useState("");
  const [newBrandPic, setNewBrandPic] = useState("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/`;

  const getBrandSelected = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand/${brandSelectId}`)
      .then((res) => {
        setBrandSelected(res.data);
      })
      .catch(() => {
        console.error("Error to get the brand selected");
      });
  };

  const handleChangeSelect = (e) => {
    setBrandSelectId(e.target.value);
  };

  useEffect(() => {
    getBrandSelected();
  }, [brandSelectId, brands]);

  const updateBrandName = () => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandname/${brandSelected.id}`,
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
          brandSelected.id
        }`,
        {
          pic: `${brandSelected.pic}`,
        }
      )
      .then(() => {
        getBrandSelected(brandSelected.id);
      })
      .catch(() => {
        console.error("Error delete brand pic");
      });
  };

  const uploadNewBrandPic = (data) => {
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/brandpic/${brandSelected.id}`,
        data
      )
      .then(() => {
        getBrandSelected(brandSelected.id);
      })
      .catch(() => {
        console.error("Error upload new brand pic");
      });
  };

  const handleUploadPic = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", `${brandSelected.name}`);
    data.append("file", newBrandPic);
    uploadNewBrandPic(data);
  };

  const deleteBrand = () => {
    axios
      .delete(`${import.meta.env.VITE_PORT_BACKEND}/brand/${brandSelected.id}`)
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
                src={`${picPath}/brands/${brandSelected.pic}`}
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
  getAllModelByBrand: PropTypes.func.isRequired,
};
