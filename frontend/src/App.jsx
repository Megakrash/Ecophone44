import React, { lazy, Suspense, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeContext from "@context/ThemeContext";

const Footer = lazy(() => import("@components/footer/Footer"));
const ContactButtons = lazy(
  () => import("@components/contactButtons/ContactButtons")
);
const Home = lazy(() => import("@pages/home/Home"));
const Brand = lazy(() => import("@pages/brand/Brand"));
const Model = lazy(() => import("@pages/model/Model"));
const Repair = lazy(() => import("@pages/repair/Repair"));
const Refurb = lazy(() => import("@pages/refurb/Refurb"));
const Reservation = lazy(() => import("@pages/reservation/Reservation"));
const Confirmation = lazy(() => import("@pages/confirmation/Confirmation"));
const Login = lazy(() => import("@pages/login/Login"));
const Admin = lazy(() => import("@pages/admin/Admin"));
const Contact = lazy(() => import("@pages/contact/Contact"));
const Recruitment = lazy(() => import("@pages/recruitment/Recruitment"));
const Cgv = lazy(() => import("@pages/cgv/Cgv"));
const Legal = lazy(() => import("@pages/legal/Legal"));

function App() {
  // Context theme dark / light mode false === Light mode
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands/:id" element={<Brand />} />
            <Route path="/models/:id" element={<Model />} />
            <Route path="/repairs/:id" element={<Repair />} />
            <Route path="/refurbs/:id" element={<Refurb />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recrutement" element={<Recruitment />} />
            <Route path="/cgv" element={<Cgv />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <ContactButtons />
          <Footer />
        </ThemeContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
