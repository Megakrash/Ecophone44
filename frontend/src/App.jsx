import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import ThemeContext from "./context/ThemeContext";

const Footer = lazy(() => import("@components/footer/Footer"));
const Home = lazy(() => import("@pages/home/Home"));
const Brand = lazy(() => import("@pages/brand/Brand"));
const Model = lazy(() => import("@pages/model/Model"));
const Repair = lazy(() => import("@pages/repair/Repair"));
const Refurb = lazy(() => import("@pages/refurb/Refurb"));
const Reservation = lazy(() => import("@pages/reservation/Reservation"));
const Confirmation = lazy(() => import("@pages/confirmation/Confirmation"));
const Login = lazy(() => import("@pages/login/Login"));
const Admin = lazy(() => import("@pages/admin/Admin"));

function App() {
  // Context user with user Id & Token
  const [userContext, setUserContext] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Eco44Token")) {
      setUserContext(JSON.parse(localStorage.getItem("Eco44Token")));
    }
  }, []);

  // Context theme dark / light mode
  const [themeToggle, setThemeToggle] = useState(false);

  const themeControlObject = useMemo(() => {
    return { themeToggle, setThemeToggle };
  }, [themeToggle]);

  return (
    <div className={themeToggle ? "App dark-theme" : "App light-theme"}>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="spinner" />
            <p>Chargement</p>
          </div>
        }
      >
        <ThemeContext.Provider value={themeControlObject}>
          <UserContext.Provider value={userContext}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/brands/:id" element={<Brand />} />
              <Route path="/models/:id" element={<Model />} />
              <Route path="/repairs/:id" element={<Repair />} />
              <Route path="/refurbs/:id" element={<Refurb />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route
                path="/login"
                element={<Login setUserContext={setUserContext} />}
              />
              <Route
                path="/admin"
                element={
                  <Admin
                    // userToken={userContext.userToken}
                    setUserContext={setUserContext}
                  />
                }
              />
            </Routes>
            <Footer />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
