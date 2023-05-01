import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// import UserContext from "./context/UserContext";

const Home = lazy(() => import("@pages/home/Home"));
const Brand = lazy(() => import("@pages/brand/Brand"));
const Model = lazy(() => import("@pages/model/Model"));
const Reparation = lazy(() => import("@pages/reparation/Reparation"));
const Navbar = lazy(() => import("@components/navbar/Navbar"));
const Header = lazy(() => import("@components/header/Header"));
const Footer = lazy(() => import("@components/footer/Footer"));
const Admin = lazy(() => import("@pages/admin/Admin"));

function App() {
  // const [showForm, setShowForm] = useState(false);

  // const [userContext] = useState({
  //   userToken: "",
  //   isAdmin: "",
  //   id: "",
  // });

  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="spinner" />
            <p>Loading</p>
          </div>
        }
      >
        {/* <UserContext.Provider value={userContext}> */}
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marque/:id" element={<Brand />} />
          <Route path="/model/:id" element={<Model />} />
          <Route path="/reparation/:id" element={<Reparation />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        {/* <Contact showForm={showForm} setShowForm={setShowForm} /> */}
        {/* </UserContext.Provider> */}
      </Suspense>
    </div>
  );
}

export default App;
