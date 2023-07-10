import React, { useEffect, useState } from "react";
import { getRefurbById } from "@components/apiRest/ApiRestGet";
import { Link, useParams } from "react-router-dom";
import Navbar from "@components/navbar/Navbar";
import BreadcrumbsRefurb from "@components/breadcrumbs/BreadcrumbsRefurb";

function Refurb() {
  const [details, setDetails] = useState(null);
  const picPath = `${import.meta.env.VITE_PATH_IMAGE}models/`;
  const { id } = useParams();

  useEffect(() => {
    getRefurbById(id, setDetails);
  }, []);

  return (
    <div className="refurb">
      <Navbar />
      <BreadcrumbsRefurb type="detail" />
      {details && (
        <div className="repair_bloc">
          <div className="repair_bloc_img">
            <img
              className="repair_bloc_img_pic"
              src={`${picPath}${details[0].pic}`}
              alt={details[0].name}
            />
          </div>
          <div className="refurb_bloc_card">
            <p className="refurb_bloc_card_title">
              {details[0].name.toUpperCase()}
            </p>
            <p className="refurb_bloc_card_text">{details[0].text}</p>
            <p className="refurb_bloc_card_price">{details[0].price}.00€</p>
            <Link
              to="/reservation"
              state={{
                brandName: details[0].brandName,
                modelName: details[0].name,
                modelPic: details[0].pic,
                totalCardPrice: details[0].price,
                selectedRepairs: details[0].name,
                type: "refurb",
              }}
              className="repair_bloc_card_btn"
            >
              <p>RESERVER CE MODÈLE</p>
              <p>(c'est gratuit !)</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Refurb;
