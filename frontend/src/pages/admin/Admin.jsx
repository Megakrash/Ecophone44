import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";
import CreateBrandOrModel from "./AdminCreate/CreateBrandOrModel";
import UpdateBrand from "./Adminbrands/UpdateBrand";
import AdminBrandsList from "./Adminbrands/AdminBrandsList";
import AdminModelsList from "./AdminModels/AdminModelsList";
import AdminRepairs from "./AdminRepairs/AdminRepairs";
import AdminRefurb from "./AdminRefurb/AdminRefurb";

function Admin({ setUserContext, userContext }) {
  // To stock the smartphone brand list
  const [smartBrands, setSmartBrands] = useState([]);
  // To stock the tablet brand list
  const [tabBrands, setTabBrands] = useState([]);
  // When a brand is selected
  const [choosenBrandId, setChoosenBrandId] = useState(0);
  // To stock all models when a brand is selected
  const [allModelsByBrand, setAllModelsByBrand] = useState([]);
  // When a model is selected
  const [choosenModelId, setChoosenModelId] = useState(0);
  // To stock model infos when a model is selected
  const [model, setModel] = useState();

  // To stock the repairs when a model is selected
  const [repairs, setRepairs] = useState([]);

  // To show or not show create or update smartphone/tablet brand & adverts & partners
  const [showCreateSmartBrand, setShowCreateSmartBrand] = useState(false);
  const [showUpdateSmartBrand, setShowUpdateSmartBrand] = useState(false);
  const [showCreateTabBrand, setShowCreateTabBrand] = useState(false);
  const [showAdminRefurb, setShowAdminRefurb] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${userContext.userToken}`,
    },
  };

  // Get all the smartphones & tablets brand
  const getAllBrand = async () => {
    try {
      const [smartBrandRes, tabBrandRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_PORT_BACKEND}/smartbrand`, config),
        axios.get(`${import.meta.env.VITE_PORT_BACKEND}/tabbrand`, config),
      ]);
      setSmartBrands(smartBrandRes.data);
      setTabBrands(tabBrandRes.data);
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
    if (userContext !== "") {
      getAllBrand();
    }
  }, [userContext]);

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
    <div className="admin">
      <div className="admin_left">
        <div className="admin_left_panel1">
          <div className="admin_left_panel1_title">
            <p>SMARTPHONES</p>
          </div>
          <div className="admin_left_panel1_create">
            <button
              className={
                showCreateSmartBrand
                  ? "admin_left_panel1_create_btn-activ create-activ"
                  : "admin_left_panel1_create_btn create"
              }
              type="button"
              onClick={() => {
                setShowCreateSmartBrand(!showCreateSmartBrand);
                setShowUpdateSmartBrand(false);
                setShowCreateTabBrand(false);
                setShowAdminRefurb(false);
                setChoosenBrandId(0);
                setChoosenModelId(0);
                window.scrollTo(0, 0);
              }}
            >
              <FaPlusCircle className="fa-plus" />
              AJOUTER UNE MARQUE
            </button>
          </div>
          <div className="admin_left_brandlist">
            {smartBrands.length >= 1 && (
              <AdminBrandsList
                brands={smartBrands}
                getAllBrand={getAllBrand}
                choosenBrandId={choosenBrandId}
                setChoosenBrandId={setChoosenBrandId}
                setChoosenModelId={setChoosenModelId}
                setShowCreateSmartBrand={setShowCreateSmartBrand}
                setShowUpdateSmartBrand={setShowUpdateSmartBrand}
                setShowCreateTabBrand={setShowCreateTabBrand}
                setShowAdminRefurb={setShowAdminRefurb}
              />
            )}
          </div>
          <div className="admin_left_panel1_title">
            <p>TABLETTES</p>
          </div>
          <div className="admin_left_panel1_create">
            <button
              className={
                showCreateTabBrand
                  ? "admin_left_panel1_create_btn-activ create-activ"
                  : "admin_left_panel1_create_btn create"
              }
              type="button"
              onClick={() => {
                setShowCreateTabBrand(!showCreateTabBrand);
                setShowCreateSmartBrand(false);
                setShowUpdateSmartBrand(false);
                setShowAdminRefurb(false);
                setChoosenBrandId(0);
                setChoosenModelId(0);
                window.scrollTo(0, 0);
              }}
            >
              <FaPlusCircle className="fa-plus" />
              AJOUTER UNE MARQUE
            </button>
          </div>
          <div className="admin_left_brandlist">
            {tabBrands.length >= 1 && (
              <AdminBrandsList
                brands={tabBrands}
                getAllBrand={getAllBrand}
                choosenBrandId={choosenBrandId}
                setChoosenBrandId={setChoosenBrandId}
                setChoosenModelId={setChoosenModelId}
                setShowCreateSmartBrand={setShowCreateSmartBrand}
                setShowUpdateSmartBrand={setShowUpdateSmartBrand}
                setShowCreateTabBrand={setShowCreateTabBrand}
                setShowAdminRefurb={setShowAdminRefurb}
              />
            )}
          </div>
          <button
            className={
              showAdminRefurb
                ? "admin_left_panel1_advert-activ"
                : "admin_left_panel1_advert"
            }
            type="button"
            onClick={() => {
              setShowAdminRefurb(!showAdminRefurb);
              setShowCreateSmartBrand(false);
              setShowUpdateSmartBrand(false);
              setShowCreateTabBrand(false);
              setChoosenBrandId(0);
              setChoosenModelId(0);
              window.scrollTo(0, 0);
            }}
          >
            RECONDITIONNES
          </button>
        </div>

        <div className="admin_left_panel2">
          {showCreateSmartBrand === true && (
            <CreateBrandOrModel
              setShowCreateSmartBrand={setShowCreateSmartBrand}
              setShowCreateTabBrand={setShowCreateTabBrand}
              getAllBrandOrAllModelsByBrand={getAllBrand}
              smartOrTab={1}
              brandOrModel={1}
              choosenBrandId={choosenBrandId}
              setShowCreateModel={setShowCreateSmartBrand}
              showCreateModel
            />
          )}
          {showUpdateSmartBrand === true && (
            <UpdateBrand
              setShowUpdateSmartBrand={setShowUpdateSmartBrand}
              getAllBrand={getAllBrand}
              getAllModelByBrand={getAllModelByBrand}
              choosenBrandId={choosenBrandId}
              setChoosenBrandId={setChoosenBrandId}
            />
          )}
          {showCreateTabBrand === true && (
            <CreateBrandOrModel
              setShowCreateSmartBrand={setShowCreateSmartBrand}
              setShowCreateTabBrand={setShowCreateTabBrand}
              getAllBrandOrAllModelsByBrand={getAllBrand}
              smartOrTab={0}
              brandOrModel={1}
              choosenBrandId={choosenBrandId}
              setShowCreateModel={setShowCreateSmartBrand}
              showCreateModel
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
              setShowUpdateSmartBrand={setShowUpdateSmartBrand}
            />
          )}
        </div>
      </div>
      <div className="admin_right">
        {model && repairs && choosenModelId !== 0 && (
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
        {showAdminRefurb && <AdminRefurb />}
      </div>
    </div>
  );
}

export default Admin;

Admin.propTypes = {
  setUserContext: PropTypes.func.isRequired,
  userContext: PropTypes.shape({
    userToken: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};
