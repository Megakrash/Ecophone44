import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaTools } from "react-icons/fa";

function reparation() {
  const [repair, setRepair] = useState([]);
  const { id } = useParams();
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/modeles/`;

  const getReparationByModel = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/reparation/${id}`)
      .then((res) => {
        setRepair(res.data);
      })

      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getReparationByModel();
  }, []);

  return (
    <div className="reparation">
      {repair.length >= 1 && (
        <div className="reparation_box">
          <p className="reparation_box_title">
            Toutes nos réparations pour votre {repair[0].model.toUpperCase()} :
          </p>
          <div className="reparation_box_model">
            <div className="reparation_box_model_pic">
              <img src={picPath + repair[0].picmodel} alt={repair[0].model} />
            </div>
            <div className="reparation_box_model_list">
              {repair.map((infos) => {
                return (
                  <div className="reparation_box_model_list_repair">
                    <FaTools className="reparation_box_model_list_repair_fa" />
                    <div className="reparation_box_model_list_repair_text">
                      <p className="reparation_box_model_list_repair_text_name">
                        {infos.name.toUpperCase()}
                      </p>
                      <p className="reparation_box_model_list_repair_text_price">
                        {infos.price}.00€ TTC
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default reparation;
