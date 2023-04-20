import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

function Model() {
  const [model, setModel] = useState([]);
  const [modelQuery, setModelQuery] = useState("");

  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/modeles/`;
  const { id } = useParams();

  const getAllModelByBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/model/${id}`)
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
    <div className="home">
      <p className="home_title">Quel est votre modèle ?</p>
      {model.length >= 1 && (
        <div className="home_search">
          <FaSearch className="home_search_fa" />
          <input
            className="home_search_input"
            value={modelQuery}
            type="search"
            placeholder={`Recherchez parmis nos ${model.length} modèles ...`}
            onChange={(e) => setModelQuery(e.target.value)}
          />
          {modelQuery !== "" && <FaTrashAlt className="home_search_trash" />}
        </div>
      )}
      {model.length >= 1 && (
        <div className="home_brand">
          {model
            .filter((search) => search.name.includes(modelQuery))
            .map((infos) => {
              return (
                <li className="home_brand_li" key={infos.id}>
                  <Link to={`/reparation/${infos.id}`}>
                    <img
                      className="home_brand_li_pic"
                      src={picPath + infos.pic}
                      alt={infos.name}
                    />
                    <p className="home_brand_li_name">
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
