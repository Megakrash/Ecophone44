import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminToogle from "@pages/admin/toogle_isVisible/AdminToogle";
import AdminUpdateRepair from "./AdminUpdateRepair";

function AdminRepairCard({
  repairId,
  name,
  price,
  text,
  isVisible,
  getModelAndRepairs,
}) {
  const [showUpdateRepair, setShowUpdateRepair] = useState(false);

  return (
    <div className="adminRepairCard">
      <div className="adminRepairCard_infos">
        <div className="adminRepairCard_infos_text">
          <p className="adminRepairCard_infos_text_name">{name}</p>
          <p className="adminRepairCard_infos_text_desc"> {text}</p>
        </div>
        <div className="adminRepairCard_infos_price">
          <p className="adminRepairCard_infos_price_euros">{price}.00€</p>
          <AdminToogle
            id={repairId}
            type={3}
            isVisible={isVisible}
            getBrandOrModelAndRepairs={getModelAndRepairs}
          />
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
      {showUpdateRepair && (
        <AdminUpdateRepair
          repairId={repairId}
          name={name}
          price={price}
          text={text}
          getModelAndRepairs={getModelAndRepairs}
          setShowUpdateRepair={setShowUpdateRepair}
        />
      )}
    </div>
  );
}

export default AdminRepairCard;

AdminRepairCard.propTypes = {
  repairId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isVisible: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
};
