import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";
import CreateBrandOrModel from "./AdminCreate/CreateBrandOrModel";
import UpdateBrand from "./Adminbrands/UpdateBrand";
import AdminBrandsList from "./Adminbrands/AdminBrandsList";
import AdminModelsList from "./AdminModels/AdminModelsList";
import AdminRepairs from "./AdminRepairs/AdminRepairs";
import AdminRefurbs from "./AdminRefurbs/AdminRefurbs";

function AdminManage({
  type,
  userToken,
  setUserContext,
  choosenBrandId,
  setChoosenBrandId,
  choosenModelId,
  setChoosenModelId,
  showCreateBrand,
  setShowCreateBrand,
}) {
  // Stock the brands
  const [brands, setBrands] = useState([]);
  // To stock all models when a brand is selected
  const [allModelsByBrand, setAllModelsByBrand] = useState([]);
  // To stock model infos when a model is selected
  const [model, setModel] = useState();
  // To stock the repairs when a model is selected
  const [repairs, setRepairs] = useState([]);
  // To show components
  const [showUpdateBrand, setShowUpdateBrand] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const getAllBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brands/${type}`, config)
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("Eco44Token");
          setUserContext("");
        } else {
          console.error("Error database");
        }
      });
  };

  useEffect(() => {
    getAllBrand();
  }, [type]);

  // When a brand is selected get all the models
  const getAllModelByBrand = () => {
    axios
      .get(
        `${import.meta.env.VITE_PORT_BACKEND}/modelbybrand/${choosenBrandId}`,
        config
      )
      .then((res) => {
        setAllModelsByBrand(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("Eco44Token");
          setUserContext("");
        } else {
          console.error("Name not updated");
        }
      });
  };

  useEffect(() => {
    if (choosenBrandId !== 0) {
      getAllModelByBrand();
    }
  }, [choosenBrandId]);

  // When a model is selected get the model infos and all repairs for this model
  const getModelAndRepairs = async () => {
    try {
      const [allRepairs, getModel] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_PORT_BACKEND}/repairs/${choosenModelId},`,
          config
        ),
        axios.get(
          `${import.meta.env.VITE_PORT_BACKEND}/model/${choosenModelId}`,
          config
        ),
      ]);
      setRepairs(allRepairs.data);
      setModel(getModel.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("Eco44Token");
        setUserContext("");
      } else {
        console.error("error", error);
      }
    }
  };

  useEffect(() => {
    if (choosenModelId !== 0) {
      getModelAndRepairs();
    }
  }, [choosenModelId]);
  return (
    <div className="adminManage">
      <div className="adminManage_left">
        <div className="adminManage_left_panel1">
          <button
            className={
              showCreateBrand
                ? "adminManage_left_panel1_btn-activ"
                : "adminManage_left_panel1_btn"
            }
            type="button"
            onClick={() => {
              setShowCreateBrand(!showCreateBrand);
              setShowUpdateBrand(false);
              setChoosenBrandId(0);
              setChoosenModelId(0);
              window.scrollTo(0, 0);
            }}
          >
            <FaPlusCircle className="fa-plus" />
            AJOUTER UNE MARQUE
          </button>
          {brands.length >= 1 && (
            <AdminBrandsList
              brands={brands}
              choosenBrandId={choosenBrandId}
              setChoosenBrandId={setChoosenBrandId}
              setChoosenModelId={setChoosenModelId}
              getAllBrand={getAllBrand}
              setShowCreateBrand={setShowCreateBrand}
              setShowUpdateBrand={setShowUpdateBrand}
            />
          )}
        </div>

        <div className="adminManage_left_panel2">
          {showCreateBrand && (
            <CreateBrandOrModel
              getAllBrandOrAllModelsByBrand={getAllBrand}
              showCreateBrandOrModel={showCreateBrand}
              setShowCreateBrandOrModel={setShowCreateBrand}
              type={type}
              brandOrModel={1}
              choosenBrandId={choosenBrandId}
            />
          )}
          {showUpdateBrand && choosenBrandId !== 0 && (
            <UpdateBrand
              getAllBrand={getAllBrand}
              getAllModelByBrand={getAllModelByBrand}
              choosenBrandId={choosenBrandId}
              setChoosenBrandId={setChoosenBrandId}
              setShowUpdateBrand={setShowUpdateBrand}
            />
          )}
          {choosenBrandId !== 0 && (
            <AdminModelsList
              choosenBrandId={choosenBrandId}
              choosenModelId={choosenModelId}
              setChoosenModelId={setChoosenModelId}
              getAllBrand={getAllBrand}
              getAllModelByBrand={getAllModelByBrand}
              allModelsByBrand={allModelsByBrand}
              getModelAndRepairs={getModelAndRepairs}
              setShowUpdateBrand={setShowUpdateBrand}
              type={type}
            />
          )}
        </div>
      </div>
      <div className="adminManage_right">
        {model && repairs && choosenModelId !== 0 && type !== 3 && (
          <AdminRepairs
            choosenModelId={choosenModelId}
            setChoosenModelId={setChoosenModelId}
            setChoosenBrandId={setChoosenBrandId}
            getAllModelByBrand={getAllModelByBrand}
            repairs={repairs}
            model={model}
            getModelAndRepairs={getModelAndRepairs}
          />
        )}
        {model && choosenModelId !== 0 && type === 3 && (
          <AdminRefurbs
            choosenModelId={choosenModelId}
            setChoosenModelId={setChoosenModelId}
            getAllModelByBrand={getAllModelByBrand}
            name={model.name}
            text={model.text}
            price={model.price}
            pic={model.pic}
            isVisible={model.is_visible}
            getModelAndRepairs={getModelAndRepairs}
          />
        )}
      </div>
    </div>
  );
}

export default AdminManage;

AdminManage.propTypes = {
  type: PropTypes.number.isRequired,
  userToken: PropTypes.string.isRequired,
  setUserContext: PropTypes.func.isRequired,
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenBrandId: PropTypes.func.isRequired,
  choosenModelId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
  showCreateBrand: PropTypes.bool.isRequired,
  setShowCreateBrand: PropTypes.func.isRequired,
};
