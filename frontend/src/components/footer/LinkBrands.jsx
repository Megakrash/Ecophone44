import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LinkBrands() {
  const [brands, setBrands] = useState([]);

  const getBrands = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/api/smartbrands`)
      .then((res) => {
        setBrands(res.data);
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
      {brands.map(({ id, name }) => {
        return (
          <Link
            to={`/models/${id}`}
            state={{
              type: 1,
            }}
            key={id}
          >
            <p>{`Réparations ${name.toUpperCase()}`}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default LinkBrands;
