import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateBrand from "./brand_list/CreateBrand";
import UpdateBrand from "./brand_list/UpdateBrand";
import AdminBrandList from "./brand_list/AdminBrandList";
import AdminModelList from "./model_list/AdminModelList";
import AdminManage from "./manage/AdminManage";

function Admin() {
  // To stock the smartphone brand list
  const [smartBrands, setSmartBrands] = useState([]);
  // To stock the tablet brand list
  const [tabBrands, setTabBrands] = useState([]);
  const [choosenBrandId, setChoosenBrandId] = useState(0);
  const [choosenModelId, setChoosenModelId] = useState(null);
  const [showCreateSmartBrand, setShowCreateSmartBrand] = useState(false);
  const [showUpdateSmartBrand, setShowUpdateSmartBrand] = useState(false);

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
                setChoosenBrandId(0);
                setChoosenModelId(null);
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
                setChoosenBrandId(0);
                setChoosenModelId(null);
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
              />
            </div>
          )}
          <div className="admin_left_panel1_smartphone">
            <p>TABLETTES</p>
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
              />
            </div>
          )}
        </div>
        <div className="admin_left_panel2">
          {showCreateSmartBrand === true && (
            <CreateBrand
              setShowCreateSmartBrand={setShowCreateSmartBrand}
              setShowUpdateSmartBrand={setShowUpdateSmartBrand}
              getAllBrand={getAllBrand}
              type={1}
            />
          )}
          {showUpdateSmartBrand === true && (
            <UpdateBrand
              setShowUpdateSmartBrand={setShowUpdateSmartBrand}
              getAllBrand={getAllBrand}
              brands={smartBrands}
            />
          )}
          {choosenBrandId !== 0 && (
            <AdminModelList
              choosenBrandId={choosenBrandId}
              setChoosenModelId={setChoosenModelId}
            />
          )}
        </div>
      </div>

      {choosenModelId !== null && (
        <div className="admin_right">
          <AdminManage choosenModelId={choosenModelId} />
        </div>
      )}
    </div>
  );
}

export default Admin;
