import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "@components/header/Header";
import { FaTools } from "react-icons/fa";

function repair() {
  const [repairs, setRepairs] = useState([]);
  const { id } = useParams();
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/models/`;

  const getReparationByModel = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/repairs_front/${id}`)
      .then((res) => {
        setRepairs(res.data);
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
      <Header />
      {repairs.length >= 1 && (
        <div className="reparation_box">
          <p className="reparation_box_title">
            Toutes nos réparations pour votre {repairs[0].model.toUpperCase()} :
          </p>
          <div className="reparation_box_model">
            <div className="reparation_box_model_pic">
              <img src={picPath + repairs[0].picmodel} alt={repairs[0].model} />
            </div>
            <div className="reparation_box_model_list">
              {repairs.map((infos) => {
                return (
                  <div
                    className="reparation_box_model_list_repair"
                    key={infos.id}
                  >
                    <FaTools className="reparation_box_model_list_repair_fa" />
                    <div className="reparation_box_model_list_repair_text">
                      <p className="reparation_box_model_list_repair_text_name">
                        {infos.name.toUpperCase()}
                      </p>
                      <p className="reparation_box_model_list_repair_text_desc">
                        {infos.text}
                      </p>
                    </div>
                    <p className="reparation_box_model_list_repair_price">
                      {infos.price}.00€ TTC
                    </p>
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

export default repair;
