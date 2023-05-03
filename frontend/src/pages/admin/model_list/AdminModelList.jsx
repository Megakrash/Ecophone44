import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CreateModel from "./CreateModel";

function AdminModelList({ choosenBrandId, setChoosenModelId }) {
  const [activeModelId, setActiveModelId] = useState(null);
  const [allModelsByBrand, setAllModelsByBrand] = useState([]);
  const [showCreateModel, setShowCreateModel] = useState(false);

  const getAllModelByBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/model/${choosenBrandId}`)
      .then((res) => {
        setAllModelsByBrand(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllModelByBrand();
    setShowCreateModel(false);
  }, [choosenBrandId]);

  const handleClickActiveModel = (id) => {
    setActiveModelId(id);
  };

  return (
    <div className="adminModelList">
      <div className="adminBrandList_create">
        <button
          className={
            showCreateModel
              ? "adminBrandList_brand_btn-activ"
              : "adminBrandList_brand_btn"
          }
          type="button"
          onClick={() => setShowCreateModel(!showCreateModel)}
        >
          AJOUTER UN MODELE
        </button>
        {showCreateModel === true && (
          <CreateModel
            setShowCreateModel={setShowCreateModel}
            getAllModelByBrand={getAllModelByBrand}
            choosenBrandId={choosenBrandId}
          />
        )}
      </div>
      {allModelsByBrand.length >= 1 && (
        <div className="adminModelList_brand">
          {allModelsByBrand.map((infos) => {
            const isActive = infos.id === activeModelId;
            return (
              <button
                className={
                  isActive
                    ? "adminModelList_brand_btn-activ"
                    : "adminModelList_brand_btn"
                }
                type="button"
                key={infos.id}
                onClick={() => {
                  handleClickActiveModel(infos.id);
                  setChoosenModelId(infos.id);
                  setShowCreateModel(false);
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

export default AdminModelList;

AdminModelList.propTypes = {
  choosenBrandId: PropTypes.number.isRequired,
  setChoosenModelId: PropTypes.func.isRequired,
};
