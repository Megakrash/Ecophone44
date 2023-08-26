import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LinkRefurb() {
  const [refurbs, setRefurbs] = useState([]);

  const getBrands = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/api/refurbsmodels`)
      .then((res) => {
        setRefurbs(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="footer_infos_schedules_bloc_text">
      {refurbs.map(({ id, name }) => {
        return (
          <Link to={`/refurbs/${id}`} key={id}>
            <p>{`${name.toUpperCase()}`}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default LinkRefurb;
