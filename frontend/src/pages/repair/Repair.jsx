import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";
import NavbarRepair from "@components/navbar/NavbarRepair";
import Breadcrumbs from "@components/breadcrumbs/Breadcrumbs";
import RepairCard from "./repair_card/RepairCard";

function Repair() {
  // All repairs offered
  const [allRepairs, setAllRepairs] = useState([]);
  // Total price of all selected repairs
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  // Names and prices of all selected repairs
  const [selectedRepairs, setSelectedRepairs] = useState([]);
  const picPath = `${import.meta.env.VITE_PATH_IMAGE}models/`;
  const { id } = useParams();

  // Add up the cost of repairs
  const handleTotalPrice = (price, selected) => {
    setTotalCardPrice((prevPrice) =>
      selected ? prevPrice + Number(price) : prevPrice - Number(price)
    );
  };

  // Add the names and prices of all selected repairs
  const handleRepairSelect = useCallback((name, price) => {
    setSelectedRepairs((prevRepairs) => [...prevRepairs, { name, price }]);
  }, []);
  // Add the names and prices of all deselected repairs
  const handleRepairDeselect = useCallback((name) => {
    setSelectedRepairs((prevRepairs) =>
      prevRepairs.filter((repair) => repair.name !== name)
    );
  }, []);

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
      <div className="repair_breadcrumbs">
        <Breadcrumbs type="repair" />
      </div>

      {allRepairs.length >= 1 ? (
        <div className="repair_bloc">
          <div className="repair_bloc_img">
            <img
              className="repair_bloc_img_pic"
              src={`${picPath}${allRepairs[0].modelPic}`}
              alt={allRepairs[0].modelName}
            />
          </div>
          <div className="repair_bloc_card">
            <p className="repair_bloc_card_text">
              <span>Sélectionnez votre panne</span> et bénéficiez d'une
              réparation en 1 heure dans notre atelier :
            </p>
            {allRepairs.map((infos) => {
              return (
                <RepairCard
                  key={infos.id}
                  picIcon={infos.picIcon}
                  name={infos.name}
                  price={infos.price}
                  handleTotalPrice={handleTotalPrice}
                  handleRepairSelect={handleRepairSelect}
                  handleRepairDeselect={handleRepairDeselect}
                />
              );
            })}
            <RepairCard
              picIcon="xforce.webp"
              name={"Protection d'écran XFORCE"}
              price="20"
              handleTotalPrice={handleTotalPrice}
              handleRepairSelect={handleRepairSelect}
              handleRepairDeselect={handleRepairDeselect}
            />
            {totalCardPrice !== 0 && (
              <>
                <div className="repair_bloc_card_price">
                  <p className="repair_bloc_card_price_text">TOTAL (TTC)</p>
                  <p className="repair_bloc_card_price_total">
                    {totalCardPrice}.00€
                  </p>
                </div>
                <Link
                  to="/reservation"
                  state={{
                    brandName: allRepairs[0].brandName,
                    modelName: allRepairs[0].modelName,
                    modelPic: allRepairs[0].modelPic,
                    totalCardPrice,
                    selectedRepairs,
                    type: "repair",
                  }}
                  className="repair_bloc_card_btn"
                >
                  <p>PRENDRE RENDEZ-VOUS</p>
                  <p>(c'est gratuit !)</p>
                </Link>
                <div className="repair_bloc_card_warning">
                  <FaExclamationCircle className="fa-warning" />
                  <p className="repair_bloc_card_warning_text">
                    Nos tarifs sont indiqués à titre indicatif et pourront
                    évoluer selon le diagnostic effectué en boutique.
                  </p>
                </div>
              </>
            )}
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
