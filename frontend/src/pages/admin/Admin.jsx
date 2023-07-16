import React, { useState, useCallback, useEffect } from "react";
import { verifyToken } from "@components/apiRest/ApiRest";
import { useNavigate } from "react-router-dom";
import NavbarBack from "@components/navbar/NavbarBack";
import AdminManage from "./AdminManage";

const typeConfig = {
  smartphones: { type: 1 },
  tablettes: { type: 2 },
  reconditionnes: { type: 3 },
};

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Eco44Token")) {
      verifyToken(navigate);
    }
  }, []);

  const [showType, setShowType] = useState(null);
  // When a brand is selected
  const [choosenBrandId, setChoosenBrandId] = useState(0);
  // When a model is selected
  const [choosenModelId, setChoosenModelId] = useState(0);
  const [showCreateBrand, setShowCreateBrand] = useState(false);

  const handleButtonClick = useCallback((type) => {
    setShowType(type);
  }, []);

  const handleButtonOnClick = useCallback(
    (type) => () => {
      handleButtonClick(type);
      setChoosenBrandId(0);
      setChoosenModelId(0);
      setShowCreateBrand(false);
    },
    []
  );

  const adminSectionProps = {
    choosenBrandId,
    setChoosenBrandId,
    choosenModelId,
    setChoosenModelId,
    showCreateBrand,
    setShowCreateBrand,
  };

  return (
    <div className="admin">
      <NavbarBack
        setChoosenBrandId={setChoosenBrandId}
        setChoosenModelId={setChoosenModelId}
        setShowCreateBrand={setShowCreateBrand}
        setShowType={setShowType}
      />
      <div className="admin_select">
        {Object.keys(typeConfig).map((type) => (
          <button
            key={type}
            className={`admin_select_btn ${
              showType === type ? "admin_select_btn-activ" : ""
            }`}
            type="button"
            onClick={handleButtonOnClick(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="admin_section">
        {showType && (
          <>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <AdminManage {...typeConfig[showType]} {...adminSectionProps} />
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
