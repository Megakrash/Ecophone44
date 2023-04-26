import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function AdminModelList({ choosenBrandId, setChoosenModelId }) {
  const [activeModelId, setActiveModelId] = useState(null);
  const [allModelByBrand, setAllModelByBrand] = useState([]);

  const getAllModelByBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/model/${choosenBrandId}`)
      .then((res) => {
        setAllModelByBrand(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllModelByBrand();
  }, [choosenBrandId]);

  const handleClickActiveModel = (id) => {
    setActiveModelId(id);
  };

  return (
    <div className="adminModelList">
      {allModelByBrand.length >= 1 && (
        <div className="adminModelList_brand">
          {allModelByBrand.map((infos) => {
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
