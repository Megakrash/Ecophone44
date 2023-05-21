import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import UserContext from "./context/UserContext";

const Navbar = lazy(() => import("@components/navbar/Navbar"));
const Footer = lazy(() => import("@components/footer/Footer"));
const Admin = lazy(() => import("@pages/admin/Admin"));
const Login = lazy(() => import("@pages/login/Login"));

function App() {
  const [userContext, setUserContext] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("Eco44Token")) {
      setUserContext(JSON.parse(localStorage.getItem("Eco44Token")));
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
          <Navbar />
          <Routes>
            {userContext === null ? (
              <Route
                path="/"
                element={<Login setUserContext={setUserContext} />}
              />
            ) : (
              <Route path="/" element={<Admin />} />
            )}
          </Routes>
          <Footer />
        </UserContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
