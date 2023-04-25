import React, { useState } from "react";
// import axios from "axios";
import AdminBrandList from "./brand_list/AdminBrandList";
import AdminModelList from "./model_list/AdminModelList";
import AdminManage from "./manage/AdminManage";

function Admin() {
  const [choosenBrandId, setChoosenBrandId] = useState(null);
  const [choosenModelId, setChoosenModelId] = useState(null);

  return (
    <div className="admin">
      <div className="admin_brand">
        <AdminBrandList
          setChoosenBrandId={setChoosenBrandId}
          setChoosenModelId={setChoosenModelId}
        />
      </div>
      {choosenBrandId !== null && (
        <div className="admin_model">
          <AdminModelList
            choosenBrandId={choosenBrandId}
            setChoosenModelId={setChoosenModelId}
          />
        </div>
      )}

      {/* {allBrand.length >= 1 &&
                <div className="admin_brand">
                    {allBrand.map((infos) => {
                        const isActive = infos.id === activeBrandId;
                        return (
                            <button
                                className={isActive ? 'admin_brand_btn-activ' : 'admin_brand_btn'}
                                type='button'
                                key={infos.id}
                                onClick={() => {
                                    handleClickActiveBrand(infos.id);
                                    getAllModelByBrand(infos.id);
                                    setChoosenModelId("");
                                    setActiveModelId(null);
                                }}
                            >
                                {infos.name.toUpperCase()}
                            </button>
                        );
                    })}
                </div>
            } */}
      {/* {allModelByBrand !== "" &&
                <div className="admin_model">
                    {allModelByBrand.map((infos) => {
                        const isActive = infos.id === activeModelId;
                        return (
                            <button
                                className={isActive ? 'admin_brand_btn-activ' : 'admin_brand_btn'}
                                type='button'
                                key={infos.id}
                                onClick={() => {
                                    handleClickActiveModel(infos.id);
                                    setChoosenModelId(infos.id)
                                }}
                            >
                                {infos.name.toUpperCase()}
                            </button>
                        );
                    })}
                </div>
            } */}

      {choosenModelId !== null && (
        <div className="admin_manage">
          <AdminManage choosenModelId={choosenModelId} />
        </div>
      )}
    </div>
  );
}

export default Admin;
