import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

export default function Brand() {
  const [allBrands, setAllBrands] = useState([]);
  const [brandQuery, setBrandQuery] = useState("");

  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/brands/`;
  const { id } = useParams();

  const getAllBrands = () => {
    if (id === "1") {
      axios
        .get(`${import.meta.env.VITE_PORT_BACKEND}/smartbrand`)
        .then((res) => {
          setAllBrands(res.data);
        })
        .catch(() => {
          console.error("error");
        });
    }
    if (id === "2") {
      axios
        .get(`${import.meta.env.VITE_PORT_BACKEND}/tabbrand`)
        .then((res) => {
          setAllBrands(res.data);
        })
        .catch(() => {
          console.error("error");
        });
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="brand">
      <p className="brand_title">Quelle est votre marque ?</p>
      {allBrands.length >= 1 && (
        <div className="brand_search">
          <FaSearch className="brand_search_fa" />
          <input
            className="brand_search_input"
            value={brandQuery}
            type="search"
            placeholder={`Recherchez parmis nos ${allBrands.length} marques ...`}
            onChange={(e) => setBrandQuery(e.target.value)}
          />
          {brandQuery !== "" && (
            <button
              type="button"
              className="brand_search_trash"
              onClick={() => setBrandQuery("")}
            >
              <FaTrashAlt className="brand_search_trash_fa" />
            </button>
          )}
        </div>
      )}
      <div className="brand_brand">
        {allBrands
          .filter((search) =>
            search.name.toLowerCase().includes(brandQuery.toLowerCase())
          )
          .map((infos) => {
            return (
              <li className="brand_brand_li" key={infos.id}>
                <Link to={`/model/${infos.id}`}>
                  <img
                    className="brand_brand_li_pic"
                    src={picPath + infos.pic}
                    alt={infos.name}
                  />
                </Link>
              </li>
            );
          })}
      </div>
    </div>
  );
}
