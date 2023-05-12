import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateBrand from "./brand_list/CreateBrand";
import UpdateBrand from "./brand_list/UpdateBrand";
import AdminBrandList from "./brand_list/AdminBrandList";
import AdminModelList from "./model_list/AdminModelList";
import AdminRepair from "./repair_list/AdminRepair";

function Admin() {
  // To stock the smartphone brand list
  const [smartBrands, setSmartBrands] = useState([]);
  // To stock the tablet brand list
  const [tabBrands, setTabBrands] = useState([]);
  const [choosenBrandId, setChoosenBrandId] = useState(0);
  const [choosenModelId, setChoosenModelId] = useState(0);
  const [showCreateSmartBrand, setShowCreateSmartBrand] = useState(false);
  const [showUpdateSmartBrand, setShowUpdateSmartBrand] = useState(false);
  const [showCreateTabBrand, setShowCreateTabBrand] = useState(false);
  const [showUpdateTabBrand, setShowUpdateTabBrand] = useState(false);

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
              <AdminBrandList
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
              <AdminBrandList
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
            <CreateBrand
              setShowCreateSmartBrand={setShowCreateSmartBrand}
              setShowCreateTabBrand={setShowCreateTabBrand}
              getAllBrand={getAllBrand}
              type={1}
            />
          )}
          {showUpdateSmartBrand === true && (
            <UpdateBrand
              setShowUpdateSmartBrand={setShowUpdateSmartBrand}
              setShowUpdateTabBrand={setShowUpdateTabBrand}
              getAllBrand={getAllBrand}
              brands={smartBrands}
            />
          )}
          {showCreateTabBrand === true && (
            <CreateBrand
              setShowCreateSmartBrand={setShowCreateSmartBrand}
              setShowCreateTabBrand={setShowCreateTabBrand}
              getAllBrand={getAllBrand}
              type={0}
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
            <AdminModelList
              choosenBrandId={choosenBrandId}
              choosenModelId={choosenModelId}
              setChoosenModelId={setChoosenModelId}
              getAllBrand={getAllBrand}
            />
          )}
        </div>
      </div>

      {choosenModelId !== 0 && (
        <div className="admin_right">
          <AdminRepair choosenModelId={choosenModelId} />
        </div>
      )}
    </div>
  );
}

export default Admin;
