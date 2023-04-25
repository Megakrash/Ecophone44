import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CreateBrand from "./CreateBrand";

function AdminBrandList({ setChoosenBrandId, setChoosenModelId }) {
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [allBrand, setAllBrand] = useState([]);
  const [showCreateBrand, setShowCreateBrand] = useState(false);

  const getAllBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand`)
      .then((res) => {
        setAllBrand(res.data);
      })

      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllBrand();
  }, []);

  const handleClickActiveBrand = (id) => {
    setActiveBrandId(id);
  };

  return (
    <div className="adminBrandList">
      <div className="adminBrandList_create">
        <button
          className="adminBrandList_brand_btn"
          type="button"
          onClick={() => setShowCreateBrand(!showCreateBrand)}
        >
          AJOUTER UNE MARQUE
        </button>
        {showCreateBrand === true && <CreateBrand />}
      </div>
      {allBrand.length >= 1 && (
        <div className="adminBrandList_brand">
          {allBrand.map((infos) => {
            const isActive = infos.id === activeBrandId;
            return (
              <button
                className={
                  isActive
                    ? "adminBrandList_brand_btn-activ"
                    : "adminBrandList_brand_btn"
                }
                type="button"
                key={infos.id}
                onClick={() => {
                  handleClickActiveBrand(infos.id);
                  setChoosenBrandId(infos.id);
                  setChoosenModelId(null);
                }}
              >
                {infos.name.toUpperCase()}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminBrandList;

AdminBrandList.propTypes = {
  setChoosenBrandId: PropTypes.func.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
};
