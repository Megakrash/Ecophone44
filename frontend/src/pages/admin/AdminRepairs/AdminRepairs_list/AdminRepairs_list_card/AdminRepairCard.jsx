import React from "react";
import { deleteRepair } from "@components/apiRest/ApiRestDelete";
import PropTypes from "prop-types";
import AdminToogle from "@pages/admin/AdminToogle/AdminToogle";
import AdminUpdateRepair from "./AdminUpdateRepair";

function AdminRepairCard({
  repairId,
  icons,
  icon,
  iconId,
  name,
  price,
  text,
  isVisible,
  getModelAndRepairs,
  getAllModelByBrand,
}) {
  return (
    <div className="adminRepairCard">
      <div className="adminRepairCard_infos">
        <AdminUpdateRepair
          repairId={repairId}
          icons={icons}
          icon={icon}
          iconId={iconId}
          name={name}
          price={price}
          text={text}
          getModelAndRepairs={getModelAndRepairs}
        />

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
              deleteRepair(repairId, getModelAndRepairs);
            }}
          >
            SUPPRIMER
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminRepairCard;

AdminRepairCard.propTypes = {
  repairId: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  iconId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isVisible: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  getAllModelByBrand: PropTypes.func.isRequired,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      pic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
