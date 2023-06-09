import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarRepair from "@components/navbar/NavbarRepair";
import Breadcrumbs from "@components/breadcrumbs/Breadcrumbs";
import RepairCard from "./repair_card/RepairCard";

function Repair() {
  const [allRepairs, setAllRepairs] = useState([]);
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  const picPath = `${import.meta.env.VITE_PATH_IMAGE}models/`;
  const { id } = useParams();

  const getAllRepairsByModel = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/repairsforfront/${id}`)
      .then((res) => {
        setAllRepairs(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllRepairsByModel();
  }, []);

  return (
    <div className="repair">
      {allRepairs.length >= 1 && (
        <NavbarRepair
          brandName={allRepairs[0].brandName}
          modelName={allRepairs[0].modelName}
          modelPic={allRepairs[0].modelPic}
          price={totalCardPrice}
        />
      )}

      <Breadcrumbs type="repair" />

      {allRepairs.length >= 1 ? (
        <div className="repair_bloc">
          <img
            className="repair_bloc_img"
            src={`${picPath}${allRepairs[0].modelPic}`}
            alt={allRepairs[0].modelName}
          />
          <div className="repair_bloc_card">
            <p className="repair_bloc_card_text">
              <span>Sélectionnez votre panne</span> et bénéficiez d'une
              réparation en 1 heure dans notre atelier :
            </p>
            {allRepairs.map((infos) => {
              return (
                <RepairCard
                  picIcon={infos.picIcon}
                  name={infos.name}
                  price={infos.price}
                  setTotalCardPrice={setTotalCardPrice}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p className="brand_title">
          Oups ! Aucune réparation disponible pour ce modèle pour le moment...
        </p>
      )}
    </div>
  );
}

export default Repair;
