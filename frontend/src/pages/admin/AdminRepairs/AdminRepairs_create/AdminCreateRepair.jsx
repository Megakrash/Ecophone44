import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UserContext from "../../../../context/UserContext";

function AdminCreateRepair({
  choosenModelId,
  getModelAndRepairs,
  setShowCreateRepair,
}) {
  const [newRepairName, setNewRepairName] = useState("");
  const [newRepairText, setNewRepairText] = useState("");
  const [newRepairPrice, setNewRepairPrice] = useState("");
  const { userToken } = useContext(UserContext);

  const createNewRepair = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .post(
        `${import.meta.env.VITE_PORT_BACKEND}/repair`,
        {
          name: `${newRepairName}`,
          text: `${newRepairText}`,
          price: `${newRepairPrice}`,
          modelId: `${choosenModelId}`,
        },
        config
      )
      .then(() => {
        getModelAndRepairs();
        setShowCreateRepair(false);
      })
      .catch(() => {
        console.error("Error create new repair");
      });
  };

  return (
    <div className="adminCreateRepair">
      <form
        action=""
        onSubmit={createNewRepair}
        className="adminUpdateRepair_form"
      >
        <div className="adminUpdateRepair_form_bloc">
          <label htmlFor="name" className="adminUpdateRepair_form_bloc_label">
            Nom
          </label>
          <input
            className="adminUpdateRepair_form_bloc_input"
            type="text"
            placeholder="Nom de la réparation"
            onChange={(e) => setNewRepairName(e.target.value)}
            required
          />
        </div>
        <div className="adminUpdateRepair_form_bloc">
          <label
            htmlFor="description"
            className="adminUpdateRepair_form_bloc_label"
          >
            Description
          </label>
          <textarea
            className="adminUpdateRepair_form_bloc_input repair-area"
            type="text"
            placeholder="Description"
            onChange={(e) => setNewRepairText(e.target.value)}
            required
          />
        </div>
        <div className="adminUpdateRepair_form_bloc">
          <label htmlFor="price" className="adminUpdateRepair_form_bloc_label">
            Prix
          </label>
          <input
            className="adminUpdateRepair_form_bloc_input"
            type="text"
            placeholder="99"
            onChange={(e) => setNewRepairPrice(e.target.value)}
            required
          />
        </div>
        <button
          className="adminUpdateRepair_form_submit"
          type="submit"
          value="update"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AdminCreateRepair;

AdminCreateRepair.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  setShowCreateRepair: PropTypes.func.isRequired,
};
