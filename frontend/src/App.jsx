import React, { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import UserContext from "./context/UserContext";

const Home = lazy(() => import("@pages/Home"));
const Navbar = lazy(() => import("@components/navbar/Navbar"));
const Header = lazy(() => import("@components/header/Header"));

function App() {
  const [userContext] = useState({
    userToken: "",
    isAdmin: "",
    id: "",
  });

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
        <Navbar />
        <Header />
        <UserContext.Provider value={userContext}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </UserContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
