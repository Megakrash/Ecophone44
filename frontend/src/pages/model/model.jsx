import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getAllModelByBrand } from "@components/apiRest/ApiRestGet";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import Navbar from "@components/navbar/Navbar";
import Breadcrumbs from "@components/breadcrumbs/Breadcrumbs";
import BreadcrumbsRefurb from "@components/breadcrumbs/BreadcrumbsRefurb";

function Model() {
  const [model, setModel] = useState([]);
  const [modelQuery, setModelQuery] = useState("");

  const picPath = `${import.meta.env.VITE_PATH_IMAGE}models/`;
  const { id } = useParams();

  // Use location to have the type. If type === "3" === refurbs
  const location = useLocation();
  const { type } = location.state;

  useEffect(() => {
    getAllModelByBrand(id, setModel);
  }, []);

  return (
    <div className="brand">
      <Navbar />
      {type === "3" ? (
        <BreadcrumbsRefurb type="model" />
      ) : (
        <Breadcrumbs type="model" />
      )}
      {model.length >= 1 ? (
        <>
          {type === "3" ? (
            <p className="brand_title">Quel modèle recherchez vous ?</p>
          ) : (
            <p className="brand_title">Quel est votre modèle ?</p>
          )}
          <div className="brand_search">
            <FaSearch className="brand_search_fa" />
            <input
              className="brand_search_input"
              value={modelQuery}
              type="search"
              placeholder={`Recherchez parmis nos ${model.length} modèles ...`}
              onChange={(e) => setModelQuery(e.target.value)}
            />
            {modelQuery !== "" && (
              <button
                type="button"
                className="brand_search_trash"
                onClick={() => setModelQuery("")}
              >
                <FaTrashAlt className="brand_search_trash_fa" />
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="brand_title">
          Oups ! Aucun modèle disponible dans cette catégorie pour le moment...
        </p>
      )}
      {model.length >= 1 && (
        <div className="brand_brand">
          {model
            .filter((search) => search.name.includes(modelQuery))
            .map((infos) => {
              return (
                <li className="brand_brand_li" key={infos.id}>
                  <Link
                    to={
                      type === "3"
                        ? `/refurbs/${infos.id}`
                        : `/repairs/${infos.id}`
                    }
                  >
                    <img
                      className="brand_brand_li_pic"
                      src={picPath + infos.pic}
                      alt={infos.name}
                    />
                    <p className="brand_brand_li_name">
                      {infos.name.toUpperCase()}
                    </p>
                  </Link>
                </li>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Model;
