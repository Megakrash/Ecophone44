import React, { lazy, Suspense, useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext";

const Footer = lazy(() => import("@components/footer/Footer"));
const Home = lazy(() => import("@pages/home/Home"));
const Brand = lazy(() => import("@pages/brand/Brand"));
const Model = lazy(() => import("@pages/model/model"));
const Login = lazy(() => import("@pages/login/Login"));
const Admin = lazy(() => import("@pages/admin/Admin"));

function App() {
  const [userContext, setUserContext] = useState("");
  const verifyToken = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userContext.userToken}`,
      },
    };
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/user`, config)
      .then(() => {
        setUserContext(JSON.parse(localStorage.getItem("Eco44Token")));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("Eco44Token");
          setUserContext("");
        } else {
          console.error("Error database");
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("Eco44Token")) {
      setUserContext(JSON.parse(localStorage.getItem("Eco44Token")));
    }
    if (userContext !== "") {
      verifyToken();
    }
  }, []);
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="spinner" />
            <p>Chargement</p>
          </div>
        }
      >
        <UserContext.Provider value={userContext}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands/:id" element={<Brand />} />
            <Route path="/models/:id" element={<Model />} />
            {userContext === "" ? (
              <Route
                path="/admin"
                element={<Login setUserContext={setUserContext} />}
              />
            ) : (
              <Route
                path="/admin"
                element={
                  <Admin
                    userToken={userContext.userToken}
                    setUserContext={setUserContext}
                  />
                }
              />
            )}
          </Routes>
          <Footer />
        </UserContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
