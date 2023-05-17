import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateBrandOrModel from "./AdminCreate/CreateBrandOrModel";
import UpdateBrand from "./Adminbrands/UpdateBrand";
import AdminBrandsList from "./Adminbrands/AdminBrandsList";
import AdminModelsList from "./AdminModels/AdminModelsList";
import AdminRepairs from "./AdminRepairs/AdminRepairs";

function Admin() {
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
  const [model, setModel] = useState({});
  // To stock the repairs when a model is selected
  const [repairs, setRepairs] = useState([]);

  // To show or not show create or update smartphone/tablet brand
  const [showCreateSmartBrand, setShowCreateSmartBrand] = useState(false);
  const [showUpdateSmartBrand, setShowUpdateSmartBrand] = useState(false);
  const [showCreateTabBrand, setShowCreateTabBrand] = useState(false);
  const [showUpdateTabBrand, setShowUpdateTabBrand] = useState(false);

  // Get all the smartphones & tablets brand
  const getAllBrand = async () => {
    try {
      const [smartBrandRes, tabBrandRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_PORT_BACKEND}/smartbrand`),
        axios.get(`${import.meta.env.VITE_PORT_BACKEND}/tabbrand`),
      ]);
      setSmartBrands(smartBrandRes.data);
      setTabBrands(tabBrandRes.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getAllBrand();
  }, []);

  // When a brand is selected get all the models
  const getAllModelByBrand = () => {
    axios
      .get(
        `${import.meta.env.VITE_PORT_BACKEND}/modelbybrand/${choosenBrandId}`
      )
      .then((res) => {
        setAllModelsByBrand(res.data);
      })
      .catch(() => {
        console.error("error");
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
          `${import.meta.env.VITE_PORT_BACKEND}/repairs/${choosenModelId}`
        ),
        axios.get(
          `${import.meta.env.VITE_PORT_BACKEND}/model/${choosenModelId}`
        ),
      ]);
      setRepairs(allRepairs.data);
      setModel(getModel.data);
    } catch (error) {
      console.error("error", error);
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
          <div className="admin_left_panel1_smartphone">
            <p>SMARTPHONES</p>
          </div>
          <div className="admin_left_panel1_create">
            <button
              className={
                showCreateSmartBrand
                  ? "admin_left_panel1_create_btn-activ"
                  : "admin_left_panel1_create_btn"
              }
              type="button"
              onClick={() => {
                setShowCreateSmartBrand(!showCreateSmartBrand);
                setShowUpdateSmartBrand(false);
                setShowCreateTabBrand(false);
                setShowUpdateTabBrand(false);
                setChoosenBrandId(0);
                setChoosenModelId(0);
                window.scrollTo(0, 0);
              }}
            >
              AJOUTER UNE MARQUE
            </button>
          </div>
          <div className="admin_left_panel1_create">
            <button
              className={
                showUpdateSmartBrand
                  ? "admin_left_panel1_create_btn-activ"
                  : "admin_left_panel1_create_btn"
              }
              type="button"
              onClick={() => {
                setShowUpdateSmartBrand(!showUpdateSmartBrand);
                setShowCreateSmartBrand(false);
                setShowCreateTabBrand(false);
                setShowUpdateTabBrand(false);
                setChoosenBrandId(0);
                setChoosenModelId(0);
                window.scrollTo(0, 0);
              }}
            >
              MODIFIER UNE MARQUE
            </button>
          </div>
          {smartBrands.length >= 1 && (
            <div className="admin_left_brandlist">
              <AdminBrandsList
                brands={smartBrands}
                getAllBrand={getAllBrand}
                choosenBrandId={choosenBrandId}
                setChoosenBrandId={setChoosenBrandId}
                setChoosenModelId={setChoosenModelId}
                setShowCreateSmartBrand={setShowCreateSmartBrand}
                setShowUpdateSmartBrand={setShowUpdateSmartBrand}
                setShowCreateTabBrand={setShowCreateTabBrand}
                setShowUpdateTabBrand={setShowUpdateTabBrand}
              />
            </div>
          )}
          <div className="admin_left_panel1_smartphone">
            <p>TABLETTES</p>
          </div>
          <div className="admin_left_panel1_create">
            <button
              className={
                showCreateTabBrand
                  ? "admin_left_panel1_create_btn-activ"
                  : "admin_left_panel1_create_btn"
              }
              type="button"
              onClick={() => {
                setShowCreateTabBrand(!showCreateTabBrand);
                setShowUpdateTabBrand(false);
                setShowCreateSmartBrand(false);
                setShowUpdateSmartBrand(false);
                setChoosenBrandId(0);
                setChoosenModelId(0);
                window.scrollTo(0, 0);
              }}
            >
              AJOUTER UNE MARQUE
            </button>
          </div>
          <div className="admin_left_panel1_create">
            <button
              className={
                showUpdateTabBrand
                  ? "admin_left_panel1_create_btn-activ"
                  : "admin_left_panel1_create_btn"
              }
              type="button"
              onClick={() => {
                setShowUpdateTabBrand(!showUpdateTabBrand);
                setShowCreateTabBrand(false);
                setShowCreateSmartBrand(false);
                setShowUpdateSmartBrand(false);
                setChoosenBrandId(0);
                setChoosenModelId(0);
                window.scrollTo(0, 0);
              }}
            >
              MODIFIER UNE MARQUE
            </button>
          </div>
          {tabBrands.length >= 1 && (
            <div className="admin_left_brandlist">
              <AdminBrandsList
                brands={tabBrands}
                getAllBrand={getAllBrand}
                choosenBrandId={choosenBrandId}
                setChoosenBrandId={setChoosenBrandId}
                setChoosenModelId={setChoosenModelId}
                setShowCreateSmartBrand={setShowCreateSmartBrand}
                setShowUpdateSmartBrand={setShowUpdateSmartBrand}
                setShowCreateTabBrand={setShowCreateTabBrand}
                setShowUpdateTabBrand={setShowUpdateTabBrand}
              />
            </div>
          )}
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
              setShowUpdateTabBrand={setShowUpdateTabBrand}
              getAllBrand={getAllBrand}
              getAllModelByBrand={getAllModelByBrand}
              brands={smartBrands}
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
          {showUpdateTabBrand === true && (
            <UpdateBrand
              setShowUpdateSmartBrand={setShowUpdateSmartBrand}
              setShowUpdateTabBrand={setShowUpdateTabBrand}
              getAllBrand={getAllBrand}
              brands={tabBrands}
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
            />
          )}
        </div>
      </div>

      {model && repairs && choosenModelId !== 0 && (
        <div className="admin_right">
          <AdminRepairs
            choosenModelId={choosenModelId}
            setChoosenModelId={setChoosenModelId}
            setChoosenBrandId={setChoosenBrandId}
            getAllModelByBrand={getAllModelByBrand}
            repairs={repairs}
            model={model}
            getModelAndRepairs={getModelAndRepairs}
          />
        </div>
      )}
    </div>
  );
}

export default Admin;
