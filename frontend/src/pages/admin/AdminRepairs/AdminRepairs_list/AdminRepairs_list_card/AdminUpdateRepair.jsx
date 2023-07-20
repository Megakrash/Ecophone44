import React, { useState } from "react";
import api from "@components/apiRest/ApiRest";
import PropTypes from "prop-types";
import { FaCheck, FaPen, FaChevronCircleLeft } from "react-icons/fa";
import Select from "react-select";

function AdminUpdateRepair({
  repairId,
  icons,
  icon,
  iconId,
  name,
  price,
  text,
  getModelAndRepairs,
}) {
  const [newRepairName, setNewRepairName] = useState(name);
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [newRepairText, setNewRepairText] = useState(text);
  const [showUpdateText, setShowUpdateText] = useState(false);
  const [newRepairPrice, setNewRepairPrice] = useState(price);
  const [showUpdatePrice, setShowUpdatePrice] = useState(false);
  const [newRepairIcon, setNewRepairIcon] = useState(iconId);
  const [showUpdateIcon, setShowUpdateIcon] = useState(false);

  const updateRepair = (event) => {
    event.preventDefault();
    api
      .put(`/api-token/repair/${repairId}`, {
        name: `${newRepairName}`,
        text: `${newRepairText}`,
        price: `${newRepairPrice}`,
        iconId: `${newRepairIcon}`,
      })
      .then(() => {
        getModelAndRepairs();
        setShowUpdateName(false);
        setShowUpdateText(false);
        setShowUpdatePrice(false);
        setShowUpdateIcon(false);
      })
      .catch(() => {
        console.error("Error update repair");
      });
  };

  const options = icons.map((infos) => ({
    value: infos.id,
    label: (
      <img
        className="adminUpdateRepair_bloc_icon"
        src={`${import.meta.env.VITE_PATH_IMAGE}/icons/${infos.pic}`}
        alt="icon"
      />
    ),
  }));

  const handleChangeIcon = (e) => {
    setNewRepairIcon(e.value);
  };

  return (
    <div className="adminUpdateRepair">
      {showUpdateIcon === false ? (
        <div className="adminUpdateRepair_bloc">
          <img
            className="adminUpdateRepair_bloc_icon"
            src={`${import.meta.env.VITE_PATH_IMAGE}/icons/${icon}`}
            alt="icon"
          />
          <button
            className="adminUpdateRepair_bloc_btn"
            type="button"
            onClick={() => setShowUpdateIcon(!showUpdateIcon)}
          >
            <FaPen className="adminUpdateRepair_bloc_btn_fa" />
          </button>
        </div>
      ) : (
        <form
          action=""
          onSubmit={updateRepair}
          className="adminUpdateRepair_form"
        >
          <Select className="" options={options} onChange={handleChangeIcon} />
          <button
            className="adminRepair_name_update_btn"
            type="button"
            onClick={() => setShowUpdateIcon(false)}
          >
            <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
          </button>
          <button className="adminRepair_name_update_btn" type="submit">
            <FaCheck className="adminRepair_name_update_btn_fa" />
          </button>
        </form>
      )}

      {showUpdateName === false ? (
        <div className="adminUpdateRepair_bloc">
          <p className="adminUpdateRepair_bloc_text">{name}</p>
          <button
            className="adminUpdateRepair_bloc_btn"
            type="button"
            onClick={() => setShowUpdateName(!showUpdateName)}
          >
            <FaPen className="adminUpdateRepair_bloc_btn_fa" />
          </button>
        </div>
      ) : (
        <form
          action=""
          onSubmit={updateRepair}
          className="adminUpdateRepair_form"
        >
          <input
            className="adminUpdateRepair_form_input"
            type="text"
            value={newRepairName}
            placeholder={name}
            onChange={(e) => setNewRepairName(e.target.value)}
            required
          />
          <button
            className="adminRepair_name_update_btn"
            type="button"
            onClick={() => setShowUpdateName(false)}
          >
            <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
          </button>
          <button className="adminRepair_name_update_btn" type="submit">
            <FaCheck className="adminRepair_name_update_btn_fa" />
          </button>
        </form>
      )}

      {showUpdateText === false ? (
        <div className="adminUpdateRepair_bloc">
          <p className="adminUpdateRepair_bloc_text desc">{text}</p>
          <button
            className="adminUpdateRepair_bloc_btn"
            type="button"
            onClick={() => setShowUpdateText(!showUpdateText)}
          >
            <FaPen className="adminUpdateRepair_bloc_btn_fa" />
          </button>
        </div>
      ) : (
        <form
          action=""
          onSubmit={updateRepair}
          className="adminUpdateRepair_form"
        >
          <textarea
            className="adminUpdateRepair_form_bloc_input repair-area"
            type="text"
            value={newRepairText}
            placeholder={text}
            onChange={(e) => setNewRepairText(e.target.value)}
            required
          />
          <button
            className="adminRepair_name_update_btn"
            type="button"
            onClick={() => setShowUpdateText(false)}
          >
            <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
          </button>
          <button className="adminRepair_name_update_btn" type="submit">
            <FaCheck className="adminRepair_name_update_btn_fa" />
          </button>
        </form>
      )}

      {showUpdatePrice === false ? (
        <div className="adminUpdateRepair_bloc">
          <p className="adminRepairCard_infos_text_euros">
            {price.toUpperCase()}
            {price === "nc" ? "" : ".00€"}
          </p>
          <button
            className="adminUpdateRepair_bloc_btn"
            type="button"
            onClick={() => setShowUpdatePrice(!showUpdatePrice)}
          >
            <FaPen className="adminUpdateRepair_bloc_btn_fa" />
          </button>
        </div>
      ) : (
        <form
          action=""
          onSubmit={updateRepair}
          className="adminUpdateRepair_form"
        >
          <input
            className="adminUpdateRepair_form_input"
            type="text"
            value={newRepairPrice}
            placeholder={price}
            onChange={(e) => setNewRepairPrice(e.target.value)}
            required
          />
          <button
            className="adminRepair_name_update_btn"
            type="button"
            onClick={() => setShowUpdatePrice(false)}
          >
            <FaChevronCircleLeft className="adminRepair_name_update_btn_fa" />
          </button>
          <button className="adminRepair_name_update_btn" type="submit">
            <FaCheck className="adminRepair_name_update_btn_fa" />
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminUpdateRepair;

AdminUpdateRepair.propTypes = {
  repairId: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  iconId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
    .isRequired,
  getModelAndRepairs: PropTypes.func.isRequired,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      pic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
