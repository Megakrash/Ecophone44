import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

export default function Home() {
  const [brand, setBrand] = useState([]);
  const [brandQuery, setBrandQuery] = useState("");

  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/marques/`;

  const getAllBrand = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand`)
      .then((res) => {
        setBrand(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllBrand();
  }, []);

  return (
    <div className="home">
      <p className="home_title">Quelle est votre marque ?</p>
      {brand.length >= 1 && (
        <div className="home_search">
          <FaSearch className="home_search_fa" />
          <input
            className="home_search_input"
            value={brandQuery}
            type="search"
            placeholder={`Recherchez parmis nos ${brand.length} marques ...`}
            onChange={(e) => setBrandQuery(e.target.value)}
          />
          {brandQuery !== "" && <FaTrashAlt className="home_search_trash" />}
        </div>
      )}
      <div className="home_brand">
        {brand
          .filter((search) => search.name.includes(brandQuery))
          .map((infos) => {
            return (
              <li className="home_brand_li" key={infos.id}>
                <Link to={`/model/${infos.id}`}>
                  <img
                    className="home_brand_li_pic"
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
