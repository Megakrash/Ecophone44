import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllBrands } from "@components/apiRest/ApiRestGet";
import Navbar from "@components/navbar/Navbar";
import Breadcrumbs from "@components/breadcrumbs/Breadcrumbs";
import BreadcrumbsRefurb from "@components/breadcrumbs/BreadcrumbsRefurb";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

export default function Brand() {
  const [allBrands, setAllBrands] = useState([]);
  const [brandQuery, setBrandQuery] = useState("");
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/brands/`;
  const { id } = useParams();

  useEffect(() => {
    getAllBrands(id, setAllBrands);
  }, []);

  return (
    <div className="brand">
      <Navbar />
      {id === "3" ? (
        <BreadcrumbsRefurb type="brand" />
      ) : (
        <Breadcrumbs type="brand" />
      )}
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
      {allBrands.length >= 1 && (
        <div className="brand_brand">
          {allBrands
            .filter((search) =>
              search.name.toLowerCase().includes(brandQuery.toLowerCase())
            )
            .map((infos) => {
              return (
                <li className="brand_brand_li" key={infos.id}>
                  <Link
                    to={`/models/${infos.id}`}
                    state={{
                      type: id,
                    }}
                  >
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
      )}
    </div>
  );
}
