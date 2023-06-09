import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import Navbar from "@components/navbar/Navbar";
import Breadcrumbs from "@components/breadcrumbs/Breadcrumbs";

function Model() {
  const [model, setModel] = useState([]);
  const [modelQuery, setModelQuery] = useState("");

  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/models/`;
  const { id } = useParams();

  const getAllModelByBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/modelbybrandforfront/${id}`)
      .then((res) => {
        setModel(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllModelByBrand();
  }, []);

  return (
    <div className="brand">
      <Navbar />
      <Breadcrumbs type="model" />
      {model.length >= 1 ? (
        <>
          <p className="brand_title">Quel est votre modèle ?</p>
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
                  <Link to={`/repairs/${infos.id}`}>
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
