import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaHome, FaCheck } from "react-icons/fa";

function BreadcrumbsRefurb({ type }) {
  const navigate = useNavigate();
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs_step">
        <Link to="/">
          <div className="breadcrumbs_step_ring">
            <FaHome className="fa-home" />
          </div>
        </Link>
        <p className="breadcrumbs_step_name">Accueil</p>
      </div>
      <div className="breadcrumbs_line" />
      <div className="breadcrumbs_step">
        {type === "brand" ? (
          <>
            <div className="breadcrumbs_step_ring ring-activ">
              <p className="breadcrumbs_step_ring_number number-activ">1</p>
            </div>
            <p className="breadcrumbs_step_name name-activ">Marque</p>
          </>
        ) : (
          <>
            <button
              className="breadcrumbs_step_ring ring-navigate"
              type="button"
              onClick={() => {
                if (type === "model") {
                  navigate(-1);
                }
                if (type === "detail") {
                  navigate(-2);
                }
              }}
            >
              <FaCheck className="fa-home" />
            </button>
            <p className="breadcrumbs_step_name">Marque</p>
          </>
        )}
      </div>
      <div className="breadcrumbs_line" />
      <div className="breadcrumbs_step">
        {type === "model" ? (
          <>
            <div className="breadcrumbs_step_ring ring-activ">
              <p className="breadcrumbs_step_ring_number number-activ">2</p>
            </div>
            <p className="breadcrumbs_step_name name-activ">Modèle</p>
          </>
        ) : (
          <>
            <button
              className={
                type !== "brand"
                  ? "breadcrumbs_step_ring ring-navigate"
                  : "breadcrumbs_step_ring"
              }
              type="button"
              onClick={() => {
                if (type === "detail") {
                  navigate(-1);
                }
              }}
            >
              {type !== "brand" ? (
                <FaCheck className="fa-home" />
              ) : (
                <p className="breadcrumbs_step_ring_number">2</p>
              )}
            </button>
            <p className="breadcrumbs_step_name">Modèle</p>
          </>
        )}
      </div>
      <div className="breadcrumbs_line" />
      <div className="breadcrumbs_step">
        {type === "detail" ? (
          <>
            <div className="breadcrumbs_step_ring ring-activ">
              <p className="breadcrumbs_step_ring_number number-activ">3</p>
            </div>
            <p className="breadcrumbs_step_name name-activ">Détail</p>
          </>
        ) : (
          <>
            <div className="breadcrumbs_step_ring">
              <p className="breadcrumbs_step_ring_number">3</p>
            </div>
            <p className="breadcrumbs_step_name">Détail</p>
          </>
        )}
      </div>
      <div className="breadcrumbs_line" />
      <div className="breadcrumbs_step">
        {type === "reservation" || type === "confirmation" ? (
          <>
            <div className="breadcrumbs_step_ring ring-activ">
              <p className="breadcrumbs_step_ring_number number-activ">4</p>
            </div>
            <p className="breadcrumbs_step_name name-activ">Réservation</p>
          </>
        ) : (
          <>
            <div className="breadcrumbs_step_ring">
              <p className="breadcrumbs_step_ring_number">4</p>
            </div>
            <p className="breadcrumbs_step_name">Réservation</p>
          </>
        )}
      </div>
    </div>
  );
}

export default BreadcrumbsRefurb;

BreadcrumbsRefurb.propTypes = {
  type: PropTypes.string.isRequired,
};
