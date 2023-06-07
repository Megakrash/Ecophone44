import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@components/navbar/Navbar";
import Header from "@components/header/Header";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

export default function Brand() {
  const [allBrands, setAllBrands] = useState([]);
  const [brandQuery, setBrandQuery] = useState("");
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/brands/`;
  const { id } = useParams();

  const getAllBrands = () => {
    const brandRoutes = {
      1: "/smartbrands",
      2: "/tabbrands",
      3: "/refurbbrands",
    };
    const url = brandRoutes[id];

    if (url) {
      axios
        .get(`${import.meta.env.VITE_PORT_BACKEND}${url}`)
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
      <Navbar />
      <Header />
      {allBrands.length >= 1 ? (
        <>
          <p className="brand_title">
            {id === "3"
              ? "Quelle marque recherchez vous ?"
              : "Quelle est votre marque ?"}
          </p>
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
        </>
      ) : (
        <p className="brand_title">
          Oups ! Aucune marque disponible dans cette catégorie pour le moment...
        </p>
      )}
      <div className="brand_brand">
        {allBrands
          .filter((search) =>
            search.name.toLowerCase().includes(brandQuery.toLowerCase())
          )
          .map((infos) => {
            return (
              <li className="brand_brand_li" key={infos.id}>
                <Link to={`/models/${infos.id}`}>
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
