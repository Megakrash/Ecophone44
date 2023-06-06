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
      <form action="" onSubmit={createNewRepair} className="create_form">
        <div className="adminCreateRepair_bloc">
          <label htmlFor="name" className="create_form_label">
            Nom
          </label>
          <input
            className="create_form_input"
            type="text"
            placeholder="Nom de la réparation"
            onChange={(e) => setNewRepairName(e.target.value)}
            required
          />
        </div>
        <div className="adminCreateRepair_bloc">
          <label htmlFor="description" className="create_form_label">
            Description
          </label>
          <textarea
            className="create_form_input create-area"
            type="text"
            placeholder="Description"
            onChange={(e) => setNewRepairText(e.target.value)}
            required
          />
        </div>
        <div className="adminCreateRepair_bloc">
          <label htmlFor="price" className="create_form_label">
            Prix
          </label>
          <input
            className="create_form_input"
            type="text"
            placeholder="99"
            onChange={(e) => setNewRepairPrice(e.target.value)}
            required
          />
        </div>
        <button className="create_form_submit" type="submit" value="update">
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
