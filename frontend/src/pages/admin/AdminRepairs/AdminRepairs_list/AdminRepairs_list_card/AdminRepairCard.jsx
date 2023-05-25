import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AdminToogle from "@pages/admin/AdminToogle/AdminToogle";
import AdminUpdateRepair from "./AdminUpdateRepair";
import UserContext from "../../../../../context/UserContext";

function AdminRepairCard({
  repairId,
  name,
  price,
  text,
  isVisible,
  getModelAndRepairs,
  getAllModelByBrand,
}) {
  const [showUpdateRepair, setShowUpdateRepair] = useState(false);
  const { userToken } = useContext(UserContext);
  const deleteRepair = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .delete(`${import.meta.env.VITE_PORT_BACKEND}/repair/${repairId}`, config)
      .then(() => {
        getModelAndRepairs();
      })
      .catch(() => {
        console.error("Error delete repair");
      });
  };

  return (
    <div className="adminRepairCard">
      <div className="adminRepairCard_infos">
        {showUpdateRepair === false ? (
          <div className="adminRepairCard_infos_text">
            <p className="adminRepairCard_infos_text_name">{name}</p>
            <p className="adminRepairCard_infos_text_desc"> {text}</p>
            <p className="adminRepairCard_infos_text_euros">
              {price.toUpperCase()}
              {price === "nc" ? "" : ".00€"}
            </p>
          </div>
        ) : (
          <AdminUpdateRepair
            repairId={repairId}
            name={name}
            price={price}
            text={text}
            getModelAndRepairs={getModelAndRepairs}
            setShowUpdateRepair={setShowUpdateRepair}
          />
        )}
        <div className="adminRepairCard_infos_modify">
          <AdminToogle
            id={repairId}
            type={3}
            isVisible={isVisible}
            getBrandOrModelAndRepairs={getModelAndRepairs}
            getAllModelByBrand={getAllModelByBrand}
          />
          <button
            className="adminRepairCard_infos_modify_delete"
            type="button"
            onClick={() => {
              deleteRepair();
            }}
          >
            SUPPRIMER
          </button>
        </div>
      </div>
      <button
        className={
          !showUpdateRepair
            ? "adminRepairCard_btn-inactiv"
            : "adminRepairCard_btn-activ"
        }
        type="button"
        onClick={() => {
          setShowUpdateRepair(!showUpdateRepair);
        }}
      >
        Modifier
      </button>
    </div>
  );
}

export default AdminRepairCard;

AdminRepairCard.propTypes = {
  repairId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isVisible: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
};
