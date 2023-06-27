import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import NavbarBack from "@components/navbar/NavbarBack";
import AdminManage from "./AdminManage";

const typeConfig = {
  smartphones: { type: 1 },
  tablettes: { type: 2 },
  reconditionnes: { type: 3 },
};

function Admin({ userToken, setUserContext }) {
  const navigate = useNavigate();

  // First verify the user Token
  const verifyToken = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/user`, config)
      .then(() => {
        setUserContext(JSON.parse(localStorage.getItem("Eco44Token")));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("Eco44Token");
          setUserContext("");
          navigate("/login");
        } else {
          console.error("Error Token");
        }
      });
  };

  useEffect(() => {
    if (userToken !== "") {
      verifyToken();
    } else {
      navigate("/login");
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
    userToken,
    setUserContext,
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

Admin.propTypes = {
  userToken: PropTypes.string.isRequired,
  setUserContext: PropTypes.func.isRequired,
};
