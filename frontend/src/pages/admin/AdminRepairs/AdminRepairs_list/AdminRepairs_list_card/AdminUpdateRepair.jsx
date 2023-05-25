import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UserContext from "../../../../../context/UserContext";

function AdminUpdateRepair({
  repairId,
  name,
  price,
  text,
  getModelAndRepairs,
  setShowUpdateRepair,
}) {
  const [newRepairName, setNewRepairName] = useState(name);
  const [newRepairText, setNewRepairText] = useState(text);
  const [newRepairPrice, setNewRepairPrice] = useState(price);
  const { userToken } = useContext(UserContext);

  const updateRepair = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .put(
        `${import.meta.env.VITE_PORT_BACKEND}/repair/${repairId}`,
        {
          name: `${newRepairName}`,
          text: `${newRepairText}`,
          price: `${newRepairPrice}`,
        },
        config
      )
      .then(() => {
        setShowUpdateRepair(false);
        getModelAndRepairs();
      })
      .catch(() => {
        console.error("Error update repair");
      });
  };

  return (
    <div className="adminUpdateRepair">
      <form
        action=""
        onSubmit={updateRepair}
        className="adminUpdateRepair_form"
      >
        <div className="adminUpdateRepair_form_bloc">
          <input
            className="adminUpdateRepair_form_bloc_input"
            type="text"
            value={newRepairName}
            placeholder={name}
            onChange={(e) => setNewRepairName(e.target.value)}
            required
          />
          <textarea
            className="adminUpdateRepair_form_bloc_input repair-area"
            type="text"
            value={newRepairText}
            placeholder={text}
            onChange={(e) => setNewRepairText(e.target.value)}
            required
          />
          <input
            className="adminUpdateRepair_form_bloc_input"
            type="text"
            value={newRepairPrice}
            placeholder={price}
            onChange={(e) => setNewRepairPrice(e.target.value)}
            required
          />
        </div>
        <button
          className="adminUpdateRepair_form_submit"
          type="submit"
          value="update"
        >
          Envoyer ou fermer
        </button>
      </form>
    </div>
  );
}

export default AdminUpdateRepair;

AdminUpdateRepair.propTypes = {
  repairId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
    .isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  setShowUpdateRepair: PropTypes.func.isRequired,
};
