import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

export default function Home() {
  const [allBrands, setAllBrands] = useState([]);
  const [brandQuery, setBrandQuery] = useState("");

  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/marques/`;

  const getAllBrands = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/brand`)
      .then((res) => {
        setAllBrands(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="home">
      <p className="home_title">Quelle est votre marque ?</p>
      {allBrands.length >= 1 && (
        <div className="home_search">
          <FaSearch className="home_search_fa" />
          <input
            className="home_search_input"
            value={brandQuery}
            type="search"
            placeholder={`Recherchez parmis nos ${allBrands.length} marques ...`}
            onChange={(e) => setBrandQuery(e.target.value)}
          />
          {brandQuery !== "" && (
            <button
              type="button"
              className="home_search_trash"
              onClick={() => setBrandQuery("")}
            >
              <FaTrashAlt className="home_search_trash_fa" />
            </button>
          )}
        </div>
      )}
      <div className="home_brand">
        {allBrands
          .filter((search) =>
            search.name.toLowerCase().includes(brandQuery.toLowerCase())
          )
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
