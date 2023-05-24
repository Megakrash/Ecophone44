import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import AdminManage from "./AdminManage";

const typeConfig = {
  smartphones: { type: 1 },
  tablettes: { type: 2 },
  reconditionnes: { type: 3 },
};

function Admin({ userToken, setUserContext }) {
  const [showType, setShowType] = useState(null);
  // When a brand is selected
  const [choosenBrandId, setChoosenBrandId] = useState(0);
  // When a model is selected
  const [choosenModelId, setChoosenModelId] = useState(0);

  const handleButtonClick = useCallback((type) => {
    setShowType(type);
  }, []);

  const handleButtonOnClick = useCallback(
    (type) => () => {
      handleButtonClick(type);
      setChoosenBrandId(0);
      setChoosenModelId(0);
    },
    []
  );

  const adminSectionProps = {
    userToken,
    setUserContext,
    choosenBrandId,
    setChoosenBrandId,
    choosenModelId,
    setChoosenModelId,
  };

  return (
    <div className="admin">
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

Admin.propTypes = {
  userToken: PropTypes.string.isRequired,
  setUserContext: PropTypes.func.isRequired,
};
