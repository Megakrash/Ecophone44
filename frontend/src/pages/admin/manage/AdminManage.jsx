import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function AdminManage({ choosenModelId }) {
  const [repair, setRepair] = useState([]);
  // const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/modeles/`;

  const getReparationByModel = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/reparation/${choosenModelId}`)
      .then((res) => {
        setRepair(res.data);
      })

      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getReparationByModel();
  }, [choosenModelId]);

  return (
    <div>{repair.length >= 1 && <p>{repair[0].model.toUpperCase()}</p>}</div>
  );
}

export default AdminManage;

AdminManage.propTypes = {
  choosenModelId: PropTypes.number.isRequired,
};
